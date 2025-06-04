document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authForm');
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    try {
      // 1. Отправляем запрос на ваш API
      const response = await fetch('https://sau-api.vercel.app/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });
      
      // 2. Обрабатываем ответ
      const result = await response.json();
      
      // 3. Проверяем результат
      if (result.success) {
        localStorage.setItem('userId', result.userId);
        window.location.href = 'index.html';
      } else {
        alert(result.message || 'Ошибка авторизации');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Сервер недоступен. Попробуйте позже.');
    }
  });
});
