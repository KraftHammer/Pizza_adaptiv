// После получения ответа от API:
const result = await response.json();

if (result.success) {
  localStorage.setItem('userId', result.userId);
  localStorage.setItem('userLogin', login); // Сохраняем логин
  window.location.href = 'index.html';
} else {
  // Показываем ошибку в интерфейсе
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = result.message || 'Ошибка авторизации';
  errorElement.style.display = 'block';
  
  // Дополнительно: очищаем поле пароля
  document.getElementById('password').value = '';
}
