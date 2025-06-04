document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authForm');
  
  if (!form) {
    console.error('Форма не найдена!');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Важно: блокируем стандартное поведение
    
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('https://ваш-api.vercel.app/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });

      const result = await response.json();
      
      if (result.success) {
        window.location.href = 'index.html'; // Перенаправление
      } else {
        alert('Ошибка: ' + (result.message || 'Неверные данные'));
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Сервер недоступен');
    }
  });
});
