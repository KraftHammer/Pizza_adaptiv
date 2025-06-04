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
