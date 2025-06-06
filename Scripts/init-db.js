const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const db = new sqlite3.Database(path.join('/data', 'pizza.db'));

// Тестовый пользователь (пароль: Test1234)
bcrypt.hash('Test1234', 10, (err, hash) => {
  db.run(
    'INSERT INTO users (username, password_hash) VALUES (?, ?)',
    ['testuser', hash],
    (err) => console.log(err || 'User created')
  );
});