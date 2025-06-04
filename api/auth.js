
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
      const response = await fetch('https://pizza-adaptiv.vercel.app/api/auth', {
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

// Импортируем Supabase SDK
const { createClient } = require('@supabase/supabase-js');

// Создаем клиент для работы с Supabase
const supabase = createClient(
  process.env.SUPABASE_URL, // URL вашей базы (берется из переменных окружения Vercel)
  process.env.SUPABASE_KEY  // API ключ (тоже из переменных окружения)
);

// Основная функция-обработчик
module.exports = async (req, res) => {
  // 1. Получаем данные из запроса
  const { login, password } = req.body;
  
  // 2. Ищем пользователя в базе данных
  try {
    const { data: user, error } = await supabase
      .from('users')          // Ваша таблица с пользователями
      .select('*')            // Выбираем все поля
      .eq('login', login)     // Ищем по логину
      .single();              // Ожидаем одну запись

    // 3. Обработка ошибок поиска
    if (error) {
      console.error('Ошибка поиска пользователя:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Ошибка сервера' 
      });
    }

    // 4. Если пользователь не найден
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    // 5. Проверка пароля (ВНИМАНИЕ: для продакшена нужно хеширование!)
    // В вашем случае пароли хранятся в открытом виде
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Неверный пароль' 
      });
    }

    // 6. Успешная авторизация
    res.json({ 
      success: true,
      userId: user.id,
      message: 'Авторизация успешна'
    });

  } catch (err) {
    console.error('Общая ошибка:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Внутренняя ошибка сервера' 
    });
  }
};
