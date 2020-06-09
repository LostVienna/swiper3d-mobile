$(function () {
  var globalObj = {
    carousel: null, // 旋转木马实例
    startX: 0, // 滑动x轴开始位置
    startY: 0, // 滑动y轴开始位置
    isMove: false, // 是否触发滑动
    // 初始化旋转木马
    initCarousel() {
      var that = this;
      that.carousel = $("#carousel").waterwheelCarousel({
        separation: 130,
        flankingItems: 3,
        speed: 500,
        // autoPlay: 2000,
        movingToCenter($item) {
          that.isMove = true;
        },
      });
    },
    // 初始化监听左右滑动
    initTouch() {
      var that = this;
      $("#carousel").on("touchstart", function (e) {
        that.startX = e.originalEvent.changedTouches[0].pageX;
        that.startY = e.originalEvent.changedTouches[0].pageY;
      });

      $("#carousel").on("touchmove", function (e) {
        var moveEndX = e.originalEvent.changedTouches[0].pageX;
        var moveEndY = e.originalEvent.changedTouches[0].pageY;
        var X = moveEndX - that.startX;
        var Y = moveEndY - that.startY;

        if (Math.abs(X) > Math.abs(Y) && X > 0) {
          that.carousel.prev();
          return false;
        } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
          that.carousel.next();
          return false;
        }
      });
    },
    // 初始化全部
    init() {
      this.initCarousel();
      this.initTouch();

      var that = this;
      $("#carousel img").on("click", function() {
        var thisDom = this;
        setTimeout(function() {
          $(thisDom).addClass('bounceIn')
          setTimeout(function() {
            $(thisDom).addClass('paused')
          }, 500)
        }, that.isMove ? 500 : 0)
      })
    },
  };
  globalObj.init()
});
