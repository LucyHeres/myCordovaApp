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
                case 'pullDownRefresh':
                    CDplugs.pullDownRefresh($this);
                    break;
                default:
                    console.log("引用的 " + plugName + " 插件不存在");
            }
        });
    },
    carousel: function ($this, hasTab) {
        var n = 0;
        var canswipe = true;
        var $tabs = $(".carousel-tabs");
        console.log("轮播==>==================" + $this);
        var width = window.screen.width;
        $this.children().css("width", width + "px");
        var NUM = $this.children().length;
        $this.css("width", NUM * width + "px");
        $this.parent().css("overflow", "hidden");//即.container元素
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

        function changeN(n) {
            $(".carousel-tabs").children().eq(n).addClass("active").siblings().removeClass("active");
        }

        function changeTab() {
            $tabs.on('tap', '.carousel-tab', function () {
                var _this = $(this);
                n = _this.index();
                $this.css("transform", "translateX(-" + n * width + "px)");
                changeN(n);
            })
        }


    },

    pullDownRefresh: function ($this) {
        $this.html("<div class='mui-icon mui-icon-pulldown'></div><p>下拉刷新...</p>");
        var startY = endY = countY = 0;
        $(".refreshBox").on('touchstart', function (event) {
            sum = 0;
            var touch = event.targetTouches[0];
            startY = touch.pageY;
        });
        $(".refreshBox").on('touchmove', function (event) {
            var touch = event.targetTouches[0];
            endY = touch.pageY;
            countY = endY - startY;
            countY = countY > 100 ? 100 : countY;
            $this.css("height", countY + "px");
        });
        $(".refreshBox").on('touchend', function (event) {
            if(countY<90){
                $this.css("height", 0);
                $this.html("<div class='mui-icon mui-icon-pulldown'></div><p>下拉刷新...</p>");
            }else{
                $this.html("<div class='mui-icon mui-icon-spinner-cycle mui-spin'></div><p>正在刷新...</p>");
                var pageName=CDpages.get_current().page.name;
                if(CDctrl[pageName].doRefresh()){
                    $this.html("<div class='mui-icon mui-icon-checkmarkempty'></div><p>刷新完成</p>");
                    setTimeout(function () {
                        $this.css("height", 0);
                        $this.html("<div class='mui-icon mui-icon-pulldown'></div><p>下拉刷新...</p>");
                    },1000)

                }else{
                    alert("刷新失败");
                }
            }

        });
    }
}