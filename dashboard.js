// dashboard.js - Lógica da página inicial do cliente

// Verificar autenticação (simulada com sessionStorage)
document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(sessionStorage.getItem('loggedUser') || 'null');
  if (!user) {
    window.location.href = 'index.html';
    return;
  }
  
  // Preencher dados do usuário (temporário)
  document.getElementById('userName').textContent = user.username || user.telegram_id;
  document.getElementById('affiliateBalance').textContent = (user.affiliate_balance || 0).toFixed(2);
});

// Botão de logout
document.getElementById('logoutBtn').addEventListener('click', function() {
  sessionStorage.removeItem('loggedUser');
  window.location.href = 'index.html';
});

// Navegação pelos menus
document.getElementById('bankMenu').addEventListener('click', () => window.location.href = 'bank.html');
document.getElementById('withdrawMenu').addEventListener('click', () => window.location.href = 'withdraw.html');
document.getElementById('historyMenu').addEventListener('click', () => alert('Página de histórico em breve.'));
document.getElementById('termsMenu').addEventListener('click', () => alert('Termos de uso serão exibidos aqui.'));
