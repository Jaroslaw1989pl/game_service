const express = require('express');
const dotenv  = require('dotenv');

const port = process.env.PORT || 3001;

// express app
const app = express();
// setting the path to environment variables
dotenv.config({path: './.env'});


// parse url-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
// parse a json bodies (as sent by API clients)
app.use(express.json());
// register view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// listen for requests
app.listen(3000, () => {
  console.log(`Server running at port ${port}`);
});


// define routes
app.get('/', (req, res) => {
  res.render('./home', {port: port});
});

// 404 page
app.use((req, res) => {
  res.status(404).render('./404');
});