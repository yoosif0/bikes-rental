const app = require('src/app')
const request = require('supertest')(app)

module.exports = {

    login(payload) {
        return request.post('/api/users/login').send(payload)
    },

    signup(payload) {
        return request.post('/api/users').send(payload)
    },

    updateUserInfo(id, token, payload) {
        return request.put(`/api/users/${id}/info`).set({ 'Authorization': `Bearer ${token}` }).send(payload)
    },

    deleteUser(id, adminToken) {
        return request.delete('/api/users/' + id).set({ 'Authorization': `Bearer ${adminToken}` })	
    },

    getUsers(token) {
        return request.get('/api/users/').set({ 'Authorization': `Bearer ${token}` })	
    },

    getUserDetails(id, token) {
        return request.get(`/api/users/${id}`).set({ 'Authorization': `Bearer ${token}` })	
    },

    getRecords(id, token) {
        return request.get(`/api/users/${id}/meals`).set({ 'Authorization': `Bearer ${token}` })
    },

    getRecord(id, token, mealId) {
        return request.get(`/api/users/${id}/meals/${mealId}`).set({ 'Authorization': `Bearer ${token}` })
    },

    updateRecord(id, userToken, mealId, updatedMeal) {
        return request.put(`/api/users/${id}/meals/${mealId}`).set({ 'Authorization': `Bearer ${userToken}` }).send(updatedMeal)
    },

    addRecord(id, token, payload) {
        return request.post(`/api/users/${id}/meals`).set({ 'Authorization': `Bearer ${token}` }).send(payload)
    },

    deleteRecord(id, token, mealId) {
        return request.delete(`/api/users/${id}/meals/${mealId}`).set({ 'Authorization': `Bearer ${token}` })
    },

    updateRole(userId, userToken, role) {
        return request.patch(`/api/users/${userId}/role`).set({ 'Authorization': `Bearer ${userToken}` }).send({ role })
    },

    updateOtherUserPassword(id, token, payload) {
        return request.patch(`/api/users/${id}/password`).set({ 'Authorization': `Bearer ${token}` }).send(payload)
    },

    updateMyPassword(id, token, payload) {
        return request.patch(`/api/password`).set({ 'Authorization': `Bearer ${token}` }).send(payload)
    },


}