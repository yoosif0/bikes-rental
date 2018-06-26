require('dotenv').config()
const db = require('src/core/dbConnection.js')



function connectToDb(){
    db.connectToOriginalDb()
}
module.exports = { connectToDb}