document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('popular-items');
    const leftButton = document.querySelector('.slider-button.left');
    const rightButton = document.querySelector('.slider-button.right');
    
    leftButton.addEventListener('click', function() {
        slider.scrollBy({
            left: -273, // ширина карточки + отступ
            behavior: 'smooth'
        });
    });
    
    rightButton.addEventListener('click', function() {
        slider.scrollBy({
            left: 273, // ширина карточки + отступ
            behavior: 'smooth'
        });
    });
});
