require('dotenv').config()
const app = require('src/app')
const db = require('src/core/dbConnection.js')
let server

beforeAll(() => {
    db.connectToOriginalDb()
    server=app.listen(6000)
})
afterAll(() => {
    server.close()
})

