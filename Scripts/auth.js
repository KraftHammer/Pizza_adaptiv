document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('authForm');
    
    if (!form) {
        console.error('Форма авторизации не найдена!');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Получаем значения полей
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        
        try {
            // Отправляем запрос на API
            const response = await fetch('https://pizza-adaptiv.vercel.app/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password })
            });
            
            // Проверяем статус ответа
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            
            // Парсим JSON ответ
            const result = await response.json();
            
            // Обрабатываем результат
            if (result.success) {
                localStorage.setItem('userId', result.userId);
                localStorage.setItem('userLogin', login);
                window.location.href = 'index.html';
            } else {
                // Показываем ошибку в интерфейсе
                const errorElement = document.getElementById('error-message');
                if (errorElement) {
                    errorElement.textContent = result.message || 'Ошибка авторизации';
                    errorElement.style.display = 'block';
                } else {
                    alert(result.message || 'Ошибка авторизации');
                }
                
                // Очищаем поле пароля
                document.getElementById('password').value = '';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            
            // Показываем сообщение об ошибке
            const errorElement = document.getElementById('error-message');
            if (errorElement) {
                errorElement.textContent = 'Сервер недоступен. Попробуйте позже.';
                errorElement.style.display = 'block';
            } else {
                alert('Сервер недоступен. Попробуйте позже.');
            }
        }
    });
});
