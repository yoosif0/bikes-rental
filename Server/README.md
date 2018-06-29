Add geospatial index in mongodb

db.getCollection('bikes').createIndex( { location : "2dsphere" } )