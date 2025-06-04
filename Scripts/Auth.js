// Упрощенная версия без внешних зависимостей
function initializeAuth() {
  console.log('Auth system init...');
  
  // Альтернативный способ найти форму (если ID не работает)
  const form = document.querySelector('form[id="authForm"], form.auth-form');
  
  if (!form) {
    console.error('Форма не найдена! Добавьте id="authForm" к тегу <form>');
    return;
  }

  form.onsubmit = async function(e) {
    e.preventDefault();
    console.log('Форма отправлена!');
    
    // 1. Принудительный тест редиректа
    console.log('Тест: перенаправление на index.html');
    window.location.href = 'index.html';
    return;
    
    // 2. Рабочий код (раскомментировать после проверки теста)
    /*
    try {
      const response = await fetch('https://ваш-api.vercel.app/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: document.getElementById('login').value,
          password: document.getElementById('password').value
        })
      });
      
      if (!response.ok) throw new Error('Ошибка сети');
      
      const result = await response.json();
      if (result.success) {
        window.location.href = 'index.html';
      } else {
        alert(result.message || 'Ошибка авторизации');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Сервер недоступен');
    }
    */
  };
}

// Запуск после полной загрузки страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
  initializeAuth();
}
