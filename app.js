require('dotenv').config();
const http = require('http');
const fs   = require('fs');

const port = process.env.PORT || 3001;

// creating HTTP server
const httpServer = http.createServer((request, responce) => {

});
httpServer.listen(port, () => {
  console.log(`HTTP server running at port ${port}`);
});