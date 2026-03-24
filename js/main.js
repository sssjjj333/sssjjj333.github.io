// 1. 적응형 리다이렉트 (PC <-> 모바일 양방향)
function checkMobileRedirect() {
  const isMobileSize = window.innerWidth <= 767;
  const isMobilePage = window.location.href.indexOf('index_mobile.html') !== -1;

  if (isMobileSize && !isMobilePage) {
    window.location.href = 'index_mobile.html';
  } else if (!isMobileSize && isMobilePage) {
    window.location.href = 'index.html';
  }
}

checkMobileRedirect();

// 창 크기를 마우스로 조절할 때도 감지하기
window.addEventListener('resize', function () {
  checkMobileRedirect();
});

// 2. 제이쿼리 로직 시작
$(function () {
  // [Top 버튼 기능]
  $('.btn-top').click(function () {
    $('html,body').stop().animate({ scrollTop: 0 }, 500);
  });

  // [스크롤 시 Top 버튼 노출]
  $(window).scroll(function () {
    let scrH = $(window).scrollTop();
    if (scrH >= 500) {
      $('.btn-top').addClass('show');
    } else {
      $('.btn-top').removeClass('show');
    }
  });

  // [라이트박스 기능]
  // 라이트박스 열기
  $('.long-thumbnail').click(function () {
    var idx = $(this).closest('.work-item').index();
    var $targetBox = $('.long-light-box').eq(idx);
    var $iframe = $targetBox.find('iframe');

    var videoSrc = $iframe.attr('src');
    // iframe src를 다시 넣어서 자동 재생 (파라미터에 autoplay=1이 있다는 가정 하에)
    $iframe.attr('src', videoSrc);
    $targetBox.fadeIn(500);
  });

  // 라이트박스 닫기
  $('.long-light-box').click(function (e) {
    if ($(e.target).is('.long-light-box') || $(e.target).is('.iframe_wrap')) {
      var $this = $(this);
      var $iframe = $this.find('iframe');
      var currentSrc = $iframe.attr('src');

      $this.fadeOut(500, function () {
        $iframe.attr('src', ''); // 소리 끄기
        $iframe.attr('src', currentSrc); // 원래 주소 복구
      });
    }
  });
});
