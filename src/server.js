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


const { Pool } = require('pg');
require('dotenv').config();

// Подключение к Supabase
const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true
  },
  connectionTimeoutMillis: 5000, // Таймаут 5 секунд
  idleTimeoutMillis: 30000
});

pool.on('error', err => {
  console.error('Ошибка подключения к БД:', err);
});

// Проверка подключения при старте
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Подключение к БД успешно'))
  .catch(err => console.error('❌ Ошибка подключения к БД:', err));
// Проверка авторизации
/*
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
*/

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Временное упрощение: вернуть успех без проверки
    // return res.json({ success: true });
    
    // Простой тест подключения к БД
    const testQuery = await pool.query('SELECT NOW()');
    console.log("Тест БД:", testQuery.rows[0]);
    
    const userQuery = await pool.query(
      'SELECT * FROM users WHERE username = $1', 
      [username]
    );
    
    if (userQuery.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }
    
    const user = userQuery.rows[0];
    
    // Временная замена bcrypt
    // const validPass = await bcrypt.compare(password, user.password_hash);
    const validPass = (password === "Test1234");
    
    if (!validPass) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error("СЕРЬЕЗНАЯ ОШИБКА:", err.message, err.stack);
    res.status(500).json({ error: "Server crash" });
  }
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: "DB connected",
      time: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({
      error: "DB connection failed",
      details: err.message
    });
  }
});

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
  res.send('Привет! Ваш сервер работает.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
