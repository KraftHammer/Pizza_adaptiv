form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  try {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    
    console.log("Sending:", { login, password }); // Добавьте эту строку
    
    const response = await fetch('https://pizza-adaptiv.vercel.app/api/auth', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password })
    });
    
    // Добавьте логирование ответа
    console.log("Response status:", response.status);
    const responseText = await response.text();
    console.log("Raw response:", responseText);
    
    try {
      const result = JSON.parse(responseText);
      
      if (result.success) {
        localStorage.setItem('userId', result.userId);
        window.location.href = 'index.html';
      } else {
        alert(result.message || 'Ошибка авторизации');
      }
    } catch (jsonError) {
      console.error("JSON parse error:", jsonError);
      alert("Invalid server response");
    }
    
  } catch (error) {
    console.error('Network error:', error);
    alert('Сервер недоступен. Попробуйте позже.');
  }
});
