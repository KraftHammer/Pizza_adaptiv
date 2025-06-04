document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authForm');
  
  if (!form) {
    console.error('Форма авторизации не найдена!');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Получаем значения полей
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    
    // Валидация
    if (!login || !password) {
      alert('Заполните все поля');
      return;
    }

    try {
      // 1. Отправляем запрос на API
      const response = await fetch('https://pizza-adaptiv.vercel.app/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });
      
      // 2. Проверяем статус ответа
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      // 3. Парсим JSON
      const result = await response.json();
      
      // 4. Обрабатываем результат
      if (result.success) {
        localStorage.setItem('userId', result.userId);
        window.location.href = 'index.html';
      } else {
        alert(result.message || 'Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Сервер недоступен. Попробуйте позже.');
    }
  });
});
