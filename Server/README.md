Add geospatial index in mongodb

db.getCollection('bikes').createIndex( { location : "2dsphere" } )

## Heroku Instructions
1. heroku login
2. heroku create 
3. heroku apps:rename -a "old-name" "new-name"
4. heroku git:remote -a "app-name"
5. cd.. 
6. git subtree push --prefix Server heroku master
7. add heroku
8. Use the following command to install `heroku-config` package. `heroku plugins:install heroku-config`
    * Use the following command for heroku logs. `heroku logs -t --app "app-name"` 

To push config variables
1. cd Server
2. heroku config:push

