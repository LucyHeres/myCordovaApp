CDctrl.words={
    __init__:function(page_para){
        var res = {};
        $.ajax(
            {
                url: 'http://techjyt.com:90/api/voice/word/list/',
                async: false,
                type: "GET",
                beforeSend: function(jqXHR, settings) {
                    jqXHR.setRequestHeader('ACCOUNT-TOKEN', CDdata["account-token"]);
                },
                success:function(result){
                    console.log(result)
                    res = {word_list: result.result}
                },
                complete: function(XHR, TS){
                    if(XHR.status != 200) {
                        console.log("complete", url, XHR, TS);
                    }
                }
            }
        );
        return res;
    },
    init:function () {
        CDplugs.init();
    },
    doRefresh:function () {
        console.log("刷新当前页");
        var res = {};
        $.ajax(
            {
                url: 'http://techjyt.com:90/api/voice/word/list/',
                async: false,
                type: "GET",
                beforeSend: function (jqXHR, settings) {
                    jqXHR.setRequestHeader('ACCOUNT-TOKEN', CDdata["account-token"]);
                },
                success: function (result) {
                    console.log("获取到word list数据",result);
                    res = {word_list: result.result};
                    return true;
                },
                error:function (error) {
                    alert("获取word list失败"+error);
                    return false;
                }
            });
        return res;
    }
};
