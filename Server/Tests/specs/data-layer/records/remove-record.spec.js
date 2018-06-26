const addNewUser = require('data-layer/user/add-new-user.db')
const addRecord = require('data-layer/record/add-record.db')
const { connectToDb } = require('helpers/requestsSpecHelper')
const deleteRecord = require('data-layer/record/remove-record.db')
const faker = require('faker')
const getRecord = require('data-layer/record/get-record.db')


describe('removing a record', function () {
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
    let mealId
    beforeAll((done) => {
        addNewUser(payload, 'regular').then(x => {
            expect(x.name).toBe(payload.name)
            expect(x.email).toBe(payload.email)
            id = x._id
            const newRecord = {
                name: 'meal1',
                numOfCalories: 600,
                date: Date.now()
            }
            addRecord(id, newRecord).then(x => {
                done()
            })
        })
    })

    it('should delete record successfully', async function (done) {      
        await deleteRecord(id, mealId)
        getRecord(id, mealId).then(x => {
            expect(x).toBeFalsy()
            done()
        })
    })

})