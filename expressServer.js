const express = require('express');
const url = require('url');
const fs = require('fs');
const morgan = require('morgan');
// const parseBody = require('./lib/parse-body');
const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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

// adding cookieParser middleware
app.use(cookieParser('keyboard cat')); // added same secret key value as of the session middleware

app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'keyboard cat'
}));

// app.use(parseBody);
app.use(BodyParser.urlencoded({
    extended : true ,
    parameterLimit : 100
}));
app.use(express.static('public'));

/* commented this because created a new app.get('/') for checking if user is logged in or not
app.get('/', function(req, res){
    // Adding Cookie visited with Date.now() or Date() value
   // res.cookie('visited', Date.now().toString());
   //  res.cookie('visited', (new Date().toString()));   // commented this line because req.session.add_result

    // Insted of res.cookie(); printing req.session value everywhere (i.e. to path '/' & '/add')
     console.log('reult:', req.session.add_result);
    const stream = fs.createReadStream(__dirname + '/HTML/index.html', 
    'utf8');
    stream.pipe(res);
});
*/
// For Checking if user is logged in or Not
app.get('/', function(rq, res) {
      if(rq.session.isLoggedIn) {
          res.render('home.pug', {
              name: 'Ashish Yadav'
          });
      }
      else {
          res.render('login.pug', {});
      }
})

// To store username and Password send by user throough login.pug
app.post('/login', function(req, res) {
    const username = req.body.username ;
    const password = req.body.password ;

    if(username === 'ashish' && password === 'nothing')
        {
            req.session.isLoggedIn = true ;
            // If login is successful then redirect to given path
            res.redirect('/');
        }
       else {
        req.session.isLoggedIn = false ;
       
        // if login fails
        res.render('login.pug', {
                    error : true 
        });

       } 
});

/*
        app.get('/add', function(req, res) {
            const stream = fs.createReadStream(__dirname + '/HTML/add.html', 
                'utf8');
            stream.pipe(res);
        });
*/

/* Using this we can't add the oldResult
        app.get('/add', function(req, res){
            // before adding cookieParser middleware
        //  console.log('Cookie is :', req.headers.cookie);
        // after adding cookieParser middleware
        console.log('Cookie is :', req.cookies);  
        res.render('sum.pug', {});
        });
*/
// Using this we can add oldResult
        app.get('/add', function(req, res){
            console.log('reult:', req.session.add_result);
            const oldResult = req.cookies.add_result ;
         //   console.log('Cookie is :', req.cookies); 
            res.render('sum.pug', {
                sum: oldResult
            });
        });

// Beacuse we used the express.static(public) as long as the file is in public folder we don't need below code
/* 
        app.get('/bootstrap.min.css', function(req, res) {
            const stream = fs.createReadStream(__dirname + '/bootstrap.min.css', 
                'utf8');
            stream.pipe(res);
        }); 
*/

app.post('/add/compute', computeObj.computeSum);

app.use(notFound);
app.listen(9000);