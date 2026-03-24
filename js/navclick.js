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
