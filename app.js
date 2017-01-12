var express = require('express'),
    app = express(),
    request = require('request'),
    mongoose = require('mongoose');

var options = {
    url: `https://api.imgur.com/3/gallery/t/${userReq}/viral/${page}`,
    headers: {
        Authorization: 'Client-ID ' + process.env.CLIENTID
    }
};

app.get('/', function(req, res){

    res.send('hello');

});

app.get('/api/imagesearch/:query/:page', function(req, res){
    var userReq = req.params.query;
    var page = req.params.page;
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