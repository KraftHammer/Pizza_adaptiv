require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Проверка авторизации
app.post('/api/login', async (req, res) => {
  console.log("Получен запрос:", req.body);
  const { username, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1', 
      [username]
    );
    
    console.log("Найден пользователь:", result.rows[0] ? "Да" : "Нет");
    
    if (result.rows.length === 0) {
      console.log("Пользователь не найден");
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }
    
    const user = result.rows[0];
    const validPass = await bcrypt.compare(password, user.password_hash);
    
    console.log("Пароль верен:", validPass);
    
    if (!validPass) {
      console.log("Хеш пароля из БД:", user.password_hash);
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
  res.send('Привет! Ваш сервер работает.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
