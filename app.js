var express = require('express'),
    app = express(),
    request = require('request'),
    mongoose = require('mongoose');

var options = {
    url: ' https://api.imgur.com/3/gallery/t/funny/viral/1',
    headers: {
        Authorization: 'Client-ID ' + process.env.CLIENTID
    }
}

app.get('/', function(req, res){

    res.send('hello');

});

app.get('api/imagesearch/:query', function(req, res){

    request(options, getData);
    function getData(err, response, body){
        if (!error && response.statusCode == 200) {
            // var info = JSON.parse(body);
            res.json(body);
        }
    }
});

app.get('api/latest/imagesearch/', function(req, res){

    // request db for user's history

});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server started');
});