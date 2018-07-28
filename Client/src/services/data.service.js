
import axios from 'axios';
import store from '../stores/configureStore';

const getAuthHeaders = () => ({Authorization: `Bearer ${store.getState().authStoreState.token}`})

const hostname = window && window.location && window.location.hostname;
axios.defaults.baseURL = hostname === 'localhost' ? 'http://localhost:3001/api' : '/api'
axios.interceptors.response.use(res => res.data, err => {
    if (err.response.status === 401 && err.response.data && (err.response.data.code === 3 || err.response.data.code === 4)) {
        store.dispatch({type: "LOGGED_OUT"})
    }
    return Promise.reject(err.response)
});

export const ApiService = {

    login(item) {
        return axios.post('users/login', item)
    },

    signUrl(name) {
        return axios.get(`s3/sign?imageName=${name}`, { headers: getAuthHeaders()})
    },

    uploadImage(url, file) {
        var instance = axios.create();
        instance.defaults.headers.common = {};
        // delete axios.defaults.headers.common["Authorization"];
        return instance.put(url, file)
    },

    saveImageReferenceToOurBackend(bikeId, imageName){
        return axios.put(`/bikeImageRef?bikeId=${bikeId}&imageName=${imageName}`, {}, { headers: getAuthHeaders()})
    },

    signup(item) {
        return axios.post('users', item, { headers: getAuthHeaders()})
    },

    editUser(id, data) {
        return axios.put(`users/${id}/info`, data, {headers: getAuthHeaders() })
    },

    editMyProfile(id, data) {
        return axios.put(`users/${id}/info`, data, { headers: getAuthHeaders()})
    },

    deleteUser(id) {
        return axios.delete(`users/${id}`, { headers: getAuthHeaders()})
    },

    getUsers({ skip = 0, searchTerm = '', roleFilter = '' }) {
        const params = {}
        params.skip = skip.toString()
        return axios.get('users', { params, headers: getAuthHeaders()  })
    },
    
    getMyPreviouslyUsedBikes({ skip = 0 }) {
        const params = {skip: skip.toString()}
        return axios.get('myPreviouslyUsedBikes', { params , headers: getAuthHeaders()})
    },

    getBikeReservations(bikeId, {skip}) {
        const params = {skip: skip.toString()}
        return axios.get(`bikeReservations/${bikeId}`, { params, headers: getAuthHeaders() })
    },

    getPastReservations(userId, { skip = 0 }) {
        const params = {skip: skip.toString()}
        return axios.get(`reservations/past/${userId}`, { params,  headers: getAuthHeaders() })
    },

    getUpcomingReservations(userId, { skip = 0 }) {
        const params = {skip: skip.toString()}
        return axios.get(`reservations/upcoming/${userId}`, { params,  headers: getAuthHeaders() })
    },

    reserveBike(bikeId, startDate, endDate) {
        return axios.post('reservations', {bikeId, startDate, endDate}, { headers: getAuthHeaders()})
    },

    cancelReservation(reservationId){
        return axios.delete(`reservations/${reservationId}`, { headers: getAuthHeaders()})
    },

    rateBike(bikeId, rate){
        return axios.post(`ratings/${bikeId}/${rate}`, {}, { headers: getAuthHeaders()})
    },


    getBikesWithPagination({ skip, filter }) {
        const params = this._getBikeParams(filter)
        params.skip = skip.toString()
        return axios.get('bikesWithPagination', { params, headers: getAuthHeaders() })
    },

    getBikesByLocation({longitude, latitude, filter }) {
        filter.longitude = longitude
        filter.latitude = latitude
        const params = this._getBikeParams(filter)
        return axios.get(`bikesByLocation`, {params,  headers: getAuthHeaders()})
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
        if (filter.avgRate) {
            params['avgRate'] = filter.avgRate
        }
        return params
    },


    getBike(id) {
        return axios.get('bikes/' + id, { headers: getAuthHeaders()})
    },

    getUser(userId) {
        return axios.get(`users/${userId}`, { headers: getAuthHeaders()})
    },

    addBike(data) {
        return axios.post(`bikes`, data, { headers: getAuthHeaders()})
    },

    editBike(id, data) {
        return axios.put(`bikes/${id}`, data, { headers: getAuthHeaders()})
    },

    deleteBike(bikeId) {
        return axios.delete(`bikes/${bikeId}`, { headers: getAuthHeaders()})
    },

    forgottenPassword(email) {
        return axios.post('recovery_code_requests', { email })
    },

    changeMyPasswordUsingRecoveryCode({ recoveryCode, email, newPassword }) {
        return axios.post('recovery_code', { recoveryCode, email, newPassword } )
    },

    changePasswordUsingOldPassword({ oldPassword, newPassword }) {
        return axios.patch('password', { oldPassword, newPassword }, { headers: getAuthHeaders()})
    },

    changeOtherUserPassword(id, newPassword) {
        return axios.patch(`users/${id}/password`, { newPassword }, { headers: getAuthHeaders()})
    },

}
