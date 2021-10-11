global.appurl = "http://localhost:3000";
global.PROJECT_DIR = __dirname;

require("rootpath")();
var createError = require("http-errors");
var express = require("express");
var session = require('express-session');
var xFrameOptions = require('x-frame-options');
const csp = require('express-csp-header');
var path = require("path");
var cookieParser = require("cookie-parser");
//const { MongoClient } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
require("./utility/picklistUtility");
require("dotenv").config();
require("./utility/constant");
const jwt = require("_helpers/jwt");
var logger = require("morgan");
let cors = require('cors')

const swaggerUi = require("swagger-ui-express");
//swaggerDocument = require("./swagger.json");

/** CRYPTO CONFIG*/
global.cryptoJSON = require('crypto-json');
global.algorithm = 'camellia-128-cbc'
global.encoding = 'hex'
global.encrypt_password = process.env.ENCRYPT_PASSWORD;
/** CRYPTO */

global.client = {};
try {
  //global.client = new MongoClient(`${process.env.MONGO_URI}?ssl=true`);
  global.uri = process.env.MONGO_URI;

//   creating a new MongoClient here
global.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  global.client.connect();
} catch (e) {
  console.log(`ERROR::: app.js >>> 14 >>> err `, e);
}

var app = express();

// app.use(cors());
 app.use(cors({credentials: true, origin: 'http://localhost:40000'}));
//app.use(cors({credentials:true, origin: 'https://jk-dms.herokuapp.com'}));
app.use(bodyParser.json({ limit: '150mb' }))
app.use(xFrameOptions());
// app.use(csp({
//   policies: {
//     'default-src': [csp.SELF],
//     'script-src': [csp.SELF, csp.INLINE, 'zoxima-cns.herokuapp.com'],
//     'style-src': [csp.SELF, 'zoxima-cns.herokuapp.com'],
//     'img-src': ['data:', 'zoxima-cns.herokuapp.com'],
//     'worker-src': [csp.NONE],
//     'block-all-mixed-content': true
//   }
// }));

app.use(bodyParser.json())

/*
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "https://jk-dms.herokuapp.com");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
*/

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'GHFHSGAVNBA6735e673HJGDSHDJHasdasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var http = require('http');
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
require("./router")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

//Swagger UI Implement

server.listen(port);

module.exports = app;
