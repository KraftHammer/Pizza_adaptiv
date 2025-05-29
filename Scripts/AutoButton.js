const loginInput = document.getElementById('login');
        const passwordInput = document.getElementById('password');
        const authButton = document.getElementById('authButton');

        // Функция проверки заполнения полей
        function checkInputs() {
            const loginFilled = loginInput.value.trim() !== '';
            const passwordFilled = passwordInput.value.trim() !== '';

            if (loginFilled && passwordFilled) {
                // Оба поля заполнены - делаем кнопку желтой
                authButton.classList.remove('button--outline');
            } else {
                // Хотя бы одно поле пустое - оставляем обводку
                authButton.classList.add('button--outline');
            }
        }

        // Слушаем изменения в полях ввода
        loginInput.addEventListener('input', checkInputs);
        passwordInput.addEventListener('input', checkInputs);

        // Проверяем сразу при загрузке (на случай автозаполнения)
        document.addEventListener('DOMContentLoaded', checkInputs);