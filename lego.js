const request = require('request');
const bodyParser = require('body-parser');

exports.getLegoSets = async function getLegoSets(themeId, callback) {
    const id = themeId
    console.log("in lego.js the themeId is " + id);
    var legoArray = []
  
    const url = 'https://rebrickable.com/api/v3/lego/sets/?key=cef91563c41612c871ed256c1a22e628'
    request(url, function (error, response, body) {
        console.error('error:', error);
        const items = JSON.parse(body);
        console.log(items.results.length);
        var j = 0;
        for (var i = 0; i < items.results.length; i++) {
            if (items.results[i].theme_id == id) {
                legoArray[j] = items.results[i];
                j++;
            }
        }
        callback(legoArray);
    })
}

exports.getLegoDetails = async function getLegoDetails(setname, callback) {
    const setName = setname
    var legoSetArray = []
    const url = 'https://rebrickable.com/api/v3/lego/sets/?key=cef91563c41612c871ed256c1a22e628'
    request(url, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        const items = JSON.parse(body);
//        console.log(items.results.length);
        var z = 0;
        for (var i = 0; i < items.results.length; i++) {
            if (items.results[i].set_num == setName) {
                legoSetArray[z] = items.results[i];
                z++;
            }
        }
//        console.log("legoSetArray :: " + legoSetArray);
        callback(legoSetArray);
    })
}
