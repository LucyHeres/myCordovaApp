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
        document.body.style.width=window.screen.width + "px";
        alert(device.version);
        if (device.platform.toLowerCase() == "ios" && parseInt(device.version)<10) {
            document.body.style.height=window.screen.height + "px";
            document.body.style.paddingTop = "20px";
            document.body.style.backgroundColor = "#f7f7f7";
        }else{
            document.body.style.height=window.screen.height-20 + "px";
        }
        CDframe.init({
            login: {},
            words: {
                cache: true,
            },
            read: {
                lazy:true
            }
        });

        CDpages.goto('login');
        
    }

};

app.initialize();