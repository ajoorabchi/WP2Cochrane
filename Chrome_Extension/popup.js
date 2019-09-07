tableGuide = '<p><b>Grouping:</b></p>\
        <p>In cases, where there are multiple version of a Cochrane review, they are grouped toghther (showing the same background color)\
        ,and are listed chronologically,latest version first.</p>\
        <p><b>Color Codes:</b></p>\
        <ol>\
          <li><p style="color:Green;">Green:  up-to-date and  CITED</p></li>\
          <li><p style="color:Red;">  Red:    up-to-date and  NOT CITED</p></li>\
        <li><p style="color:Orange;">Orange:  out-of-date and CITED</p></li>\
            <li><p style="color:Grey;">Grey:  out-of-date and NOT CITED</p></li>\
        </ol><hr>'

var url;

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url;
    console.log(url);
    document.getElementById("textarea").innerHTML = " LOADING linkage results for: " + url;
});

function loadData(data) {

    //Data is usable here

    console.log('csv fetched.');
    console.log(data);
    console.log(url);

    document.getElementById("article_title").innerHTML = "Finding Cochrane reviews for: " + "<b>" + url + "</b>";
    var reviews = data.filter(data => data.WP_en_article === url)
    console.log(reviews);
    if (reviews.length === 0) {
        document.getElementById("textarea").innerHTML = "This article is not classified as a disease in Wikidata";
    } else {
        document.getElementById("textarea").innerHTML = tableGuide + reviews[0].cochrane_reviews_html;
    }

    var arrayLength = data.length;
    for (var i = 1; i < Math.floor(Math.random() * 6) + 1; i++) {


        console.log(data[i].WP_en_article);
        console.log(data[i].cochrane_reviews_html);

        // var key = data[i][2];
        // var value = data[i][6];
        //
        // chrome.storage.local.set({key: value}, function () {
        //     console.log('Value is set to ' + value);
        // });


    }

}

var myPrettyCode = function () {
    // Here, do whatever you want
    parseData("https://ajoorabchi.github.io/WP2Cochrane/results/full_data.csv", loadData);

};

loadScript("./papaparse.min.js", myPrettyCode);

function loadScript(url, callback) {
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


function parseData(url, callBack) {
    Papa.parse(url, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function (results) {
            callBack(results.data);
        }
    });
}
