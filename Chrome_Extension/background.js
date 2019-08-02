// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


chrome.runtime.onInstalled.addListener(function () {


    chrome.storage.sync.set({color: '#3aa757'}, function () {
        console.log('The color is green.');
    });


    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'en.wikipedia.org'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });


    function doStuff(data) {

        //Data is usable here

        console.log('csv fetched.');


        console.log(data);


        var arrayLength = data.length;
        for (var i = 1; i < 100; i++) {


            console.log(data[i][2]);


        }

    }

    function parseData(url, callBack) {
        Papa.parse(url, {
            download: true,
            dynamicTyping: true,
            complete: function (results) {
                callBack(results.data);
            }
        });
    }

    parseData("https://ajoorabchi.github.io/WP2Cochrane/results/full_data.csv", doStuff);


});
