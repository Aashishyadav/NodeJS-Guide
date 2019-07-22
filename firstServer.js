// 15-07-2019 & 16-07-2019

const http = require('http');
const fs =require('fs');
const url = require('url');



    // Reading HTML file through res.end()
/* 
    function onRequest(req,res)
    {
     console.log("We Got our first Request.");
    res.end(" HELLO WORLD ! ", 'utf8');
    res.end('<html><head><title> Test Page By Ashish Yadav.</title></head>' +
    '<body><h1><center>Welcome to First Webpage BY ASHISH YADAV.</center></h1></body</html>');
    }
    const server = http.createServer(onRequest);
    server.listen(9000); 

 */

    //  Reading HTML file through fs.readFileSync 

/*   function onRequest(req,res)
   {
      console.log("We got our First Request.");
      const htmlString = fs.readFileSync(__dirname + '/index.html','utf8');
      console.log('File Reading Completed.');
      res.end(htmlString);
   }
      const server = http.createServer(onRequest);
      server.listen(9000); 

*/      

    // Reading HTML file through fs.readFile()
/*
    function onRequest(req,res)
  {
      console.log("We got our First Request.");
          fs.readFile(__dirname + '/index.html','utf8', function(err,htmlString)
    {
         console.log('readFile Callback Called.');
        if(err)
      {
          console.log('An Unexpected Error has Occured.')
       }
        else
        {
           res.end(htmlString);  
         }
     
    });
  }
         console.log(' Returned from readFile.');
         const server = http.createServer(onRequest);
         server.listen(9000);

*/

      // Reading HTML file using Streams i.e fs.createReadStream()
/*    
      function onRequest(req,res)
      {
        console.log("We got our First Request.");   
        const stream= fs.createReadStream(__dirname +'/index.html','utf8');
        stream.pipe(res);
       }
        const server = http.createServer(onRequest);
        server.listen(9000);

*/
    function onRequest(req,res)
 {
    console.log('Request Path :', req.url);
    console.log('Request Method :', req.method);
    /*  if (req.url==='/')
    {
       res.writeHead(200,{'Content-type':'text/html'});
       res.end('Welcome to MY WEBSITE');
    } 
     else if (req.url==='/home') 
    {
        res.writeHead(200,{'Content-type':'text/html'});
       res.end('Home Page is Under Construction. Do visit US soon.');
        
    }
     else 
    {
        res.writeHead(404,{'Content-type':'text/html'});
       res.end('404 Error - The Page you are loking for is not Avilable.');
    } */
    if (req.url==='/')
    {
        const stream= fs.createReadStream(__dirname +'/HTML/index.html','utf8');
        stream.pipe(res);
    }  else if (req.url==='/login') 
    {
        const stream= fs.createReadStream(__dirname +'/HTML/login.html','utf8');
        stream.pipe(res);
    } else if (req.url==='/aboutus')
    {
        const stream= fs.createReadStream(__dirname +'/HTML/aboutus.html','utf8');
        stream.pipe(res);
    } else if (req.url==='/Signup') 
    {
        const stream= fs.createReadStream(__dirname +'/HTML/Signup.html','utf8');
        stream.pipe(res); 
    }  else
    {
        const stream= fs.createReadStream(__dirname +'/HTML/404.html','utf8');
        stream.pipe(res);
    } 
     
}
const server = http.createServer(onRequest);
server.listen(9000);