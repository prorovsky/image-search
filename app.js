var express = require('express'),
    app = express(),
    request = require('request'),
    mongoose = require('mongoose');

app.get('/:hello', function(req, res){
    res.send('hello');
});

app.get('/api/imagesearch/:query', function(req, res){
    goGoogle(req, res);
});

app.get('/api/latest/imagesearch/', function(req, res){

    // request db for user's history
    res.send('history');
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server started');
});

function goGoogle(req, res){
    
        var options = {
            url: `${mainUrl}${userSearch}${SEID}${image}${offset}${APIKEY}` 
        };

    request(options, getData);
    function getData(err, response, body){
        if (!err && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.send(info);
        }
    }
}