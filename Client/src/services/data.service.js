
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
        params.skip = skip.toString()
        return axios.get('users', { params })
    },

    // getMyReservations({ skip = 0 }) {
    //     const params = {}
    //     params.skip = skip.toString()
    //     return axios.get('reservations', { params })
    // },

    
    getMyPreviouslyUsedBikes({ skip = 0 }) {
        const params = {skip: skip.toString()}
        return axios.get('myPreviouslyUsedBikes', { params })
    },
    
    getMyPastReservations({ skip = 0 }) {
        const params = {skip: skip.toString()}
        return axios.get('myReservations/past', { params })
    },

    getMyUpcomingReservations({ skip = 0 }) {
        const params = {skip: skip.toString()}
        return axios.get('myReservations/upcoming', { params })
    },

    reserveBike(bikeId, startDate, endDate) {
        return axios.post('reservations', {bikeId, startDate, endDate})
    },

    cancelReservation(reservationId){
        return axios.delete(`reservations/${reservationId}`)
    },

    rateBike(bikeId, rate){
        return axios.post(`ratings/${bikeId}/${rate}`)
    },

    getBikesWithPagination({ skip, filter }) {
        const params = this._getBikeParams(filter)
        params.skip = skip.toString()
        return axios.get('bikesWithPagination', { params })
    },

    getBikesByLocation({longitude, latitude, filter }) {
        filter.longitude = longitude
        filter.latitude = latitude
        const params = this._getBikeParams(filter)
        return axios.get(`bikesByLocation`, {params})
    },

    _getBikeParams(filter) {
        const params = {}
        if (filter.model) {
            params['model'] = filter.model
        }
        if (filter.color) {
            params['color'] = filter.color
        }
        if (filter.maxWeight) {
            params['maxWeight'] = filter.maxWeight
        }
        if (filter.minWeight) {
            params['minWeight'] = filter.minWeight
        }
        if (filter.startDate) {
            params['startDate'] = filter.startDate
        }
        if (filter.endDate) {
            params['endDate'] = filter.endDate
        }
        if (filter.longitude) {
            params['longitude'] = filter.longitude
        }
        if (filter.latitude) {
            params['latitude'] = filter.latitude
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

    changeMyPasswordUsingRecoveryCode({ recoveryCode, email, newPassword }) {
        return axios.post('recovery_code', { recoveryCode, email, newPassword } )
    },

    changePasswordUsingOldPassword({ oldPassword, newPassword }) {
        return axios.patch('password', { oldPassword, newPassword })
    },

    changeOtherUserPassword(id, newPassword) {
        return axios.patch(`users/${id}/password`, { newPassword })
    },

}
