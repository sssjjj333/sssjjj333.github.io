$(function () {
  // Top 버튼 클릭
  $('.btn-top').click(function () {
    $('html,body').stop().animate({ scrollTop: 0 }, 500);
  });

  // 스크롤 위치에 따른 Top 버튼 노출
  $(window).scroll(function () {
    let scrH = $(window).scrollTop();

    // 화면 높이(window height)를 기준
    if (scrH >= 500) {
      $('.btn-top').addClass('show');
    } else {
      $('.btn-top').removeClass('show');
    }
  });

  // 라이트 박스
  $(function () {
    // 1. 라이트박스 열기
    $('.long-thumbnail').click(function () {
      // 클릭한 요소의 가장 가까운 부모인 .work-box가 전체 .work-box 중 몇 번째인지 계산
      var idx = $(this).closest('.work-item').index();

      // 해당 순서와 일치하는 라이트박스 선택
      var $targetBox = $('.long-light-box').eq(idx);
      var $iframe = $targetBox.find('iframe');

      // 원래 적혀있던 src 주소 가져오기
      var videoSrc = $iframe.attr('src');

      // src를 다시 입력하면 영상이 처음부터 자동 재생됨
      $iframe.attr('src', videoSrc);
      $targetBox.fadeIn(500);
    });

    // 2. 라이트박스 닫기
    $('.long-light-box').click(function (e) {
      // 배경이나 wrap 클릭 시 닫기
      if ($(e.target).is('.long-light-box') || $(e.target).is('.iframe_wrap')) {
        var $this = $(this);
        var $iframe = $this.find('iframe');
        var currentSrc = $iframe.attr('src');

        $this.fadeOut(500, function () {
          // src를 비워서 소리를 끄고 다시 채워둠 (다음 재생 준비)
          $iframe.attr('src', '');
          $iframe.attr('src', currentSrc);
        });
      }
    });
  });
});
