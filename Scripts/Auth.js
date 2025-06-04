document.getElementById('authForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('https://pizza-adaptiv.vercel.app/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      login: document.getElementById('login').value,
      password: document.getElementById('password').value
    })
  });
  const result = await response.json();
  if (result.success) window.location.href = 'dashboard.html';
  else alert('Ошибка авторизации!');
});
