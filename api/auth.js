document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authForm');
  
  // Проверяем, найдена ли форма
  if (!form) {
    console.error('Форма авторизации не найдена!');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Отменяем стандартную отправку формы
    
    // Получаем значения полей
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    
    // Простая валидация
    if (!login || !password) {
      alert('Заполните все поля');
      return;
    }
    
    try {
      // Отправляем запрос на сервер
      const response = await fetch('https://sau-api.vercel.app/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });
      
      // Проверяем статус ответа
      if (!response.ok) {
        throw
