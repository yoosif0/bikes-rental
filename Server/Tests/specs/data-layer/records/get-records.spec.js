const addNewUser = require('data-layer/user/add-new-user.db')
const addBulkRecords = require('data-layer/record/add-bulk-records.db')
const getRecords = require('data-layer/record/get-records.db')
const { connectToDb } = require('helpers/requestsSpecHelper')

const faker = require('faker')


describe('getting records', function () {
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

    describe('adding a testing records ', function () {
        beforeEach((done) => {
            const meals = []
            for (let i = 0; i < 50; i++) {
                meals.push({
                    name: faker.name.firstName(),
                    numOfCalories: Math.random() * 100,
                    date: new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
                })
            }
            addBulkRecords(id, meals).then(x => {
                done()
            })
        })

        it('should use skip and limit correctly', (done)=>{
            getRecords(id, 10, 0, '2017-05-01', '2019-05-01', '06:30', '10:00').then(x=>{
                expect(x.meals.length).toBeGreaterThanOrEqual(1)
                done()
            })
        })


        
    })





})