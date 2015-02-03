var express = require('express');
var request = require('request');
var router = express.Router();

/** GCM Config **/
var gcm = require('node-gcm');

var notificationUrl = "https://android.googleapis.com/gcm/notification";
var apiKey = "AIzaSyDSdZlLQhrXQCM6bpLoY-XPCEIXLcg88Wc";
var projectId = 665143645608;

var sender = new gcm.Sender(apiKey);
var registrationIds = [];
registrationIds.push('APA91bG2uIbWZxkxrX-OFJBvEOFaozx694mplnzcVl7HE4RHo6cmlRbdjF3daJAgSMDtCVAlGQEdGBcjPC-J6tb-7lfaT9H2vvD48c2-88kAHdqXpEh5e4aRjsdvjhB7UOylnNtXIzXIrlAEI5sCT3a-JlNNwJw36w');
registrationIds.push('APA91bHSPJrS3KZ0GANX1-sqb4V9EV7V-v1DkMV2_I_G7OZIfJD3gqxY_dwsvPVk6wH0wtXMxVKiAyRMJD7JcVMc5PR6BPIPXYiYF8hfKFe2wDC_Klf_5dn_PdPLjJQQ9X_KBroqpOoE5Hr3o1-ezzUB2JMCCc4tjA');


/** GCM TEST **/
router.get('/gcmtest/:key/:content', function(req, res) {

  var key = req.params.key;
  var content = req.params.content;


  var message = new gcm.Message({
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
      'key': key,
      'content': content
    }
  });

  sender.sendNoRetry(message, registrationIds, function(err, result) {
    if(err) { res.send('Error :-('); }
    else    { res.send('Message sent: {key: ' + key + ', content: ' + content + '} !!'); }
    });
});


/** GCM **/
router.post('/register', function(req, res) {

  var keyName = 'standapp-' + req.body.userId;

  var requestBody = JSON.stringify({
    "operation": "create",
    "notification_key_name": keyName,
    "registration_ids": [req.body.regId]
  });

  var requestOptions = {
    method: 'POST',
    url: notificationUrl,
    header: {
      "Content-Type": "application/json",
      "project_id": projectId.valueOf(),
      "Authorization" : "key=" + apiKey
    },
    body: requestBody
  };

  var requestCallback = function(error, response, body) {
    return error ? res.send(error) : res.send(response.body);
  };

  console.log(requestOptions);
  request(requestOptions, requestCallback);
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
