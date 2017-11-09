CDctrl.read={
    takePic:function(){
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
    }
}