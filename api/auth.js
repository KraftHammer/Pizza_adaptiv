document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value.trim();

    // Валидация формата (регулярные выражения из вашего HTML)
    const loginRegex = /^[a-zA-Z0-9]{4,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
    if (!loginRegex.test(login)) {
      alert('Логин: только латинские буквы и цифры (4-20 символов)');
      return;
    }
    
    if (!passwordRegex.test(password)) {
      alert('Пароль: минимум 8 символов, заглавные, строчные буквы и цифры');
      return;
    }

    try {
      const response = await fetch('https://sau-api.vercel.app/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });

      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('authToken', result.token); // Сохраняем токен
        window.location.href = 'index.html';
      } else {
        alert('Ошибка: Пользователь не найден или неверный пароль');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Сервер недоступен. Попробуйте позже.');
    }
  });
});
