
import axios from 'axios';


export const ApiService = {
    axiosInstance: {},
    init() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3001/api',
            /* other custom settings */
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('id_token')}`;
    },

    login(item) {
        return this.axiosInstance.post('users/login', item).then(x=>x.data)
    },

    signup(item) {
        return this.axiosInstance.post('users', item)
    },

    signupSecurely(item) {
        return this.axiosInstance.post('users/secure', item)
    },

    activateFromBackEnd(code, email) {
        return this.axiosInstance.post('activation', { code, email })
    },

    updateUserInfo(id, data) {
        return this.axiosInstance.put(`users/${id}/info`, data)
    },

    deleteUser(id) {
        return this.axiosInstance.delete(`users/${id}`).then(x=>x.data)
    },

    getUsers({ skip = 0, searchTerm = '', roleFilter = '' }) {
        const params = {}
        // const params = new HttpParams().set('skip', skip.toString()).set('searchFilter', searchTerm).append('roleFilter', roleFilter);
        return this.axiosInstance.get('users', { params }).then(x=>x.data)
    },

    getBikes({ skip = 0, }) {
        const params = {}
        // const params = new HttpParams().set('skip', skip.toString()).set('searchFilter', searchTerm).append('roleFilter', roleFilter);
        return this.axiosInstance.get('bikes', { params }).then(x=>x.data)
    },

    getUserDetails(userId) {
        return this.axiosInstance.get(`users/${userId}`)
    },

    staticgetMeals(userId, { skip = 0, startDate = '', endDate = '', startTime = '', endTime = '' }) {
        let params = new {}
            .set('skip', skip.toString())
        if (startDate) {
            params = params.append('startDate', startDate)
        }
        if (endDate) {
            params = params.append('endDate', endDate)
        }
        if (startTime) {
            params = params.append('startTime', startTime)
        }
        if (endTime) {
            params = params.append('endTime', endTime)
        }
        return this.axiosInstance.get(`users/${userId}/meals`, { params })
    },

    getMeal(userId, mealId) {
        return this.axiosInstance.get(`users/${userId}/meals/${mealId}`)
    },

    updateMeal(userId, mealId, data) {
        return this.axiosInstance.put(`users/${userId}/meals/${mealId}`, data)
    },

    addMeal(userId, data) {
        return this.axiosInstance.post(`users/${userId}/meals`, data).then(x=>x.data)
    },

    deleteBike(bikeId) {
        return this.axiosInstance.delete(`bikes/${bikeId}`).then(x=>x.data)
    },

    assignRole(id, data) {
        return this.axiosInstance.patch(`users/${id}/role`, data)
    },

    forgottenPassword(email) {
        return this.axiosInstance.post('recovery_code_requests', { email })
    },

    changePasswordUsingOldPassword({ oldPassword, newPassword }) {
        return this.axiosInstance.patch('password', { oldPassword, newPassword })
    },

    changeOtherUserPassword(id, newPassword) {
        return this.axiosInstance.patch(`users/${id}/password`, { newPassword })
    },

    changeMyPasswordUsingRecoveryCode({ recoveryCode, email, newPassword }) {
        return this.axiosInstance.post('recovery_code', { recoveryCode, email, newPassword })
    },

    activateUserAdministratively(id) {
        return this.axiosInstance.patch(`users/${id}/activation`, {})
    },

    inviteUser(email, url) {
        return this.axiosInstance.post(`users/invite`, { email, url })
    },

    oAuthFacebook(access_token) {
        return this.axiosInstance.post(`oauth/facebook`, { access_token })
    },

    oAuthGoogle(access_token) {
        return this.axiosInstance.post(`oauth/google`, { access_token })
    },

    connectFacebook(access_token) {
        return this.axiosInstance.post(`connections/facebook`, { access_token })
    },

    connectGoogle(access_token) {
        return this.axiosInstance.post(`connections/google`, { access_token })
    },

    connectLocalLogin(payload) {
        return this.axiosInstance.post(`connections/local`, payload)
    },

    connectLocalLoginSecurely(payload) {
        return this.axiosInstance.post(`connections/local/secure`, payload)
    },

    disconnectFacebook() {
        return this.axiosInstance.delete(`connections/facebook`)
    },

    disconnectGoogle() {
        return this.axiosInstance.delete(`connections/google`)
    },

    disconnectLocalLogin() {
        return this.axiosInstance.delete(`connections/local`)
    },

    getTodaysIntake(userId) {
        return this.axiosInstance.get(`users/${userId}/meals/calories_today`)
    },
}
