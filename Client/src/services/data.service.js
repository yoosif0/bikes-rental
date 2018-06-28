
import axios from 'axios';
import store from '../stores/configureStore';
const setAuthHeaders = () => axios.defaults.headers.common['Authorization'] = `Bearer ${store.getState().authStoreState.token}`


axios.defaults.baseURL = 'http://localhost:3001/api'
axios.interceptors.response.use(res => res.data, err => Promise.reject(err.response));
setAuthHeaders()

store.subscribe(() => {
    setAuthHeaders()
})


export const ApiService = {

    login(item) {
        return axios.post('users/login', item)
    },

    signUrl(file, id) {
        return axios.get(`s3/sign?objectName=${file.name}&contentType=${file.type}&bikeId=${id}`)
    },

    uploadImage(url, file) {
        return axios.put(url, file)
    },

    signup(item) {
        return axios.post('users', item)
    },

    signupSecurely(item) {
        return axios.post('users/secure', item)
    },

    activateFromBackEnd(code, email) {
        return axios.post('activation', { code, email })
    },

    editUser(id, data) {
        return axios.put(`users/${id}/info`, data)
    },

    editMyProfile(id, data) {
        return axios.put(`users/${id}/info`, data)
    },

    deleteUser(id) {
        return axios.delete(`users/${id}`)
    },

    getUsers({ skip = 0, searchTerm = '', roleFilter = '' }) {
        const params = {}
        // const params = new HttpParams().set('skip', skip.toString()).set('searchFilter', searchTerm).append('roleFilter', roleFilter);
        return axios.get('users', { params })
    },

    getBikes({ skip = 0, }) {
        const params = {}
        // const params = new HttpParams().set('skip', skip.toString()).set('searchFilter', searchTerm).append('roleFilter', roleFilter);
        return axios.get('bikes', { params })
    },
    getBike(id) {
        return axios.get('bikes/' + id)
    },

    getUser(userId) {
        return axios.get(`users/${userId}`)
    },

    getMeals(userId, { skip = 0, startDate = '', endDate = '', startTime = '', endTime = '' }) {
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
        return axios.get(`users/${userId}/meals`, { params })
    },

    getMeal(userId, mealId) {
        return axios.get(`users/${userId}/meals/${mealId}`)
    },


    addBike(data) {
        return axios.post(`bikes`, data)
    },

    editBike(id, data) {
        return axios.put(`bikes/${id}`, data)
    },

    deleteBike(bikeId) {
        return axios.delete(`bikes/${bikeId}`)
    },

    forgottenPassword(email) {
        return axios.post('recovery_code_requests', { email })
    },

    changePasswordUsingOldPassword({ oldPassword, newPassword }) {
        return axios.patch('password', { oldPassword, newPassword })
    },

    changeOtherUserPassword(id, newPassword) {
        return axios.patch(`users/${id}/password`, { newPassword })
    },

}
