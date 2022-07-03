const path = require('path');
const sequelize = require('./config/connection');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const dayjs = require('dayjs');

const hbs = exphbs.create({ helpers });

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const sess ={
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
};

app.use(session(sess));

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/index'));

// Connect Sequelize to Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});