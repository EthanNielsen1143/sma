const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 8080;
const routes = require('./routes');
const spills = require('./routes/spills');
const workers = require('./routes/workers');
const managers = require('./routes/managers');
const summaries = require('./routes/summaries');
const bodyParser = require('body-parser');
const swaggerRoute = require('./routes/swagger');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session'); // Import express-session
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(cors({origin: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({origin: '*'}));


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL 
},
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => { 
  done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api_docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

// Routes
app.use('/', routes);
app.use('/spills', spills);
app.use('/workers', workers);
app.use('/api-docs', swaggerRoute);
app.use('/managers', managers);
app.use('/summaries', summaries);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); 
  res.status(500).send({ error: "An unexpected error occurred!" });
});

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log(`Database is listening and node is running on localhost:${port}`)})
  }
});

module.exports = app;