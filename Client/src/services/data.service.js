
import axios from 'axios';
import store from '../stores/configureStore';
let axiosInstance
initiate()
store.subscribe(() => {
    initiate()
})

function initiate() {
    axiosInstance = axios.create({
        baseURL: 'http://localhost:3001/api',
        headers: { 'Authorization': `Bearer ${store.getState().authStoreState.token}` }
    });
}
export const ApiService = {

    login(item) {
        return axiosInstance.post('users/login', item).then(x => x.data)
    },

    signUrl(file, id) {
        return axiosInstance.get(`s3/sign?objectName=${file.name}&contentType=${file.type}&bikeId=${id}`).then(x => x.data)
    },

    uploadImage(url, file) {
        return axios.put(url, file)
    },

    signup(item) {
        return axiosInstance.post('users', item)
    },

    signupSecurely(item) {
        return axiosInstance.post('users/secure', item)
    },

    activateFromBackEnd(code, email) {
        return axiosInstance.post('activation', { code, email })
    },

    editUser(id, data) {
        return axiosInstance.put(`users/${id}/info`, data)
    },

    editMyProfile(id, data) {
        return axiosInstance.put(`users/${id}/info`, data)
    },

    deleteUser(id) {
        return axiosInstance.delete(`users/${id}`).then(x => x.data)
    },

    getUsers({ skip = 0, searchTerm = '', roleFilter = '' }) {
        const params = {}
        // const params = new HttpParams().set('skip', skip.toString()).set('searchFilter', searchTerm).append('roleFilter', roleFilter);
        return axiosInstance.get('users', { params }).then(x => x.data)
    },

    getBikes({ skip = 0, }) {
        const params = {}
        // const params = new HttpParams().set('skip', skip.toString()).set('searchFilter', searchTerm).append('roleFilter', roleFilter);
        return axiosInstance.get('bikes', { params }).then(x => x.data)
    },
    getBike(id) {
        return axiosInstance.get('bikes/' + id).then(x => x.data)
    },

    getUser(userId) {
        return axiosInstance.get(`users/${userId}`).then(x => x.data)
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
        return axiosInstance.get(`users/${userId}/meals`, { params })
    },

    getMeal(userId, mealId) {
        return axiosInstance.get(`users/${userId}/meals/${mealId}`)
    },


    addBike(data) {
        return axiosInstance.post(`bikes`, data).then(x => x.data)
    },

    editBike(id, data) {
        return axiosInstance.put(`bikes/${id}`, data).then(x => x.data)
    },

    deleteBike(bikeId) {
        return axiosInstance.delete(`bikes/${bikeId}`).then(x => x.data)
    },

    forgottenPassword(email) {
        return axiosInstance.post('recovery_code_requests', { email })
    },

    changePasswordUsingOldPassword({ oldPassword, newPassword }) {
        return axiosInstance.patch('password', { oldPassword, newPassword })
    },

    changeOtherUserPassword(id, newPassword) {
        return axiosInstance.patch(`users/${id}/password`, { newPassword })
    },

}
