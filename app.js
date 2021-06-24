const express = require('express');
const passport = require('passport');
const app = express();

require('./models/User');
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

app.listen(3000, () => console.log('Listening on http://localhost:3000'));