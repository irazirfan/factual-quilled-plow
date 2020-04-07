var express = require("express");
var app = express();
//console.log("Hello World");

app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));

app.get("/json", function(req, res) {
  var json = { message: "Hello json" };

  if (process.env.MESSAGE_STYLE === "uppercase")
    json.message = json.message.toUpperCase();
  res.json(json);
});

const middleware = (req, res, next)=> {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res)=>{
  res.send({
    time: req.time
  });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", (req, res)=> {
  var firstName = req.query.first;
  var lastName = req.query.last;
  
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });  
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
