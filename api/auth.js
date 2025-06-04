const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  // Разрешаем запросы с вашего домена GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', 'https://krafthammer.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обрабатываем предварительный OPTIONS-запрос
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Основная логика
  try {
    const { login, password } = req.body;
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('login', login)
      .single();

    if (error || !user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Неверный пароль' 
      });
    }

    res.json({ 
      success: true,
      userId: user.id
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера' 
    });
  }
};
