var CDplugs = {

    init: function () {
        var $arr = $("[data-plug]");
        $arr.each(function(){
            var $this = $(this);
            var plugName = $this.data("plug");
            switch (plugName) {
                case 'carousel':
                    CDplugs.carousel($this);
                    break;
                default:
                    console.log("引用的 "+plugName+" 插件不存在");
            }
        });
    },
    carousel:function($this){
        var n=0;var canswipe=true;
        console.log("轮播==>"+$this);
        var width=window.screen.width;
        $this.children().css("width",width+"px");
        var NUM=$this.children().length;
        $this.css("width",NUM*width+"px");
        $this.parent().css("overflow-x","hidden");
        $this.css("transform","translateX(0)");
        $this.on('swipeleft',function(){
            event.stopPropagation();
            if(canswipe){
                canswipe=false;
                n++;
                if(n<NUM){
                    console.log("左滑");
                    $this.css("transform","translateX(-"+n*width+"px)");
                }else{
                    n=NUM-1;
                }
                canswipe=true;
            }else{}
        });
        $this.on('swiperight',function(){
            if(canswipe){
                canswipe=false;
                n--;
                if(n>=0){
                    console.log("右滑");
                    $this.css("transform","translateX(-"+n*width+"px)");
                }else{
                    n=0;
                }
                canswipe=true;
            }


        });
    }
}