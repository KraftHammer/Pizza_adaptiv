<script>
document.querySelectorAll('.menu-item a').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Отменяем стандартное поведение ссылки

        var targetId = this.getAttribute('href'); // Получаем id из атрибута href
        var targetElement = document.querySelector(targetId); // Находим элемент по id

        // Прокрутка к элементу
        targetElement.scrollIntoView({
            behavior: 'smooth' // Плавная прокрутка
        });
    })};
);
</script>
