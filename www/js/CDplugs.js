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
        var width = window.screen.width;
        var NUM = $this.children().length;
        $this.children().css("width", width + "px");
        $this.css("width", NUM * width + "px");

        $this.parent().css("overflow-x", "hidden");

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
        var refreshFlag = 0;// 下拉刷新执行时控制页面假死标志位
        $this.html("<p>下拉刷新...</p>");
        var startY = null;//开始抓取标志位
        var endY = countY = 0;
        $(".scroll-content").on('touchstart', function (event) {
            if (refreshFlag) {
                event.preventDefault();
                return;
            }
            var touch = event.targetTouches[0];
            startY = touch.pageY;
        });
        $(".scroll-content").on('touchmove', function (event) {
            if (startY === null) {
                return;
            }
            if (refreshFlag) {
                event.preventDefault();
                return;
            }
            var idx = $(".carousel-tabs .active").index();
            var fixVal = parseInt($(".app").css("height"))- parseInt($(".scroll-wrapper").css("height"));
            //有轮播的页面
            if ($(".mui-content .scroll-wrapper").children(".carousel").length != 0) {
                if ($(".carousel_item .scroll-content:eq(" + idx + ")").offset().top >= fixVal) {
                    var touch = event.targetTouches[0];
                    endY = touch.pageY;
                    countY = endY - startY;
                    _countY = (endY - startY) / 5;
                    countY = countY > 300 ? 300 : countY;
                    $this.css("height", _countY + "px");
                } else {
                    return;
                }
            }
            else {//没有轮播的页面
                if ($(".scroll-wrapper .scroll-content").offset().top >= fixVal) {
                    var touch = event.targetTouches[0];
                    endY = touch.pageY;
                    countY = endY - startY;
                    _countY = (endY - startY) / 5;
                    countY = countY > 300 ? 300 : countY;
                    $this.css("height", _countY + "px");
                } else {
                    return;
                }
            }
        });
        $(".scroll-content").on('touchend', function (event) {
            if (refreshFlag) {
                event.preventDefault();
                return;
            }
            if (countY < 0) {
                event.preventDefault();
                event.stopPropagation();
            }
            else if (countY >= 0 && countY < 10) {
                //此处的touchend与子元素的touchend点击事件有些冲突
                //如果countY小于10，则判定为点击的是子元素，则去执行子元素的touchend事件
            }
            else if (countY >= 10 && countY < 150) {
                event.stopPropagation();//禁止事件再继续蔓延，即不去执行子元素上的touchend事件
                $this.css("height", 0);
                setTimeout(function () {
                    // 重置标志位
                    refreshFlag = 0;
                }, 300);
                $this.html("<p>下拉刷新...</p>");
                startY = endY = countY = 0;//参数归零
            }
            else {
                event.stopPropagation();
                $this.html("<p>正在刷新...</p>");
                refreshFlag = 1;
                var pageName = CDpages.get_current().page.name;
                //刷新
                if (CDctrl[pageName].doRefresh()) {
                    $this.html("<p>刷新完成</p>");
                    setTimeout(function () {
                        $this.css("height", 0);
                        refreshFlag = 0;
                        $this.html("<p>下拉刷新...</p>");
                    }, 500);
                } else {
                    alert("刷新失败");
                }
                endY = countY = 0;//参数归零
                startY = null;
            }
        });
    },

    page_loading:{
        template:`
            <div id="page_loading" style="width:100%;height:100%;position:absolute;z-index:1000;background: #fff;">
        <div style="position: relative;width:100%;height:100%;" >
            <div style="width:5.5rem;height:5.5rem;background:url(img/timg.gif) no-repeat center center;background-size:100% 100%;
            border-radius:5px;position: absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
            </div>
        </div>
    </div>
        `,
        show:function () {
            $(".app>div:last-child").prepend(this.template);
        },
        hide:function () {
            $("#page_loading").remove();
        }
    }
}
CDplugs.init();
