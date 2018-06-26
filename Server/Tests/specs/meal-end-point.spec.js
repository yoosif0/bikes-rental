const api = require('../helpers/api-calls')
const payload = require('../helpers/payload-factory-utility')


describe('meal endpoint', function () {
    let id, userToken, user

    const signUpForAUser = async () => {
        user = payload.newUser()
        const res = await api.signup(user).catch(err => { throw err })
        id = res.body.user._id
        userToken = res.body.token
    }

    describe('signing up for a user', () => {
        beforeAll(async () => {
            await signUpForAUser()
        })

        describe('adding a record to user', () => {
            let res
            const meal = payload.newMeal()
            beforeAll(async () => {
                res = await api.addRecord(id, userToken, meal).expect(200)
            })
            it('should add successfully', () => {
                expect(res.body).toBeTruthy()
            })

            describe('getting todays caloric intake', () => {
                it('should get correct number of calories', async () => {
                    const res = await api.getTodaysIntake(id, userToken).expect(200)
                    expect(res.body).toBe(meal.numOfCalories)
                })
            })

            describe('meal CRUD', () => {
                let res2, mealId
                beforeAll(async () => {
                    res2 = await api.getRecords(id, userToken).expect(200)
                    mealId = res2.body.meals[0]._id
                })
                describe('getting records schema', () => {
                    it('should have count property', () => {
                        expect(res2.body.count).toBeTruthy()
                    })
                    it('should have name property', () => {
                        expect(res2.body.meals[0].name).toBe(meal.name)
                    })
                    it('should have calories property', () => {
                        expect(res2.body.meals[0].calories).toBe(meal.calories)
                    })
                })

                describe('updating record', () => {
                    const meal2 = payload.newMeal()
                    beforeAll(async () => {
                        await api.updateRecord(id, userToken, mealId, meal2).expect(200)
                    })

                    describe('getting a record', () => {
                        let res3
                        beforeAll(async () => {
                            res3 = await api.getRecord(id, userToken, mealId).expect(200)
                        })
                        it('should get successfully', () => {
                            expect(res3).toBeTruthy()
                        })
                        it('should have correct name', () => {
                            expect(res3.body.name).toBe(meal2.name)
                        })
                        it('should have correct calories', () => {
                            expect(res3.body.calories).toBe(meal2.calories)
                        })
                    })

                    describe('deleting record', () => {
                        beforeAll(async () => {
                            await api.deleteRecord(id, userToken, mealId).expect(200)
                        })
                        it('record should not exist', async () => {
                            await api.getRecord(id, userToken, mealId).expect(404)
                        })
                    })
                })
            })
        })
    })
})
