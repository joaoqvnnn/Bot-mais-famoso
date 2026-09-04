// config/whatsappConfig.js
// Configurações do serviço de WhatsApp

module.exports = {
  storeName: 'Larizinha Store',

  // Configurações do Baileys
  baileys: {
    authDir: './auth',                // pasta para salvar credenciais
    printQRInTerminal: true,
    browser: ['Larizinha Store', 'Chrome', '1.0.0'],
  },

  // Botão "Ativar" exibido na mensagem de entrega
  activateButton: {
    type: 'reply',                    // 'reply' para botão de resposta rápida
    id: 'activate_product',           // identificador do botão
    title: '🔓 Ativar',               // texto exibido no botão
  },

  // Mensagens do fluxo (totalmente editáveis)
  messages: {
    askPhone: '📲 *Receber por WhatsApp*\n\n' +
              'Por favor, informe o número do seu WhatsApp *com DDD*.\n\n' +
              'Exemplo: 11987654321\n\n' +
              'Digite /cancelar para sair.',

    phoneReceived: '✅ Número recebido! Preparando sua entrega...',

    delivery: '🎉 *Compra Realizada com Sucesso!*\n\n' +
              '━━━━━━━━━━━━━━━\n' +
              '📦 *Produto:* {productName}\n' +
              '💰 *Valor:* R$ {price}\n' +
              '📅 *Data:* {date}\n' +
              '⏰ *Hora:* {time}\n' +
              '💳 *Pagamento:* {paymentMethod}\n' +
              '━━━━━━━━━━━━━━━\n\n' +
              'Para receber seus dados de acesso, clique no botão abaixo.',

    askPassword: '🔒 *Senha de Segurança*\n\n' +
                 'Digite a senha cadastrada para liberar seus dados.',

    wrongPassword: '❌ Senha incorreta. Tente novamente.',

    successUnlock: '✅ Senha confirmada! Liberando seus dados...',

    productData: '🔐 *Dados do Produto*\n\n' +
                 '━━━━━━━━━━━━━━━\n' +
                 '📧 *E-mail:* {email}\n' +
                 '🔑 *Senha:* {password}\n' +
                 '━━━━━━━━━━━━━━━\n\n' +
                 'Guarde essas informações com segurança.',

    cancelled: '❌ Operação cancelada.',
    invalidPhone: '❌ Número inválido. Use o formato 11987654321.',
    error: '⚠️ Ocorreu um erro. Tente novamente mais tarde.',
  },

  // Validação de número de telefone brasileiro
  phoneValidation: {
    regex: /^[1-9]{2}9?[0-9]{8}$/,
  },

  // Tempo limite para resposta (minutos)
  responseTimeout: 5,
};
