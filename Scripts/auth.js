document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('authForm');
    
    if (!form) {
        console.error('Форма не найдена!');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            
            // Отправляем запрос
            const response = await fetch('https://pizza-adaptiv.vercel.app/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password })
            });
            
            // Обрабатываем ответ
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Парсим JSON - await здесь корректно, так как внутри async-функции
            const result = await response.json();
            
            if (result.success) {
                localStorage.setItem('userId', result.userId);
                window.location.href = 'index.html';
            } else {
                alert(result.message || 'Ошибка авторизации');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Сервер недоступен. Попробуйте позже.');
        }
    });
});
