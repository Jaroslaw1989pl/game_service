const http = require('http');
const fs   = require('fs');
require('dotenv').config();

const port = process.env.PORT || 3001;

// creating HTTP server
const httpServer = http.createServer((request, responce) => {

  if(request.url === '/') {
    fs.readFile('views/home.html', (error, data) => {
      if(error) {
        console.log(error);
      } else {
        responce.writeHead(200, {'Content-Type': 'text/html'});
        responce.write(data);
        responce.end();
      }
    });
  }

});
httpServer.listen(port, () => {
  console.log(`HTTP server running at port ${port}`);
});