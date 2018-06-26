const addNewUser = require('src/data-layer/user/add-new-user.db')
const getUserByEmail = require('src/data-layer/user/get-user-by-email')
const updateUserInfo = require('src/data-layer/user/update-user-info.db')
const GetUserQuery = require('src/data-layer/user/get-users.db')
const { connectToDb } = require('helpers/requestsSpecHelper')
const faker = require('faker')
const removeUser = require('src/data-layer/user/remove-user.db')

const name = faker.name.firstName()
const email = faker.internet.email()
const password = '1234567a'
const role = 'regular'


describe('users endpoint', function () {


    beforeAll(() => {
        // connectToDb()
        // const x = await addNewUser(name, email, password, role).catch(err => { throw err })
        // console.log(x.name, name)
        // expect(x.name).toBe(name)
        // expect(x.email).toBe(email)
    })

    describe('addming new user', () => {
        it('should add successfully', async () => {
            const x = await addNewUser(name, email, password, role).catch(err => { throw err })
            expect(x.name).toBe(name)
            expect(x.email).toBe(email)
        })
        describe('crudding added user', () => {
            it('should GET user by email ', function () {
                const x = getUserByEmail(email).catch(err => { throw err })
                expect(x.email).toBe(email)
                expect(x.name).toBe(name)
            })

            it('should GET all users ', function () {
                const getUserQuery = new GetUserQuery(10, 0, '')
                const x = getUserQuery.getUsers().catch(err => { throw err })
                expect(x.length).toBeTruthy()
                expect(x[0].name).toBeTruthy()
                expect(x[0].role).toBeTruthy()
            })

            describe('updating user info', () => {
                const newName = 'AA'
                const newEmail = 'dasd@dsad.com'
                beforeAll(async () => {
                    const user = await updateUserInfo({name: newName, email: newEmail})
                })


                describe('removing user', () => {
                    beforeAll(async () => {
                        const user = await getUserByEmail(email)
                        expect(user).toBeTruthy()
                        await removeUser(user._id)
                    })
                    it('should remove user ', async function (done) {
                        const deletedUser = await getUserByEmail(email)
                        expect(deletedUser).toBeFalsy()
                        done()
                    })
                })
            })
        })
    })
})

