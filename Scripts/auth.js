// Исправленный код для Scripts/auth.js
document.addEventListener('DOMContentLoaded', () => {
    // Используйте const/let для объявления переменных
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
            
            console.log('Отправка данных:', { login, password }); // Для отладки
            
            const API_URL = 'https://pizza-adaptiv.onrender.com/api/login';
            const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password })
            });
                        
            console.log('Статус ответа:', response.status); // Для отладки
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                localStorage.setItem('userId', result.userId);
                window.location.href = 'index.html';
            } else {
                alert(result.message || 'Ошибка авторизации');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка: ' + error.message);
        }
    });
});