const faker = require('faker')


module.exports = {
    newUser() {
        return {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: '456565654ds'
        }
    },
    newMeal() {
        return {
            name: faker.random.alphaNumeric(5),
            numOfCalories: faker.random.number({ min: 0, max: 1000}),
            date: Date.now()
        }
    },

    updatedInfoPayload() {
        return {
            name: faker.name.firstName(),
            maxCalories: 3000,
            isTrackingDisplayed: true
        }
    }
}