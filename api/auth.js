const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  const { login, password } = req.body;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('login', login)
    .eq('password', password);

  if (error || data.length === 0) {
    return res.status(401).json({ success: false });
  }
  res.json({ success: true });
};

const response = await fetch('https://pizza-adaptiv.vercel.app/api/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ login, password })
});

console.log('Статус ответа:', response.status); // Должно быть 200
const result = await response.json();
console.log('Ответ сервера:', result); // Должно быть {success: true}

if (result.success) {
  window.location.href = 'index.html'; // Перенаправление
} else {
  alert(result.message || 'Ошибка авторизации');
}
