# standApp

## SETUP
To run the app:
grunt

To deploy to heroku:
git push heroku master

Setup Heroku:
heroku git:remote -a standapp-server


## END POINTS
### /user/register
- type: POST
- params: {userId: [email], regId: [registration_id from Google]}

### /user/:userId/message
- type: POST
- params: {content: [message to send to all registered devices]}

### /user/:userId
- type: DELETE

### /user/:userId
- type: GET

## TODO:
'/workout/start'
- type: POST
-- userId: [email]

'workout/end'
- type: POST
-- userId: [email]


## FOR TESTING
### /gcmtest/:key/:content
A get to this URL is going to broadcast the GCM message {key: :key, content: :content}