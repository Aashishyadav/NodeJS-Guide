const querystring = require('querystring');

function parseBody(req, res, next){
    if (req.method === 'GET')
    {
        return next();
    }
    const contentLength = parseInt(req.headers['content-length']);
    let requestBody = '';
    req.on('data', function(chunk){
        requestBody = requestBody + chunk.toString ();
        if(requestBody.length >= contentLength)
        {
            // okay entire request is parsed now.
            // Start processing.
            const bodyObj = querystring.parse(requestBody);
            req.body = bodyObj;
            next();
        }
    });
}

module.exports = parseBody;