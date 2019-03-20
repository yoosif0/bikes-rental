
# Bikes Rental

## Configuration
Add a .env file in the `Server` folder. This file would contain all non-shareable config.


### Mailer Config
* Add `mailerUser` (sender email address) and `mailerPass` (sender email password) to the `.env` file 

### Database Setup
* Add geospatial index in mongodb
  * db.getCollection('bikes').createIndex( { location : "2dsphere" } )


### Notice

The code has been tested on a Windows 10 x64 machine. No guarantees that the development environment would work in other operating systems; hopefully it does


