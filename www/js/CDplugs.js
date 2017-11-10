var CDplugs = {
    init: function () {
        var $arr = $("[data-plug]");
        $arr.each(function () {
            var $this = $(this);
            var plugName = $this.data("plug");
            switch (plugName) {
                case 'carousel':
                    var hasTab = $this.hasClass("hasTab");
                    CDplugs.carousel($this, hasTab);
                    break;
                default:
                    console.log("引用的 " + plugName + " 插件不存在");
            }
        });
    },
    carousel: function ($this, hasTab) {
        var n = 0;
        var canswipe = true;
        var $tabs=$(".carousel-tabs");
        console.log("轮播==>==================" + $this);
        var width = window.screen.width;
        $this.children().css("width", width + "px");
        var NUM = $this.children().length;
        $this.css("width", NUM * width + "px");
        $this.parent().css("overflow", "hidden");
        $this.on('swipeleft', function () {
            event.stopPropagation();
            if (canswipe) {
                canswipe = false;
                n++;
                if (n < NUM) {
                    $this.css("transform", "translateX(-" + n * width + "px)");
                    hasTab && changeN(n);
                } else {
                    n = NUM - 1;

                }
                canswipe = true;
            } else {
            }
        });
        $this.on('swiperight', function () {
            event.stopPropagation();
            if (canswipe) {
                canswipe = false;
                n--;
                if (n >= 0) {
                    $this.css("transform", "translateX(-" + n * width + "px)");
                    hasTab && changeN(n);
                } else {
                    n = 0;
                }
                canswipe = true;
            }
        });
        hasTab && changeTab();
        function changeN(n){
            $(".carousel-tabs").children().eq(n).addClass("active").siblings().removeClass("active");
        }
        function changeTab(){
            $tabs.on('tap','.carousel-tab',function(){
                var _this=$(this);
                n=_this.index();
                $this.css("transform", "translateX(-" + n * width + "px)");
                changeN(n);
            })
        }




    }
}