
# Bikes Rental

## Configuration
Add a .env file in the `Server` folder. This file would contain all non-shareable config.


### Mailer Config
* Add `mailerUser` (sender email address) and `mailerPass` (sender email password) to the `.env` file 


## Heroku
1. Register for an app in heroku 
2. Use the following command to install heroku-config package. `heroku plugins:install heroku-config`
3. Make sure you are logged into heroku cli. If not use the `heroku login` command
4. To push only backend node.js api to heroku. `git subtree push --prefix Server heroku master`  in the root folder
    * For heroku logs. `heroku logs -t --app "app-name"` 

To push and pull environment variables: 
heroku plugins:install heroku-config
cd Server
heroku config:push

### Notice

The code has been tested on a Windows 10 x64 machine. No guarantees that the development environment would work in other operating systems; hopefully it does


