const http = require('http');
const fs = require('fs');
const dotenv  = require('dotenv').config({path: './.env'});


const port = process.env.PORT || 3001;

const httpServer = http.createServer((request, response) => {
  
  let filePath = 'views/';
  let headers;
  console.log(request.url);
  switch (request.url) {
    case '/':
      filePath += 'home.html';
      headers = {'Content-Type': 'text/html'};
      break;
    case '/registration':
      filePath += 'registration.html';
      headers = {'Content-Type': 'text/html'};
      break;
    case '/login':
      filePath += 'login.html';
      headers = {'Content-Type': 'text/html'};
      break;
    case '/favicon.ico':
      filePath = 'assets/puzzle.png';
      headers = {'Content-Type': 'image/png'};
      break;
    case '/styles/home.css':
      filePath += 'styles/home.css';
      headers = {'Content-Type': 'text/css'};
      break;
    default: 
      filePath += '404.html';
      headers = {'Content-Type': 'text/html'};
      break;
  }
  
  fs.readFile(filePath, (error, data) => {
    if(error) {
      console.log(error);
    }
    response.writeHead(200, headers);
    response.write(data);
    response.end();
  });

});
httpServer.listen(port, () => {
  console.log(`HTTP server listen on port: ${port}`);
});