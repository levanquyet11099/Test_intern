const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/product');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));
app.use((req, res, next) => {
    if (!req.session) {
      req.session = {};
    }
    next();
  });

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://quyet1911:htHx2yRmV6g7d9ZL@cluster0.e1wg4.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', router);
app.listen(3000);


