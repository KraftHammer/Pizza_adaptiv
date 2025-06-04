const { createClient } = require('@supabase/supabase-js');

export default async (req, res) => {
  // Настройка CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://krafthammer.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Чтение тела запроса
    const body = await new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(data));
    });
    
    const { login, password } = JSON.parse(body);
    
    // Инициализация Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
    
    // Поиск пользователя
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('login', login)
      .limit(1);
    
    // Обработка ошибок
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Database error' 
      });
    }
    
    // Проверка наличия пользователя
    if (!users || users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Пользователь
