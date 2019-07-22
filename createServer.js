const http = require('http');
const fs = require('fs');
const url = require('url');
 // const querystring = require('querystring');
 const compute = require ('./compute'); 

/*
 function compute(req, res) {
    const contentLength = parseInt(req.headers['content-length']);
    let requestBody = '';
    req.on('data', function(chunk) {
        requestBody = requestBody + chunk.toString();

        if(requestBody.length >= contentLength) {
            // okay entire request is parsed now.
            // Start processing.
            const bodyObj = querystring.parse(requestBody);
            const number1 = parseFloat(bodyObj.number1);
            const number2 = parseFloat(bodyObj.number2);
            const result = number1 + number2;
            res.end(result.toString());
        }
    });
} 
*/

/* This Server will not show the result for /add/compute if we are not using 
const compute = require ('./compute'); i.e. we are passing function compute(req,res){} in this file only.
For that we need to enable { module.exports=compute; } in compute.js with module 
const compute = require ('./compute'); in createServer.js & for you'll need queryString module in
 createServer.js */

function onRequest(req, res) {
    console.log('Request path:', req.url);
    const urlParts = url.parse(req.url);
    
if (urlParts.pathname==='/')
{
    const stream= fs.createReadStream(__dirname +'/HTML/index.html','utf8');
    stream.pipe(res);
}  
 else if (urlParts.pathname==='/login') 
{
    const stream= fs.createReadStream(__dirname +'/HTML/login.html','utf8');
    stream.pipe(res);
}
 else if (urlParts.pathname==='/aboutus')
{
    const stream= fs.createReadStream(__dirname +'/HTML/aboutus.html','utf8');
    stream.pipe(res);
} 
else if (urlParts.pathname==='/Signup') 
{
    const stream= fs.createReadStream(__dirname +'/HTML/Signup.html','utf8');
    stream.pipe(res); 
}  
else if(urlParts.pathname === '/add') {
    const stream = fs.createReadStream(__dirname + '/HTML/add.html', 
    'utf8');
    stream.pipe(res);
}
else if(urlParts.pathname === '/add/compute') {
    compute(req, res);
}
 else
{
    const stream= fs.createReadStream(__dirname +'/HTML/404.html','utf8');
    stream.pipe(res);
} 
}

const server = http.createServer(onRequest);
server.listen(9000);
