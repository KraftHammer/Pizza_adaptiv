// Временное разрешение для всех доменов
res.setHeader('Access-Control-Allow-Origin', '*');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  try {
    // Настройка CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://krafthammer.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    console.log('Получен запрос:', req.method, req.url);
    
    // Проверка тела запроса
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        const { login, password } = JSON.parse(body);
        console.log('Данные:', { login });
        
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_KEY
        );
        
        // Проверка подключения к Supabase
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: 'test@example.com',
          password: 'dummy'
        });
        
        if (authError && authError.message !== 'Invalid login credentials') {
          throw new Error(`Supabase auth error: ${authError.message}`);
        }

        // Поиск пользователя
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('login', login)
          .single();

        console.log('Результат запроса:', { user, error });
        
        if (error) throw error;
        if (!user) {
          return res.status(404).json({ success: false, message: 'Пользователь не найден' });
        }

        // Проверка пароля (временная)
        if (user.password !== password) {
          return res.status(401).json({ success: false, message: 'Неверный пароль' });
        }

        // Успешный ответ
        res.json({ 
          success: true,
          userId: user.id
        });
        
      } catch (err) {
        console.error('Ошибка обработки:', err);
        res.status(500).json({ 
          success: false, 
          message: 'Internal server error',
          error: err.message 
        });
      }
    });
    
  } catch (err) {
    console.error('Глобальная ошибка:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server initialization failed',
      error: err.message 
    });
  }
};
