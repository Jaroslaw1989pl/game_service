const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv').config({path: './.env'});
const router = require('./routes/router'); 


const port = process.env.PORT || 3001;
// creating HTTP server
const httpServer = http.createServer((request, response) => {
  console.log(request.url);
  router(request, response);
});
httpServer.listen(port, () => {
  console.log(`HTTP server listen on port: ${port}`);
});