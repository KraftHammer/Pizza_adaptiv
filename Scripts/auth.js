document.getElementById('authForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://pizza-adaptiv.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('username', data.username);
      window.location.href = 'index.html';
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (error) {
    alert('Connection error');
  }
});