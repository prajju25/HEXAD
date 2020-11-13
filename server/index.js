const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const env = require('./config/config');
const route = require('./routes/route');

var port = (env.PORT || '3000');

app.use(cors());
app.use(bodyParser.json()); 

app.use('/', route);
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, ()=>{
  console.log("server listening on port : "+ port);  
});