// services/flowManager.js
// Controla o fluxo de entrega via WhatsApp

const config = require('../config/whatsappConfig');
const validator = require('../utils/validator');
const messages = require('../templates/messages');
const whatsappService = require('./whatsappService');

// Armazenamento temporário dos estados (em produção, usar Redis ou banco)
const userStates = new Map();

const STATE = {
  IDLE: 'IDLE',
  ASK_PHONE: 'ASK_PHONE',
  WAITING_ACTIVATION: 'WAITING_ACTIVATION',
  ASK_PASSWORD: 'ASK_PASSWORD',
};

function getState(userId) {
  return userStates.get(userId) || { state: STATE.IDLE, data: {} };
}

function setState(userId, state, data = {}) {
  userStates.set(userId, { state, data });
}

// Função chamada quando uma mensagem chega
async function handleIncomingMessage(sock, msg) {
  if (msg.key.fromMe) return;

  const remoteJid = msg.key.remoteJid;
  const text = msg.message?.conversation ||
               msg.message?.extendedTextMessage?.text ||
               '';

  // Se veio resposta de botão interativo
  const buttonResponse = msg.message?.buttonsResponseMessage;
  if (buttonResponse) {
    const selectedId = buttonResponse.selectedButtonId;
    if (selectedId.startsWith(config.activateButton.id)) {
      // Extrai o ID do pedido (ex.: activate_product_123)
      const orderId = selectedId.split('_').pop();
      await handleActivationClick(remoteJid, orderId);
      return;
    }
  }

  const current = getState(remoteJid);

  switch (current.state) {
    case STATE.ASK_PHONE:
      await handlePhoneInput(remoteJid, text);
      break;
    case STATE.ASK_PASSWORD:
      await handlePasswordInput(remoteJid, text);
      break;
    default:
      // Se digitar /cancelar
      if (text === '/cancelar') {
        await whatsappService.sendText(remoteJid, config.messages.cancelled);
        setState(remoteJid, STATE.IDLE);
      }
      break;
  }
}

// Iniciar entrega por WhatsApp (chamada externamente com pedido)
async function startWhatsAppDelivery(userPhone, order) {
  // userPhone: número para onde enviar as mensagens (com DDI, ex.: 5511998765432)
  // order: objeto do pedido com productName, price, date, time, paymentMethod, deliveryData, etc.
  const remoteJid = userPhone.includes('@s.whatsapp.net') ? userPhone : `${userPhone}@s.whatsapp.net`;

  // Salva os dados do pedido no estado
  setState(remoteJid, STATE.ASK_PHONE, {
    order: order,
  });

  // Envia mensagem pedindo o número (mesmo que já tenhamos, segue o fluxo)
  await whatsappService.sendText(remoteJid, config.messages.askPhone);
}

// Quando o cliente informa o número
async function handlePhoneInput(remoteJid, phone) {
  if (!validator.isValidBrazilianPhone(phone)) {
    await whatsappService.sendText(remoteJid, config.messages.invalidPhone);
    return;
  }

  const current = getState(remoteJid);
  current.data.phone = phone;
  setState(remoteJid, STATE.WAITING_ACTIVATION, current.data);

  // Monta mensagem de entrega com botão
  const order = current.data.order;
  const deliveryMessage = messages.buildDeliveryMessage(order);
  const button = config.activateButton;
  await whatsappService.sendInteractiveButtons(remoteJid, deliveryMessage, [
    { id: `${button.id}_${order.id}`, title: button.title },
  ]);
}

// Quando o cliente clica no botão "Ativar"
async function handleActivationClick(remoteJid, orderId) {
  const current = getState(remoteJid);
  if (current.state !== STATE.WAITING_ACTIVATION || current.data.order.id !== orderId) {
    await whatsappService.sendText(remoteJid, config.messages.error);
    return;
  }

  await whatsappService.sendText(remoteJid, config.messages.askPassword);
  setState(remoteJid, STATE.ASK_PASSWORD, current.data);
}

// Quando o cliente digita a senha
async function handlePasswordInput(remoteJid, password) {
  const current = getState(remoteJid);
  const order = current.data.order;

  // Em produção, buscar a senha correta no banco de dados
  // Aqui usamos uma senha de exemplo '1234'
  const correctPassword = '1234';

  if (password === correctPassword) {
    await whatsappService.sendText(remoteJid, config.messages.successUnlock);
    const productData = messages.buildProductDataMessage(order);
    await whatsappService.sendText(remoteJid, productData);
    setState(remoteJid, STATE.IDLE);
  } else {
    await whatsappService.sendText(remoteJid, config.messages.wrongPassword);
    // Permanece no estado ASK_PASSWORD para nova tentativa
  }
}

module.exports = {
  startWhatsAppDelivery,
  handleIncomingMessage,
  STATE,
};
