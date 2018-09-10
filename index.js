"use strict";
var fs = require('fs');

var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer(); // for parsing multipart/form-data
var app = express();

function corsMiddleware(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
}

function errCallback(err) {
    if (err) {
        console.log(err.message);
    }
}

function fsExistsSync(path) {
    try{
        fs.accessSync(path, fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

function dataHandler(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var path = req.params.path;
    var file = req.params.file;

    var path_front = '/home/parndeedlit/company/zondy/webclient/WebClient-Leaflet/data/';
    var path = path_front + `${path}` + '/' + `${file}`;

    var exist = fsExistsSync(path);
    console.log(`${path}` + "!!!!!!!!!!!!!!");
    if(exist){
        console.log(`${path}' + 'file is exist!`);
        var pbf = fs.readFileSync(path);
        res.end(pbf);
    }else{
        console.log(`${path}' + 'file is not exist!`);
        res.sendStatus(500);
    }
};

app.use(corsMiddleware);
app.use(bodyParser.json({limit: '100mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', express.static('./'));
app.use('/libs', express.static('./libs'));
app.use('/data', express.static('./data'));
app.use('/demo', express.static('./demo'));
app.get('/', function (req, res) {
    res.redirect('ui/index.html');
});

//app.get('/bigdata/:path/:file', dataHandler);

app.listen(8899, function () {
  console.log("Website is http://localhost:8899");
});
