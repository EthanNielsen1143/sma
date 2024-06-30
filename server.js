const express = require('express');
const mongodb = require('./data/database');
const app = express();  
const port = process.env.PORT || 8080;
const routes = require('./routes');
const temples = require('./routes/temples');
const bodyParser = require('body-parser');
const swaggerRoute = require('./routes/swagger');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use('/', routes);
app.use('/temples', temples);
app.use('/api-docs', swaggerRoute);

//error handling middleware
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
