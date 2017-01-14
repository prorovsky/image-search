var express = require('express'),
    app = express(),
    request = require('request'),
    config = require('./config'),
    mongoose = require('mongoose'),
    mainUrl = 'https://www.googleapis.com/customsearch/v1?q=',
    image = '&searchType=image',
    apikey = process.env.APIKEY || config.APIKEY,
    seid = process.env.SEID || config.SEID;

// db
var dburl = process.env.DATABASEURL || "mongodb://localhost/fcc-backend";
mongoose.connect(dburl, function(err, db){
    if(err){
        console.error(err);
    } else {
        console.log('Successfully connected to DB');
    }
});
var searchSchema = new mongoose.Schema({
   search: String,
   time: String 
});
var Search = mongoose.model('Search', searchSchema);

//file server
app.use(express.static('./public'));

// routes
app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/api/imagesearch/:query', function(req, res){
    createHistory(req);
    goGoogle(req, res);
});

app.get('/api/latest/imagesearch/', function(req, res){
    Search.find({}, '-_id -__v', {sort: {time: -1}}, function(err, data){
        res.json(data);
    }).limit(10);
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server started');
});

// helpers
function goGoogle(req, res){
    var userSearch = req.params.query,
        offset = req.query.offset || 1;
    if(!+req.query.offset || req.query.offset > 90){
        offset = 1;
    } 
    var options = {
        url: `${mainUrl}${userSearch}${seid}${image}&start=${offset}${apikey}` 
    };

    request(options, getData);
    function getData(err, response, body){
        if (!err && response.statusCode == 200) {
            var info = JSON.parse(body);
            var displaySearches = [];
            var displaySearch = {};
            for(var i = 0; i < info.items.length; i++){
                displaySearch = {};
                displaySearch.url = info.items[i].link;
                displaySearch.snippet = info.items[i].snippet;
                displaySearch.thumbnail = info.items[i].image.thumbnailLink;
                displaySearch.context = info.items[i].image.contextLink;
                displaySearches.push(displaySearch);
            }
            res.send(displaySearches);
        }
    }
}

function createHistory(req){
    var userRequest = {};
    userRequest.search = req.params.query;
    userRequest.time = new Date();

    Search.create(userRequest, function(err, search){
        if(err){ console.error(err) }
    });
}