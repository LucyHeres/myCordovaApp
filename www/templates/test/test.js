CDctrl.test = {
    __init__: function () {
        // CDdata.reader = new FileReader();
        // CDdata.reader.onload = function (e) {
        //     console.log(e.target);
        //     document.getElementById("image").src = e.target.result;
        // }
        // fileEntry.file();

    },
    init:function(){
        CDplugs.init();
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

}