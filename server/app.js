const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const session = require('express-session');

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/DomoMaker';
//const dbURI = "mongodb+srv://leh3291_db_user:Lh127712@cluster0.6ypn5xk.mongodb.net/DomoMakerA?appName=Cluster0"
mongoose.connect(dbURI).catch((err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const app = express();

app.use(helmet());
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
  key: 'sessionid', // this is the name, by default its connect.sid
  secret: 'Domo Arigato', //is this a domo thing?
  resave: false,
  saveUninitialized: false, 
}));

app.engine('handlebars', expressHandlebars.engine({defaultLayout: ''}));

router(app);

app.listen(port, (err) => {
  if (err) { throw err; }
  console.log(`Listening on port ${port}`);
});
