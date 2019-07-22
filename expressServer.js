const express = require('express');
const url = require('url');
const fs = require('fs');
const computeObj = require('./compute');

function logger(req, res, next) {
    console.log('Request path:', req.url);
    fs.readFile(__dirname + '/index.html', 
        function fileReadComplete(err, htmlStr) {
            next();
        }
    );
}

function onRequest(req, res) {
    const urlParts = url.parse(req.url);
    
    if(urlParts.pathname === '/') {
        const stream = fs.createReadStream(__dirname + '/HTML/index.html', 
        'utf8');
        stream.pipe(res);
    }
    else {
        const stream = fs.createReadStream(__dirname + '/HTML/404.html', 
        'utf8');
        stream.pipe(res);
    }
}

const app = express();
app.use(logger);

app.get('/add', function(req, res) {
    const stream = fs.createReadStream(__dirname + '/HTML/add.html', 
        'utf8');
    stream.pipe(res);
});
app.post('/add/compute', computeObj.computeSum);

app.use(onRequest);
app.listen(9000);