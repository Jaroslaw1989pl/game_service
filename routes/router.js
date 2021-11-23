const fs = require('fs');
const path = require('path');

// configuring HTTP headers
const setHeaders = (link) => {
  // informing the browser about the format of the sent document
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
  const fileExtension = path.extname(link).toLowerCase();
  const contentType = mimeTypes[fileExtension] || 'application/octet-stream';

  return {
    'Content-type': contentType
  }
}; 

// reading the file, and sending the content
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

// defining route paths
const router = (request, response) => {
  
  const link = request.url;

  const statusCode = 200;
  const headers = setHeaders(link);
  
  const static = link.substr(1, link.indexOf('/', 1) - 1);
  
  // serving static files
  if(static === 'styles') {
    renderHTML('public' + link, statusCode, headers, response);
  } else if(static === 'scripts') {
    renderHTML('public' + link, statusCode, headers, response);
  } else if(static === 'assets') {
    renderHTML('public' + link, statusCode, headers, response);
  } 
  // serving HTML files and HTTP request methods
  else if(request.url === '/') {
    renderHTML('public/views/home.html', statusCode, headers, response);
  } else if(request.url === '/login') {
    renderHTML('public/views/login.html', statusCode, headers, response);
  } else if(request.url === '/registration') {
    renderHTML('public/views/registration.html', statusCode, headers, response);
  } else if(request.url === '/favicon.ico') {
    renderHTML('public/assets/favicon.png', statusCode, headers, response);
  } else {
    renderHTML('public/views/404.html', 404, headers, response);
  }
};

module.exports = router;