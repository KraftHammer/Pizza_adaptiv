export default async (req, res) => {
  // Разрешаем запросы с GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', 'https://krafthammer.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обрабатываем предварительный запрос
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const body = await new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(data));
    });
    
    const { login, password } = JSON.parse(body);
    
    // Ваша логика проверки пользователя
    // ...

    res.json({ success: true, userId: 1 }); // Заглушка для теста

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
