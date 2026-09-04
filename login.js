// login.js - Lógica da página de login (temporariamente usando localStorage)

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const telegramId = document.getElementById('telegram_id').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('errorMessage');
  
  // Simulação de validação (depois será substituído por chamada à API)
  if (!telegramId || !password) {
    errorMessage.textContent = 'Preencha todos os campos.';
    return;
  }
  
  // Verificar se usuário existe no localStorage (apenas para teste visual)
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.telegram_id === telegramId);
  
  if (!user || user.password !== password) {
    errorMessage.textContent = 'Credenciais inválidas.';
    return;
  }
  
  // Salvar sessão
  sessionStorage.setItem('loggedUser', JSON.stringify(user));
  
  // Redirecionar para o dashboard
  window.location.href = 'dashboard.html';
});

// Links
document.getElementById('forgotPassword').addEventListener('click', function(e) {
  e.preventDefault();
  alert('Função de recuperação de senha será implementada em breve.');
});

document.getElementById('createAccount').addEventListener('click', function(e) {
  e.preventDefault();
  alert('Criação de conta deve ser feita pelo Telegram.');
});
