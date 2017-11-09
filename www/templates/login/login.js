CDctrl.login={
    __init__:function(){
        console.log('__login__')
    },
    login:function($this){
        console.log('login', $this)
        var $form = $('.page-login form');
        var username = $form.find("input[name=username]").val();
        $.ajax({
                url:'http://techjyt.com:90/api/account/login/',
                async: false,
                type: "POST",
                data: {username: username, password: username},
                success:function(result){
                    console.log(result);
                    if(result.error){
                        $form.find('.error').html(result.error);
                    }else{
                        CDdata["account-token"] = result["account-token"];
                        console.log("CDdata", CDdata);
                        CDpages.goto('words');
                    }
                },
                complete: function(XHR, TS){
                    if(XHR.status != 200) {
                        console.log("complete", url, XHR, TS);
                    }
                }
            }
        )
    },
    init:function(){
        console.log("login init");

    }
}
