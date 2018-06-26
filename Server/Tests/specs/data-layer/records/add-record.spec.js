const addNewUser = require('data-layer/user/add-new-user.db')
const addRecord = require('data-layer/record/add-record.db')
const { connectToDb } = require('helpers/requestsSpecHelper')

const faker = require('faker')


describe('adding a record', function () {
    beforeAll(() => {
        connectToDb()
    })
    const payload = {
        name: faker.name.firstName(),
        email: faker.internet.email(), maxCalories: 2000, isTrackingDisplayed: true,
        meals: [],
        password: '1234567a'
    }
    let id 
    beforeAll((done) => {
        addNewUser(payload, 'regular').then(x => {
            expect(x.name).toBe(payload.name)
            expect(x.email).toBe(payload.email)
            id = x._id
            done()
        })
    })

    it('should add new record successfully', function (done) {
        const newMeal = {
            name: 'meal1',
            numOfCalories: 600,
            date: Date.now()
        }

        addRecord(id, newMeal).then(()=>{
            done()
        })
    })





})