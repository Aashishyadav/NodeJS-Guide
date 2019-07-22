'use strict';
const querystring = require('querystring');

function add(num1, num2) {
    return num1 + num2;
}

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
            const result = add(number1, number2);
            res.end(result.toString());
        }
    });
}
/* for using compute function
module.exports=compute; */

 module.exports = {
    computeSum: compute,
    addNumbers: add 
}; 