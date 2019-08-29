



chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url);

    document.getElementById("textarea").value = url;

});

function loadData(data) {

    //Data is usable here

    console.log('csv fetched.');


    console.log(data);

    document.getElementById("textarea").value =data[7][6]

    var arrayLength = data.length;
    for (var i = 1; i < Math.floor(Math.random() * 6) + 1; i++) {


        console.log(data[i][2]);
        console.log(data[i][6]);

        var key=data[i][2];
        var value=data[i][6];

        chrome.storage.local.set({key: value}, function() {
            console.log('Value is set to ' + value);
        });


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

var myPrettyCode = function() {
    // Here, do whatever you want
    parseData("https://ajoorabchi.github.io/WP2Cochrane/results/full_data.csv", loadData);

};

loadScript("./papaparse.min.js", myPrettyCode);



function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}