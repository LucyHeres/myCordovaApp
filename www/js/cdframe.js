/***
 * cdframe cordova 单页面应用框架
 * 依赖underscore.js
 * 依赖jquery.js
 * 
 * 
 */

var CDapp = $('.app');
var CDdata = {};

var CDpages = {
    /**
     * 保存页面page相关信息
     */
    pages:{},//保存初始化完毕的所有组件配置信息
    history:[],
    get_current:function(){
        return CDpages.history[CDpages.history.length-1];
    },
    back:function(){
        /**后退 */
        var delPage=this.get_current().page.name;
        $("#"+delPage).remove();
        CDpages.history.pop();
        // var history_obj = this.get_current();
        // if(history_obj.cache){
        //     CDapp.html(history_obj.cache)
        // }else{
        //     CDapp.html(history_obj.page.page(history_obj.para))
        // }
        console.log('back', CDpages.history);
    },
    goto:function(page_name, page_para){
        /**前进 */
        var page = CDpages.pages[page_name];
        var page_html = page.page(page_para);
        // CDapp.html(page_html);//用jquery的.html() 方法 ，实现单页面应用
        CDapp.append(page_html);
        // 从右侧滑入样式
        var $last=$('.app>div:last');
        if($last.hasClass('slideIn')){
            setTimeout(function(){
                $last.removeClass('slideIn');
            },1);
            $last.addClass('slideInRight');
        }


        CDpages.history.push({
            page:page,
            para:page_para,
            cache:page.settings.cache?page_html:null,
        })
        console.log('路由历史表', CDpages.history)
    },
}
//框架主文件
var CDframe = {
    // 打开app自动加载CDframe.init()
    init:function(config){
        /**
         * {
         *  login:{
         *      template:'http://site.com/tempal',
         *      lazy: true or false,
         *      cache: true or false,
         *      }
         * }
         * 
         */
        for(var page_name in config){//初始化每个组件

            var page_cfg = config[page_name];
            var page = {//每个组件的五大属性
                name:page_name,//组件名
                settings:{//组件配置
                    src: page_cfg.template?page_cfg.template:"templates/"+page_name+'/'+page_name+'.html',
                    js:page_cfg.js?page_cfg.js:"templates/"+page_name+'/'+page_name+'.js',
                    css:page_cfg.css?page_cfg.css:"templates/"+page_name+'/'+page_name+'.css',
                    lazy: page_cfg.lazy?true:false,
                    cache:page_cfg.cache?true:false,
                },
                template: null,//存放html代码片段
                //加载该组件的html css js文件
                load:function(){
                    if(this.template === null){
                        $("<link>").attr({ rel: "stylesheet",type: "text/css",href: this.settings.css}).appendTo("head");//加载css
                        this.template = CDframe.get(this.settings.src);//加载html
                        //加载js，并执行该js中的代码，相当于在CDctrl中添加属性 CDctrl.login、CDctrl.words、、
                        CDframe.get(this.settings.js, "script");
                    }
                },
                //加载该组件，并渲染到页面
                page:function(page_para){
                    console.log('当前页面',page_name);
                    console.log('传进来的参数',page_para);
                    this.load();
                    //page_data 为本页面用到的数据
                    var page_data = page_para;
                    //如果该组件的 js文件 中有 __init__ ，那就覆盖掉 从上个页面传进来的参数==>( __init__方法中专门写本页面所需的参数数据)
                    if(CDctrl[this.name] && CDctrl[this.name].__init__!=undefined){
                        page_data = CDctrl[this.name].__init__(page_para);
                    }
                    console.log('页面接收后处理过的参数',page_para);
                    //将该页面的html代码框架（即template）和 该页面所用到的数据（即page_data）混合，用于渲染到页面上
                    var res = page_data?CDframe._template(this.template, page_data): this.template;
                    return res;
                }
            }
            if(!page.settings.lazy){
                page.load()//加载该组件
            }
            // 将该组件初始化完毕后，放到CDpages.pages中
            CDpages.pages[page_name] = page;
        }
        return CDpages;

    },
    //将代码片段和数据混合，渲染生成页面
    _template: function (temp_text, temp_data) {
        var _html = "";
        try{
            _html = _.template(temp_text)(temp_data);
        }catch (e) {
            console.log('_template error', e)
        }
        return _html;
    },
    //此get 和post 方法用于请求页面的js 和html 文件
    get:function(url, dataType){
        console.log('get', url)
        var response= $.ajax(
            {
                url:url,
                async: false,
                dataType:dataType,
                type: "GET",
                error:function(XHR, TS, e){
                    console.log('error get', url, TS, e)
                },
                complete: function(XHR, TS){
                    //console.log('finish', url, TS)
                    if(XHR.status != 200) {
                        console.log("complete", url, XHR, TS);
                    }
                }
            }
        );
        return response.responseText;
    },
    post:function(url, dataType){
        var response= $.ajax(
            {
                url:url,
                async: false,
                dataType:dataType,
                type: "POST",
                complete: function(XHR, TS){
                    if(XHR.status != 200) {
                        console.log("complete", url, XHR, TS);
                    }
                }
            }
        );
        return response.responseText
    },
};
//存放每个组件的js文件
var CDctrl = {};
//绑定事件
var Actions = {
    action: function (event, $this, action_name) {
        if($this===undefined){$this = $(this)}
        if(action_name===undefined){action_name = $this.data('action')}
        var fn_names = action_name.split('.');
        console.log(fn_names)
        var _fn=null; 
        switch(fn_names.length){
            case 0:
                break
            case 1:
                var page_name = CDpages.get_current().page.name;
                //如果本组件CDctrl中有该方法，则调用该方法
                if(CDctrl[page_name] && CDctrl[page_name][action_name]!==undefined){
                    _fn = CDctrl[page_name][action_name]
                //如果本组件CDctrl中没有该方法，则去调用Actions对象中的通用方法
                }else if(Actions[action_name] !== undefined){
                    _fn = Actions[action_name]
                }
                break
            default://以上都不匹配，则执行default
                // 当data-click绑定 非本组件CDctrl 中的函数方法时
                var page_name = fn_names[0];
                if(CDctrl[page_name] && CDctrl[page_name][fn_names[1]]!==undefined){
                    _fn = CDctrl[page_name][fn_names[1]]
                }
                break
        }
        try{
            if(_fn == undefined){
                console.log('action undefined', action_name);
                return
            }
            _fn($this);//调用
            event.stopPropagation();
        }catch (e){
            console.log('invalid action', action_name, e, _fn);
        }
    },
    click:function(event){
        var $this = $(this);
        console.log('click', $this, $this.data('click'))
        return Actions.action(event, $this, $this.data('click'))
    },
    //以下为通用方法，如果当前组件的CDctrl中没有时，则调用这里的通用方法
    goto:function($this){
        var page_para = $this.data();
        // $(".app").removeClass("fadeIn");
        // $(".app").addClass("fadeOut");
        CDpages.goto(page_para['page'], page_para);
        // $(".app").addClass("fadeIn");
        // $(".app").removeClass("fadeOut");

    },
    back:function(){
        CDpages.back();
    },
    extend:function (obj) {
        for(var k in obj){
            Actions[k] = obj[k]
        }
    }
};

$(document).ready(function () {
    $(document).on("tap", "[data-click]", Actions.click);
});


_.templateSettings = {
    //interpolate: /\{\{(.+?)\}\}/g,
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /\{\{=([\s\S]+?)\}\}/g,
    escape      : /\{\{([\s\S]+?)\}\}/g
  };