const fs = require('fs');
const path = require('path');

const renderHTML = (path, statusCode, headers, response) => {
  
  fs.readFile(path, (error, data) => {
    if(error) {
      console.log(error);
    } 
    response.writeHead(statusCode, headers);
    response.write(data);
    response.end();
  });

};

const router = (request, response) => {
  
  const filePath = request.url;
  const fileExtension = path.extname(request.url).toLowerCase();
  const mimeTypes = {
    '': 'text/html',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };

  const contentType = mimeTypes[fileExtension] || 'application/octet-stream';

  if(request.url === '/') {
    renderHTML('./public/views' + filePath + 'home.html', 200, {'Content-type': 'text/html'}, response);
  } else if(request.url === 'login.html') {
    renderHTML('./public/views' + filePath, 200, {'Content-type': contentType}, response);
  } else if(request.url === 'registration.html') {
    renderHTML('./public/views' + filePath, 200, {'Content-type': contentType}, response);
  } else if(request.url === 'styles/home.css') {
    console.log(request.url, contentType);
    renderHTML('./public/' + filePath, 200, {'Content-type': contentType}, response);
  } else if(request.url === 'scripts/home-paths.js') {
    renderHTML('./public/' + filePath, 200, {'Content-type': contentType}, response);
  } else {
    renderHTML('./public/views/404.html', 404, {'Content-type': 'text/html'}, response);
  }

};

module.exports = router;