const express = require('express');
const url = require('url');
const fs = require('fs');
const morgan = require('morgan');
// const parseBody = require('./lib/parse-body');
const BodyParser = require('body-parser');
const computeObj = require('./controllers/compute');

function logger(req, res, next) {
    console.log('Request path:', req.url);
        fs.readFile(__dirname + '/index.html', 
        function fileReadComplete(err, htmlStr) {
            next();
        }
    );
}

function notFound(req, res) 
    {
        const stream = fs.createReadStream(__dirname + '/HTML/404.html', 
        'utf8');
        res.status(404);
        stream.pipe(res);
    } 


const app = express();
app.set('view engine', 'pug');
// app.use(logger);
app.use(morgan('tiny'));
// app.use(parseBody);
app.use(BodyParser.urlencoded({
    extended : true ,
    parameterLimit : 100
}));
app.use(express.static('public'));

app.get('/', function(req, res){
    const stream = fs.createReadStream(__dirname + '/HTML/index.html', 
    'utf8');
    stream.pipe(res);
});

/*
app.get('/add', function(req, res) {
    const stream = fs.createReadStream(__dirname + '/HTML/add.html', 
        'utf8');
    stream.pipe(res);
});
*/
app.get('/add', function(req, res){
    res.render('sum.pug', {});
});
// Beacuse we used the express.static(public) as long as the file is in public folder we don't need below code
/* app.get('/bootstrap.min.css', function(req, res) {
    const stream = fs.createReadStream(__dirname + '/bootstrap.min.css', 
        'utf8');
    stream.pipe(res);
}); */

app.post('/add/compute', computeObj.computeSum);

app.use(notFound);
app.listen(9000);