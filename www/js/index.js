/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        // 手机状态栏问题
        document.body.style.width = window.screen.width + "px";
        if (cordova.platformId == 'android') {
            document.body.style.height = window.screen.height - 20 + "px";
            StatusBar.backgroundColorByHexString("#333");
        }
        else if (cordova.platformId == "ios") {
            document.body.style.height = window.screen.height - 20 + "px";
            StatusBar.overlaysWebView(false);
            StatusBar.backgroundColorByHexString("#f7f7f7");
        }
        else {
            document.body.style.height = window.screen.height + "px";

        }
        CDframe.init({// 所有的组件
            login: {},
            words: {
                cache: true,
            },
            read: {
                lazy:true
            },
            test:{
                lazy:true
            }
        });

        //安卓手机硬件退出问题
        var eventBackButton = function () {
            if (CDpages.get_current().page.name == 'words' || CDpages.get_current().page.name == 'login') {
                mui.toast("再点一次 退出");
                setTimeout(function(){
                    document.addEventListener("backbutton", eventBackButton, false);
                },2000);
                document.removeEventListener("backbutton", eventBackButton, false);
            } else if(CDpages.get_current().page.name == 'read'){
                CDpages.goto('words');
            }else{
                CDpages.back();
            }
        }
        document.addEventListener("backbutton", eventBackButton, false);

        CDpages.goto('login');


    }

};

app.initialize();