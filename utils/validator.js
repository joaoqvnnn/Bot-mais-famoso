// utils/validator.js
// Funções de validação

function isValidBrazilianPhone(phone) {
  const regex = /^[1-9]{2}9?[0-9]{8}$/;
  return regex.test(phone.replace(/\D/g, ''));
}

module.exports = {
  isValidBrazilianPhone,
};
