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