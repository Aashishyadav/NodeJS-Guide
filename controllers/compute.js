'use strict';
const querystring = require('querystring');
const fs = require('fs');

function add(num1, num2) {
    return num1 + num2;
}
/*

function compute(req, res) {
   /*  Code written in parse-body.js 

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
            const result = add(number1, number2);
            res.end(result.toString());
        }
 });
}
*/
// Business Logic 
function compute(req, res) {
    const number1 = parseFloat(req.body.number1); // req.body = bodyObj
    const number2 = parseFloat(req.body.number2);
    const result = add(number1, number2);
   // res.end(result.toString());  // because using {sum} in sum.html
  
   // for rendering the pug template
   res.render('sum.pug', {sum:result});

    /* // below codes under comment because we used rendering of pug
     fs.readFile(__dirname + '/../HTML/sum.html', function (err, htmlStr){
       if (err) {console.log(err);
                   throw err ;
                  }
       const htmlResponse = htmlStr.toString().replace('{sum}', result.toString());
       res.end(htmlResponse);

   })
 */
}
  // for taking compute function in createServer.js from compute.js // 
   module.exports=compute; 

// for Express Server . Comment below lines for above code
 module.exports = {
    computeSum: compute,
    addNumbers: add 
   };  