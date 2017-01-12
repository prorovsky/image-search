var express = require('express'),
    app = express(),
    request = require('request'),
    mongoose = require('mongoose');

var userReq ='';
var page = '';
var options = {
    url: `https://api.imgur.com/3/gallery/t/${userReq}/viral/${page}`,
    headers: {
        Authorization: 'Client-ID ' + process.env.CLIENTID
    }
};

app.get('/:hello', function(req, res){
    res.send('hello');
});

app.get('/api/imagesearch/:query/:page', function(req, res){
    userReq = req.params.query;
    page = req.params.page;
    request(options, getData);
    function getData(err, response, body){
        if (!err && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.send(info);
        }
    }
});

app.get('/api/latest/imagesearch/', function(req, res){

    // request db for user's history
    res.send('history');
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server started');
});