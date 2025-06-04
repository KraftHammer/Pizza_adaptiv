// Этот код должен быть ТОЛЬКО в папке /api
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  const { login, password } = req.body;
  
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('login', login)
      .single();

    if (error || !user) {
      return res.status(401).json({ success: false, message: 'Пользователь не найден' });
    }

    // Для теста: простая проверка пароля (замените на bcrypt.compare в продакшене)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Неверный пароль' });
    }

    res.json({ 
      success: true,
      userId: user.id
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};
