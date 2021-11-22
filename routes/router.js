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
  
  const link = request.url;
  const fileExtension = path.extname(link).toLowerCase();

  const mimeTypes = {
    '': 'text/html',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.ico': 'image/png',
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
  
  const static = link.substr(1, link.indexOf('/', 1) - 1);

  if(static === 'styles') {
    renderHTML('public' + link, 200, {'Content-type': contentType}, response);
  } else if(static === 'scripts') {
    renderHTML('public' + link, 200, {'Content-type': contentType}, response);
  } else {
    if(request.url === '/') {
      renderHTML('public/views/home.html', 200, {'Content-type': contentType}, response);
    } else if(request.url === '/login') {
      renderHTML('public/views/login.html', 200, {'Content-type': contentType}, response);
    } else if(request.url === '/registration') {
      renderHTML('public/views/registration.html', 200, {'Content-type': contentType}, response);
    } else if(request.url === '/favicon.ico') {
      renderHTML('assets/favicon.png', 200, {'Content-type': contentType}, response);
    } else {
      renderHTML('public/views/404.html', 404, {'Content-type': contentType}, response);
    }
  }
  
};

module.exports = router;