const router = require('express').Router()
const bikeValidations = require('./bike.validate')
const getUser = require('./user/get-user.route')
const updateUserInfo = require('./user/update-user-info.route')
const removeUser = require('./user/remove-user.route')
const validateUpdateRole = require('./user/update-role.validate')
const validateUpdateInfo = require('./user/update-user-info.validate')
const updateUserRole = require('./user/update-role.route')
const getUsers = require('./user/get-users.route')
const signup = require('./security/signup.route')
const login = require('./security/login.route')
const updateMyPassword = require('./security/update-my-password.route')
const validateLogin = require('./security/login.validate')
const validateSignup = require('./security/signup.validate')
const validateUpdateMyPassword = require('./security/update-my-password.validate')
const changeOtherUserPassword = require('./security/change-other-user-password.route')
const validatechangeOtherUserPassword = require('./security/change-other-user-password.validate')
const getBikes = require('./record/get-bikes.route')
// const getBike = require('./record/get-user-record.route')
const ratings = require('./ratings')
const { verifyUser } = require('core/authentication')
const Authorize = require('core/authorization')
const bike = require('./bike')
const ReservationsValidation = require('./reseravtions.validate')
const reservations = require('./reservations')

router.post('/users/', validateSignup, signup)

router.post('/users/login', validateLogin, login)
router.patch('/password', verifyUser, validateUpdateMyPassword, updateMyPassword)
router.patch('/users/:id/password', verifyUser, validatechangeOtherUserPassword, Authorize.allowSelfAndManager, changeOtherUserPassword)


router.put('/users/:id/info', verifyUser, validateUpdateInfo, Authorize.allowSelfAndManager, updateUserInfo)
router.delete('/users/:id', verifyUser, Authorize.preventRegularUsers, removeUser)
router.get('/users/', verifyUser, Authorize.preventRegularUsers, getUsers)
router.get('/users/:id', verifyUser, Authorize.allowSelfAndManager, getUser)
router.patch('/users/:id/role', verifyUser, validateUpdateRole, Authorize.preventRegularUsers, updateUserRole)

router.get('/bikes', verifyUser, getBikes)
router.get('/bikes/:bikeId', verifyUser, bike.getBike)
// router.get('/bikes/:id', verifyUser, Authorize.allowSelfAndManager, getBike);
router.post('/bikes', verifyUser, bikeValidations.bikeFormSchema, Authorize.preventRegularUsers, bike.addBike)
router.delete('/bikes/:bikeId',  verifyUser, Authorize.preventRegularUsers,  bike.deleteBike)
router.put('/bikes/:bikeId', verifyUser, bikeValidations.bikeFormSchema, Authorize.preventRegularUsers, bike.updatebike)

router.get('/reservations', verifyUser, reservations.getReservations)
router.get('/reservations/:id', verifyUser, Authorize.allowSelfAndManager, reservations.getReservationsForUser)
router.post('/reservations/:id/:bikeId', verifyUser, ReservationsValidation.validateReserveBike, Authorize.allowSelfAndManager, reservations.checkNoPreviousReservation, reservations.reserveBike)
router.delete('/reservations/:id/:reservationId', verifyUser, Authorize.allowSelfAndManager, reservations.cancelReservation)

// router.get('/ratings', verifyUser, Authorize.allowSelfAndManager, ratings.getRatingsForSeveralBikes)
router.post('/ratings/:id/:bikeId/:rate', verifyUser, Authorize.allowSelfAndManager, ratings.rateBike)

router.get('/t', bike.getBikesExcludingSome)
// router.get('/upload', bike.uploadImage)

// router.post('/reservations/:id/:bikeId', verifyUser, ReservationsValidation.validateReserveBike, Authorize.allowSelfAndManager, reservations.reserveBike)
// router.delete('/reservations/:id', verifyUser, Authorize.allowSelfAndManager, reservations.cancelReservation)
router.get('/s3/sign', bike.signImage);

module.exports = router





