# standApp

To run the app:
grunt

To deploy to heroku:
git push heroku master

Setup Heroku:
heroku git:remote -a standapp-server


## END POINTS
### /users/register
- type: POST
- params: {userId: [email], regId: [registration_id from Google]}

### /users/message
- type: POST
- params: {userId: [email], content: [message to send to all registered devices]}

TODO:
'/workout/start'
- type: POST
-- userId: [email]

'workout/end'
- type: POST
-- userId: [email]


## FOR TESTING
### /gcmtest/:key/:content
A get to this URL is going to broadcast the GCM message {key: :key, content: :content}