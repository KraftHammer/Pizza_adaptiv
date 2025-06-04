document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authForm');
  
  // Проверяем, что форма существует
  if (!form) {
    console.error('Форма не найдена!');
    return;
  }

  // Добавляем асинхронный обработчик
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
      const login = document.getElementById('login').value;
      const password = document.getElementById('password').value;
      
      // Проверка заполнения полей
      if (!login || !password) {
        alert('Заполните все поля');
        return;
      }
      
      // Отправляем запрос
      const response = await fetch('https://pizza-adaptiv.vercel.app/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });
      
      // Обработка ответа
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('userId', result.userId);
        window.location.href = 'index.html';
      } else {
        alert(result.message || 'Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Сервер недоступен. Попробуйте позже.');
    }
  });
});
