/*
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  // Устанавливаем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', 'https://krafthammer.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Обрабатываем OPTIONS запрос (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Читаем тело запроса
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    
    const { login, password } = JSON.parse(body);
    
    // Подключаемся к Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
    
    // Ищем пользователя
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('login', login)
      .limit(1);
    
    if (error) throw error;
    
    if (!users || users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }
    
    const user = users[0];
    
    // Проверяем пароль
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Неверный пароль' 
      });
    }
    
    // Успешный ответ
    res.json({ 
      success: true,
      userId: user.id
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};
*/

// Исправленный серверный код
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

// Конфигурация подключения к Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  // Добавляем CORS-заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка предварительного OPTIONS-запроса
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Обрабатываем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { login, password } = req.body;
    console.log('Получены данные:', { login }); // Логируем только логин для безопасности

    // 1. Поиск пользователя в БД
    const userResult = await pool.query(
      'SELECT id, password_hash FROM users WHERE login = $1',
      [login]
    );

    // 2. Проверка существования пользователя
    if (userResult.rows.length === 0) {
      console.log('Пользователь не найден:', login);
      return res.status(401).json({ 
        success: false, 
        message: "Неверный логин или пароль" 
      });
    }

    const user = userResult.rows[0];
    
    // 3. Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      console.log('Неверный пароль для:', login);
      return res.status(401).json({ 
        success: false, 
        message: "Неверный логин или пароль" 
      });
    }

    // 4. Успешная аутентификация
    console.log('Успешная аутентификация:', login);
    res.status(200).json({ 
      success: true, 
      userId: user.id 
    });
    
  } catch (error) {
    console.error('Ошибка сервера:', error);
    res.status(500).json({ 
      success: false, 
      message: "Внутренняя ошибка сервера" 
    });
  }
}
