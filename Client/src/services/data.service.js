
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

    getBikesWithPagination({ skip, model, color, maxWeight, minWeight, startDate, endDate }) {
        const params = this._getBikeParams({model, color, maxWeight, minWeight, startDate, endDate})
        params.skip = skip.toString()
        return axios.get('bikesWithPagination', { params })
    },

    getBikesByLocation({longitude, latitude, model, color, maxWeight, minWeight, startDate, endDate }) {
        const params = this._getBikeParams({model, color, maxWeight, minWeight, startDate, endDate})
        return axios.get(`bikesByLocation`, {params})
    },

    _getBikeParams({model, color, maxWeight, minWeight, startDate, endDate, longitude, latitude}) {
        const params = {}
        if (model) {
            params['model'] = model
        }
        if (color) {
            params['color'] = color
        }
        if (maxWeight) {
            params['maxWeight'] = maxWeight
        }
        if (minWeight) {
            params['minWeight'] = minWeight
        }
        if (startDate) {
            params['startDate'] = startDate
        }
        if (endDate) {
            params['endDate'] = endDate
        }
        if (longitude) {
            params['longitude'] = longitude
        }
        if (latitude) {
            params['latitude'] = latitude
        }
        return params
    },


    getBike(id) {
        return axios.get('bikes/' + id)
    },

    getUser(userId) {
        return axios.get(`users/${userId}`)
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
