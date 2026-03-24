document.addEventListener('DOMContentLoaded', () => {
  // 1. 부드러운 스크롤 애니메이션 함수 (가속도 적용)
  function smoothScroll(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, startPosition + distance * ease);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
  }

  // 2. 네비게이션 클릭 이벤트
  document.querySelectorAll('.gnb a').forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sections = ['#main-visual', '#work', '#skill', '#profile'];
      const targetElement = document.querySelector(sections[index]);
      if (targetElement) {
        const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offset = sections[index] === '#contact' ? 0 : 100;
        smoothScroll(targetTop - offset, 500);
      }
    });
  });
});
