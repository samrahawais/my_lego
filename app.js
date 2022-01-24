const express= require('express');
const app= express();
const fetch =require('node-fetch')

const handlebars = require('express-handlebars');

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars.engine(
))
const legoSets=require('./lego');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
	extended: true
}))
var counter=0;

const api_url='https://rebrickable.com/api/v3/lego/sets?key=cef91563c41612c871ed256c1a22e628'

// routers
app.get('/', function(request, response){
       response.render('main')
})

app.get('/loadThemes', async function (request, response) {
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    const legosetData = json['results'];
    var legoDetails;
    var len = legosetData.length;
    const model =
    {
        legosetData: legosetData,
    }
    response.render('one', model)
})

app.post('/fetchLegoSets', function (request, response) {
    var themeId = request.body.legothemes;
   var themeName=request.body.themeName;
    legoSets.getLegoSets(themeId, function (results) {
        legoDetails = results
        const model = {
            legoDetails,
            themeId,
            themeName,
        }
//        console.log(model);
        response.render('two', model);
    })
})

app.post('/getLegoDetails', function(request, response){
var setname= request.body.setName;
legoSets.getLegoDetails(setname, function (detailResults) {
    setDetails = detailResults
    const model = {
        setDetails: setDetails,
        setname
    }
    console.log(model);
    response.render('LegoDetail', model);
})
})

app.post('/getLikes', function (request, response) {
     var counter=request.body.likes;
     var themeId= request.body.themeId;
     var setNum= request.body.setNum;
     legoSets.getLegoSets(themeId, function (results) {
        legoDetails = results
        for( var i=0;i< legoDetails.length;i++){
             if(legoDetails[i].set_num == setNum)
            {
                legoDetails[i].last_modified_dt= true;
//              console.log(legoDetails[i].set_num);
            } 
            else{
                legoDetails[i].last_modified_dt= false;
            }
        }
        const model = {
            legoDetails,
            themeId,
            counter,
            setNum
        }
        console.log(model);
        response.render('three', model);  })
}) 
app.listen(8000)