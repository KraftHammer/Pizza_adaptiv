// Временный скрипт generate-hash.js
const bcrypt = require('bcrypt');
const password = "Test1234";

bcrypt.hash(password, 10)
  .then(hash => console.log("Новый хеш:", hash))
  .catch(err => console.error(err));