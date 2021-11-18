const http = require('http');
const fs = require('fs');
const dotenv  = require('dotenv');//.config({path: './.env'});


const port = process.env.PORT || 3001;

const httpServer = http.createServer((request, response) => {

});
httpServer.listen(port, () => {
  console.log(`HTTP server listen on ${port}...`);
});
// // parse url-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({extended: false}));
// // parse a json bodies (as sent by API clients)
// app.use(express.json());
// // register view engine
// app.set('view engine', 'ejs');
// app.set('views', './views');


// // listen for requests
// app.listen(3000, () => {
//   console.log(`Server running at port ${port}`);
// });


// // define routes
// app.get('/', (req, res, next) => {
//   res.render('./home', {port: port});
// });

// // 404 page
// app.use((req, res, next) => {
//   res.status(404).render('./404');
// });