// bank.js - Lógica do formulário de conta bancária

document.addEventListener('DOMContentLoaded', function() {
  // Verificar autenticação (simulada)
  const user = JSON.parse(sessionStorage.getItem('loggedUser') || 'null');
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // Preencher select de bancos
  const select = document.getElementById('bankSelect');
  if (typeof BANKS !== 'undefined' && Array.isArray(BANKS)) {
    BANKS.forEach(bank => {
      const option = document.createElement('option');
      option.value = bank.code;
      option.textContent = `${bank.code} - ${bank.name}`;
      select.appendChild(option);
    });
  }

  // Verificar se já tem conta salva (localStorage para simulação)
  const savedAccount = JSON.parse(localStorage.getItem('bankAccount') || 'null');
  if (savedAccount && savedAccount.user_id === user.id) {
    document.getElementById('bankSelect').value = savedAccount.bank_code;
    document.getElementById('agency').value = savedAccount.agency;
    document.getElementById('account').value = savedAccount.account;
    document.getElementById('accountType').value = savedAccount.account_type;
    document.getElementById('cpfCnpj').value = savedAccount.cpf_cnpj;
  }
});

document.getElementById('bankForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const bankSelect = document.getElementById('bankSelect');
  const bankCode = bankSelect.value;
  const bankName = bankSelect.options[bankSelect.selectedIndex]?.text.split(' - ')[1] || '';
  const agency = document.getElementById('agency').value.trim();
  const account = document.getElementById('account').value.trim();
  const accountType = document.getElementById('accountType').value;
  const cpfCnpj = document.getElementById('cpfCnpj').value.trim();
  const errorMessage = document.getElementById('errorMessage');

  errorMessage.textContent = '';

  // Validações básicas
  if (!bankCode || !agency || !account || !cpfCnpj) {
    errorMessage.textContent = 'Preencha todos os campos.';
    return;
  }

  const user = JSON.parse(sessionStorage.getItem('loggedUser'));

  const bankData = {
    user_id: user.id,
    bank_code: bankCode,
    bank_name: bankName,
    agency: agency,
    account: account,
    account_type: accountType,
    cpf_cnpj: cpfCnpj
  };

  // Salvar no localStorage (simulação)
  localStorage.setItem('bankAccount', JSON.stringify(bankData));
  alert('Conta bancária salva com sucesso!');
  window.location.href = 'dashboard.html';
});
