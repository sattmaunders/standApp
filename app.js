var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/user');

var app = express();

//Global vars
global.unlocked = true;
global.steps = 0;
global.away = false;
global.oldStepsStamp = 0;
global.oldStepsExerciseStamp = 0;
global.readyToUnlock = false;
global.targetStepsToWalk = 50;
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);
app.use('/users', users);

app.get('/unlock/nfc',function(request,response){
	unlocked = true;
	oldStepsStamp = steps;
	global.away = false;
	response.send('Time to Unlock it.');
	
});

app.get('/status',function(request,response){
	response.json({unlocked: global.unlocked,
				   steps: global.steps,
				   away: global.away,
				   readyToUnlock: global.readyToUnlock});
});

app.get('/lock/timeout',function(request,response){
	unlocked = false;
	global.readyToUnlock = false;
	global.oldStepsExerciseStamp = global.steps;
	response.send('Timeout, Lock the screen');
});

app.get('/lock/away',function(request,response){
	unlocked = false;
	response.send('User Away, Lock the screen.');
});

app.get('/steps/:steps', function(request,response){
	global.steps = parseInt(request.param('steps'));
	response.json({steps: global.steps});
	if(((steps - oldStepsStamp) > 10) && unlocked){
		global.away = true;
	} else{
		global.away = false;
	}
	if(((steps - global.oldStepsExerciseStamp) > global.targetStepsToWalk) && !unlocked ){
		global.readyToUnlock = true;
	} else{
		global.readyToUnlock = false;
	}
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}



// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
