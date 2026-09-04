// templates/messages.js
// Geração de mensagens com placeholders

const config = require('../config/whatsappConfig');

function applyTemplate(template, data) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

function buildDeliveryMessage(order) {
  const template = config.messages.delivery;
  return applyTemplate(template, {
    productName: order.product_name,
    price: order.price.toFixed(2),
    date: formatDate(order.created_at),
    time: formatTime(order.created_at),
    paymentMethod: order.payment_method,
  });
}

function buildProductDataMessage(order) {
  const template = config.messages.productData;
  return applyTemplate(template, {
    email: order.delivery_data?.email || 'N/A',
    password: order.delivery_data?.password || 'N/A',
  });
}

module.exports = {
  buildDeliveryMessage,
  buildProductDataMessage,
};
