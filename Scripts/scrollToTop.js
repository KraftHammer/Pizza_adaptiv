// Самый надёжный вариант с таймером
setInterval(() => {
  const btn = document.getElementById('scrollToTopBtn');
  if (btn) {
    btn.onclick = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    clearInterval(this);
  }
}, 100);