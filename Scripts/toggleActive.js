document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button-size, .button-size-not-selected');
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        // Находим родительскую карточку
        const card = this.closest('.card'); // Предположим, что каждая карточка имеет класс .card
  
        // Находим все кнопки внутри этой карточки
        const cardButtons = card.querySelectorAll('.button-size, .button-size-not-selected');
  
        // Снимаем активный стиль со всех кнопок внутри текущей карточки
        cardButtons.forEach(btn => {
          btn.classList.remove('button-size');
          btn.classList.add('button-size-not-selected');
        });
  
        // Применяем активный стиль к нажатой кнопке
        this.classList.remove('button-size-not-selected');
        this.classList.add('button-size');
      });
    });
  });