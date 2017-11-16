CDctrl.test = {
    __init__: function () {
        // CDdata.reader = new FileReader();
        // CDdata.reader.onload = function (e) {
        //     console.log(e.target);
        //     document.getElementById("image").src = e.target.result;
        // }
        // fileEntry.file();
        var res=CDctrl.test._getList('story');

        return res;//__init__里必须有返回值
    },
    init:function(){
        CDplugs.init();
    },
    toggle_rank:function($this){
        if($this.hasClass("active")){

        }else{
            $this.addClass("active").siblings().removeClass("active")
        }
        var para=$this.data("para");
        CDctrl.test._getList(para);
    },
    _getList:function (para) {
        // 请求页面上的数据
        var res = {};
        $.ajax(
            {
                url: 'https://www.caomeikankan.com/api/'+para+'/list/',
                async: false,
                type: "GET",
                // beforeSend: function(jqXHR, settings) {
                //     jqXHR.setRequestHeader('ACCOUNT-TOKEN', CDdata["account-token"]);
                // },
                success:function(result){
                    console.log(result);
                    res = {book_list: result.result};
                },
                complete: function(XHR, TS){
                    if(XHR.status != 200) {
                        console.log("complete", url, XHR, TS);
                    }
                }
            }
        );
        var book_list=res;
        var html=`
        <% _.each(book_list,function(x,i){ %>
                        <div class="mui-table-view-cell">
                            <p style="width: 90%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
                                {{x.name}}
                            </p>
                        </div>
                        <% }) %>`;
        $("#test .booklist").html(CDframe._template(html, book_list));
        return res;
    },





    testPlugin:function(){
     console.log("cordova 的插件",cordova.plugins);
        cordova.plugins.ShowToast.coolMethod("hello world",
            function(msg){
            alert("插件调用成功，返回数据"+msg);
        },function(e){
                alert("插件调用失败，返回数据"+e);
            });
    },
    takepic:function(){
        alert("testCamera");
        navigator.camera.getPicture(successCallback, errorCallback, {
            quality: 50,
            allowEdit:true,
            destinationType: Camera.DestinationType.FILE_URI
        });
        function successCallback(imageData){
            var image = document.getElementById('myImage');
            image.src = imageData;
        }
        function errorCallback(e){
            alert("err:"+e);
        }
    },
    doRefresh:function () {
        console.log(111);
        return true;
    }

}