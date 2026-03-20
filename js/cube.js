document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  const cards = cube.querySelectorAll('.card');
  const area = document.getElementById('interaction-area');
  const indicatorContainer = document.getElementById('indicator');

  const count = cards.length;
  const theta = 360 / count; // 회전 각도
  let angle = 0;
  let currentIndex = 0;
  let timer = null;
  let radius = 0; // 중심 거리

  // 인디케이터 동적 생성
  cards.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (idx === 0 ? ' active' : '');
    indicatorContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.dot');

  // 다각형 배치 설정 (초기 및 리사이즈 시)
  function setupCube() {
    const cardWidth = cards[0].offsetWidth;
    // 삼각함수를 이용한 중심 거리 도출
    radius = Math.round(cardWidth / 2 / Math.tan(Math.PI / count));

    cards.forEach((card, idx) => {
      card.style.transform = `rotateY(${idx * theta}deg) translateZ(${radius}px)`;
    });
    updateRotate();
  }

  function updateRotate() {
    // 큐브 중심점 이동 및 회전
    cube.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % count;
      angle -= theta;
      updateRotate();
    }, 3000);
  }

  window.manualRotate = function (direction) {
    clearInterval(timer);
    currentIndex = (currentIndex + direction + count) % count;
    angle -= direction * theta;
    updateRotate();
    startTimer();
  };

  area.addEventListener('mouseenter', () => clearInterval(timer));
  area.addEventListener('mouseleave', () => startTimer());

  let touchStartX = 0;
  let touchEndX = 0;

  area.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  area.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (touchEndX - touchStartX > swipeThreshold) {
      manualRotate(-1);
    } else if (touchStartX - touchEndX > swipeThreshold) {
      manualRotate(1);
    }
  });

  window.addEventListener('resize', setupCube);

  setupCube();
  startTimer();
});
