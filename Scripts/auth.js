document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authForm');
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const login = document.getElementById('login').value; // исправлено
    const password = document.getElementById('password').value; // исправлено

    try {
      const response = await fetch('https://pizza-adaptiv.vercel.app/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });
      
      // Проверка статуса ответа
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
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
