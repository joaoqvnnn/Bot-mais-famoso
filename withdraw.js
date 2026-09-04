// withdraw.js - Lógica da solicitação de saque

document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(sessionStorage.getItem('loggedUser') || 'null');
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // Exibir saldo
  document.getElementById('affiliateBalance').textContent = (user.affiliate_balance || 0).toFixed(2);

  // Verificar conta bancária salva
  const savedBank = JSON.parse(localStorage.getItem('bankAccount') || 'null');
  if (savedBank && savedBank.user_id === user.id) {
    document.getElementById('bankInfo').textContent = 
      `${savedBank.bank_name} - Agência ${savedBank.agency} - Conta ${savedBank.account}`;
  }
});

document.getElementById('withdrawForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const amount = parseFloat(document.getElementById('amount').value);
  const user = JSON.parse(sessionStorage.getItem('loggedUser'));
  const errorMessage = document.getElementById('errorMessage');

  if (amount < 20) {
    errorMessage.textContent = 'Valor mínimo de saque: R$ 20,00';
    return;
  }

  if (amount > (user.affiliate_balance || 0)) {
    errorMessage.textContent = 'Saldo insuficiente.';
    return;
  }

  const savedBank = JSON.parse(localStorage.getItem('bankAccount') || 'null');
  if (!savedBank || savedBank.user_id !== user.id) {
    errorMessage.textContent = 'Cadastre uma conta bancária antes de sacar.';
    return;
  }

  // Simular registro de saque
  const withdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]');
  withdrawals.push({
    user_id: user.id,
    amount: amount,
    status: 'pending',
    created_at: new Date().toISOString()
  });
  localStorage.setItem('withdrawals', JSON.stringify(withdrawals));

  // Atualizar saldo (simulação)
  user.affiliate_balance -= amount;
  sessionStorage.setItem('loggedUser', JSON.stringify(user));

  alert('Saque solicitado com sucesso!');
  window.location.href = 'dashboard.html';
});
