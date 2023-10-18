const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res) {
    let path = req.url;
    if(path === '/' || path.toLowerCase() === "/home"){
        res.end("Welcome to my website");
    }
    else if(path.toLowerCase() === "/image") {
        fs.readFile('resources/images/node.js-logo.png', (err, data) => {
            if(err){
                res.writeHead(400, { 'Content-type': 'text/html'});
                console.log(err);
                res.end("No such image");
            } else {
                res.writeHead(200, { 'Content-type' : 'image/png'});
                res.end(data);
            }
        })
    }
    else if(path.toLowerCase() === "/pdf") {
        fs.readFile('resources/pdf/lesson12-Modules_NPM.pdf', (err, data) => {
            if(err){
                res.writeHead(400, { 'Content-type' : 'text/html'});
                console.log(err);
                res.end("No such file");
            } else {
                res.writeHead(200, { 'Content-type' : 'application/pdf'});
                res.end(data);
            }
        })
    }
    else {
        res.writeHead(404);
        res.end("Error 404: Page not found");
    }
}).listen(3000);

