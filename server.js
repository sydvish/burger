var express = require("express");
var exphbs = require("express-handlebars");
const logger = require("morgan");
var path = require("path");
var app = express();
// var connection = require("./config/connection");

// / Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 7000;

app.use(logger("dev"));


app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//use
var routes = require("./controllers/burgers_controller");
app.use(routes)

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});



