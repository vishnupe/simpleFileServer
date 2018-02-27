const http = require('http');
const https = require('https');
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')
var finalhandler = require('finalhandler')
var contentDisposition = require('content-disposition')
// const url = require('url');
const fs = require('fs');
// const path = require('path');
const port = process.argv[2] || 9000;
var key = fs.readFileSync('private.key');
var cert = fs.readFileSync( 'primary.crt' );
// var ca = fs.readFileSync( 'intermediate.crt' );
var options = {
    key: key,
    cert: cert
    // ca: ca
  };

// https.createServer(options, function (req, res) {
//   console.log(`${req.method} ${req.url}`);

//   // parse URL
//   const parsedUrl = url.parse(req.url);
//   // extract URL path
//   let pathname = `.${parsedUrl.pathname}`;
//   // based on the URL path, extract the file extention. e.g. .js, .doc, ...
//   const ext = path.parse(pathname).ext;
//   // maps file extention to MIME typere
//   const map = {
//     '.ico': 'image/x-icon',
//     '.html': 'text/html',
//     '.js': 'text/javascript',
//     '.json': 'application/json',
//     '.css': 'text/css',
//     '.png': 'image/png',
//     '.jpg': 'image/jpeg',
//     '.wav': 'audio/wav',
//     '.mp3': 'audio/mpeg',
//     '.svg': 'image/svg+xml',
//     '.pdf': 'application/pdf',
//     '.doc': 'application/msword',
//     '.txt': 'application/text'
//   };

//   fs.exists(pathname, function (exist) {
//     if(!exist) {
//       // if the file is not found, return 404
//       res.statusCode = 404;
//       res.end(`File ${pathname} not found!`);
//       return;
//     }

//     // if is a directory search for index file matching the extention
//     if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

//     // read file from file system
//     fs.readFile(pathname, function(err, data){
//       if(err){
//         res.statusCode = 500;
//         res.end(`Error getting the file: ${err}.`);
//       } else {
//         // if the file is found, set Content-type and send data
//         res.setHeader('Content-type', map[ext] || 'text/plain' );
//         res.end(data);
//       }
//     });
//   });


// }).listen(parseInt(port));

var index = serveIndex('public/', {'icons': true})
var serve = serveStatic('public/', {
    setHeaders
})

function setHeaders (res, path) {
    res.setHeader('Content-Disposition', contentDisposition(path))
}
   
var server = https.createServer(options,function onRequest(req, res){
    var done = finalhandler(req, res)
    serve(req, res, function onNext(err) {
      if (err) return done(err)
      index(req, res, done)
    })
  })
   
  // Listen
  server.listen(port)
console.log(`Server listening on port ${port}`);