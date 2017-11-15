CDctrl.read = {
    // init: function () {
    //     document.addEventListener('deviceready', CDctrl.read.scanCreditCard, false);
    // },
    takePic: function () {
        alert("testCamera");
        navigator.camera.getPicture(successCallback, errorCallback, {
            quality: 50,
            allowEdit: true,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function successCallback(imageData) {
            var image = document.getElementById('myImage');
            image.src = imageData;
        }

        function errorCallback(e) {
            alert("err:" + e);
        }
    },
    scanCreditCard: function () {
        CardIO.canScan(onCardIOCheck);
        function onCardIOComplete(response) {
            var cardIOResponseFields = [
                "cardType",
                "redactedCardNumber",
                "cardNumber",
                "expiryMonth",
                "expiryYear",
                "cvv",
                "postalCode"
            ];

            var len = cardIOResponseFields.length;
            // alert("card.io scan complete");
            for (var i = 0; i < len; i++) {
                var field = cardIOResponseFields[i];
                // alert(field + ": " + response[field]);
            }
        }

        function onCardIOCancel() {
            // alert("card.io scan cancelled");
        }

        function onCardIOCheck(canScan) {
            // alert("card.io canScan? " + canScan);
            var scanBtn = document.getElementById("scanBtn");
            if (!canScan) {
                scanBtn.innerHTML = "Manual entry";
            }


        }
    },
    scan:function () {
        console.log("调用插件scan",CardIO);
        CDctrl.read.scanCreditCard();
        CardIO.scan({
            "requireExpiry": true,
            "scanExpiry": true,
            "requirePostalCode": true,
            "restrictPostalCodeToNumericOnly": true,
            "hideCardIOLogo": true,
            "suppressScan": false,
            "keepApplicationTheme": true
        }, CDctrl.read.scanCreditCard.onCardIOComplete, CDctrl.read.scanCreditCard.onCardIOCancel);
    }
}