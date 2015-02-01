# standApp

To run the app:
grunt

To deploy to heroku:
git push heroku master

Setup Heroku:
heroku git:remote -a standapp-server

TODO:
End Points:
'/register'
- type: POST
- params: 
-- userId: [email]
-- regId: registration ID from GCM

'/workout/start'
- type: POST
-- userId: [email]

'workout/end'
- type: POST
-- userId: [email]


## FOR TESTING
### /gcmtest/:key/:content
A get to this URL is going to broadcast the GCM message {key: :key, content: :content}