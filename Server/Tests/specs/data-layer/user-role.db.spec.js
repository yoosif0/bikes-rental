const addNewUser = require('src/data-layer/user/add-new-user.db')
const updateUserRole = require('src/data-layer/user/update-role.db')
const getUserRoleById = require('src/data-layer/user/get-user-role-by-id')
const { connectToDb } = require('helpers/requestsSpecHelper')

const faker = require('faker')


describe('user role', function () {
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
    beforeAll(async (done) => {
        const user = await addNewUser(payload, 'regular')
        expect(user.name).toBe(payload.name)
        expect(user.email).toBe(payload.email)
        id = user._id
        done()
    })



    it('should update and get new user role successfully', async function (done) {
        const newRole = 'manager'
        expect(await updateUserRole(id, newRole)).toBeTruthy()
        expect(await getUserRoleById(id)).toBe(newRole)
        done()
    })





})