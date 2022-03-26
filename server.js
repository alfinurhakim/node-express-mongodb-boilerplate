var express = require('express'),
    chalk = require('chalk'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    dotenv = require('dotenv').config(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// enable cors
app.use(cors())

//view engine setup -------------------------------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// call routes & swagger api documentation
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/welcome.html'));
});
app.use('/api', require("./routes/routes"));

app.listen(process.env.APP_PORT, process.env.APP_HOST, (req, res) => {
    console.log(chalk.green(`listen on ${process.env.APP_HOST}:${process.env.APP_PORT}.`));
})