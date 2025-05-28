// Самый надежный вариант для GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTop = function() {
        // Все возможные способы прокрутки
        window.scrollTo({top: 0, behavior: 'smooth'});
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    };

    // Поиск кнопки с интервалом (на случай динамической загрузки)
    const checkBtn = setInterval(function() {
        const btn = document.getElementById('scrollToTopBtn');
        if (btn) {
            btn.addEventListener('click', scrollToTop);
            clearInterval(checkBtn);
            
            // Лог для отладки
            console.log('Кнопка инициализирована:', btn);
        }
    }, 100);
});
