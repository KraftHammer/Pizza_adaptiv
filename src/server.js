require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к SQLite (файл на Persistent Disk)
const dbPath = path.join('/data', 'pizza.db');
const db = new sqlite3.Database(dbPath);

// Создание таблицы пользователей
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )`);
});

// Временный роут для инициализации (удалите после использования!)
app.get('/init-db', async (req, res) => {
  try {
    const testPassword = await bcrypt.hash('Test1234', 10);
    
    db.run(
      'INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)',
      ['testuser', testPassword],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Маршрут авторизации
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, row) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!row) return res.status(401).json({ error: 'User not found' });

      const valid = await bcrypt.compare(password, row.password_hash);
      if (!valid) return res.status(401).json({ error: 'Invalid password' });

      res.json({ success: true, username });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));