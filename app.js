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

//app.('/gcm/')


app.get('/gcm/startWorkout',function(request,response){
  unlocked = true;
  global.oldStepsStamp = global.steps;
  global.away = false;
	global.readyToUnlock = false;
	response.send('Time to Unlock it.');	
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



var gcm = require('node-gcm');

var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        key1: 'message1',
        key2: 'message2'
    }
});


message.collapseKey = 'demo';
message.delayWhileIdle = true;
message.timeToLive = 3;
message.dryRun = true;

var sender = new gcm.Sender('AIzaSyAGYXOTzzZRQLzXKt9OD12WqU3VUhhtFEQ');

var registrationIds = [];
registrationIds.push('APA91bG2uIbWZxkxrX-OFJBvEOFaozx694mplnzcVl7HE4RHo6cmlRbdjF3daJAgSMDtCVAlGQEdGBcjPC-J6tb-7lfaT9H2vvD48c2-88kAHdqXpEh5e4aRjsdvjhB7UOylnNtXIzXIrlAEI5sCT3a-JlNNwJw36w');
registrationIds.push('APA91bHSPJrS3KZ0GANX1-sqb4V9EV7V-v1DkMV2_I_G7OZIfJD3gqxY_dwsvPVk6wH0wtXMxVKiAyRMJD7JcVMc5PR6BPIPXYiYF8hfKFe2wDC_Klf_5dn_PdPLjJQQ9X_KBroqpOoE5Hr3o1-ezzUB2JMCCc4tjA');

sender.sendNoRetry(message, registrationIds, function(err, result) {
  if(err) console.error(err);
  else    console.log(result);
});



module.exports = app;
