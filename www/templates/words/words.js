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
    }
};
