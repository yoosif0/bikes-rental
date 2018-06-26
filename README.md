
# Meals

## Configuration
Add a .env file in the `Server` folder. This file would contain all non-shareable config.

### SSL 
In order for the social login to work client side, https is needed. Use this repo https://github.com/RubenVermeulen/generate-trusted-ssl-certificate to generate ssl keys, then add the keys to a `ssl` folder in the root folder so that it would be used for both the Node.js backend repo for running the https server and for the client side to be used for the angular cli webpack's dev server


### Database Setup
1. Setup MongoDb databases for production and testing then enter the url in the `.env` file as `mongodbMealURI` and `mongodbMealMockURI` respectively
2. Add indexes to the database to ensure high performance running the following commands
    * db.users.ensureIndex({"meals.date" : 1})
    * db.users.ensureIndex({"meals._id" : 1})
    * db.users.ensureIndex({"googleId" : 1})
    * db.users.ensureIndex({"facebookId" : 1})

### Mailer Config
1. Add `mailerUser` (sender email address) and `mailerPass` (sender email password) to the `.env` file 

### Nutritionix Api Config
1. Go to developer.nutritionix.com and signup for an account to get your app id and app key
2. Add `nutritionixAppId` and `nutritionixAppKey` with their corresponding values to the `.env` file 

### Social Sign in

#### Facebook
1. Go to https://developers.facebook.com/apps/ and add a Facebook Login product
2. Add the following Valid OAuth Redirect URIs
    * https://localhost:4400/ for the dev server
    * https://caltrack-meals.herokuapp.com/  for the hosted app
    * https://localhost:3001/  to test serving from the same backend server locally
3. Add to the `.env` file the clientId and clientSecret using the following props respectively: `facebookClientId` and `facebookClientSecret`

#### Google
1. Go to https://console.developers.google.com/apis/credentials
2. Add the same urls as shown above in "Authorized JavaScript origins" section
3. Add to the `.env` file the clientId and clientSecret using the following props respectively: `googleClientId` and `googleClientSecret`

### Google Recaptcha
1. Go to https://www.google.com/recaptcha/admin#list and signup for api keys
2. Add to the `.env` file the site key and secret key using the following props respectively: `captchaSiteKey` and `captchaSecretKey`

### Local Json Web Token
1. Add `secret` to the `.env` for jwt 

### All `.env` file properties
* NODE_ENV
* facebookClientId
* facebookClientSecret
* googleClientId
* googleClientSecret
* mailerPass
* mailerUser
* mongodbMealMockURI
* mongodbMealURI
* nutritionixAppId
* nutritionixAppKey
* secret
* captchaSiteKey
* captchaSecretKey

## Backend
### Development Server
1. Run `npm run dev` to fire up nodemon

### Production Server
2. Run `npm start`

### Testing
1. Signup for a user and manually change the user's role in MongoDb to `admin`. Make sure this user has the following credentials:
email: "admin@test.com", password: "1234567a"
2. Ensure the availability for a `manager` user with the following credentials
email: "manager@test.com", password: "1234567a"
3. Add NODE_ENV="testing" to your `.env` file or replace the current NODE_ENV value. This is to ensure `Google Recaptcha` would not fail our tests
4. Run `npm test` for api and unit tests

## Client side

### Build
For Development: Run `npm start` to build the project and use the dev-server. Then navigate to `http://localhost:4400/`
For Production: Run `npm run prod` to build the project in the public directory in the `Server` folder.

### Running unit tests
Run `npm t` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
You might need to update webdriver manager before running tests by running `npm run update-wd`
1. Run `npm start`
2. Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Heroku
1. Register for an app in heroku 
2. Use the following command to install `heroku-config` package. `heroku plugins:install heroku-config`
3. Make sure you are loggin into heroku cli. If not use the `heroku login` command
2. Use the following git command in the root folder to push only backend node.js api to heroku. `git subtree push --prefix Server heroku master` 
    * Use the following command for heroku logs. `heroku logs -t --app "app-name"` 

To push and pull environment variables: 
heroku plugins:install heroku-config
cd Server
heroku config:push

### Notice

The code has been tested on a Windows 10 x64 machine. No guarantees that the development environment would work in other operating systems; hopefully it does


