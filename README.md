# standApp

## SETUP
To run the app:
grunt

To deploy to heroku:
git push heroku master

Setup Heroku:
heroku git:remote -a standapp-server

## User Model
```json
{
    "user": {
        "_id": 0,
        "config": {
            "email": "",
            "gcmKeys": [],
            "fitDataSources": {
                "steps": "",
                "onfoot": ""
            }
        },
        "preferences": {
            "breaks": {
                "frequency": 5,
                "duration": 5
            },
            "work": {
                "hours": {
                    "start": "09:00",
                    "end": "17:00"
                },
                "days": [
                    true,
                    true,
                    true,
                    true,
                    true,
                    false,
                    false
                ]
            },
            "goals": {
                "daily": {
                    "steps": 150,
                    "onfoot": 40
                }
            }
        },
        "history": {
            "weeks": {
                "best": {
                    "steps": [],
                    "onfoot": []
                },
                "previous": {
                    "steps": [],
                    "onfoot": []
                },
                "current": {
                    "steps": [],
                    "onfoot": []
                }
            }
        }
    }
}
```

## END POINTS
### /user
- type: POST
- body: {email: [email]}
- response
 - 200: User created
 - 400: email missing
 - 409: Email already used

### /user/:userId/gcmKey/:key
- type: POST
- response
 - 200: GCM key added or already there
 - 400: userId or gcmKey
 - 404: User not found

### /user?email=[email]
- type: GET
- response
 - 200: Returns the user
 - 400: email missing
 - 404: User not found

### /user/:userId/preferences
- type: PUT
- body: {preferences: [preferences]}
- response
 - 200: Returns the updated user
 - 400: userId or preferences missing
 - 404: User not found

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