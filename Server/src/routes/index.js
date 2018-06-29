const router = require('express').Router()
const { verifyUser } = require('core/authentication')
const Authorize = require('core/authorization')
const ratings = require('./ratings')
const bike = require('./bike')
const user = require('./user')
const userAuth = require('./user-auth')
const reservations = require('./reservations')
const validateUser = require('./user.validate')
const validateUserAuth = require('./user-auth.validate')
const validateReservation = require('./reseravtions.validate')
const validateBike = require('./bike.validate')


router.post('/recovery_code_requests', userAuth.sendMeRecoveryCode, userAuth.sendMeRecoveryCode)
router.post('/recovery_code', userAuth.updatepsswordByRecoveryCode, userAuth.updatepsswordByRecoveryCode)



router.post('/users/', validateUserAuth.signup, userAuth.signup)

router.post('/users/login', validateUserAuth.login, userAuth.login)
router.patch('/password', verifyUser, validateUserAuth.login, userAuth.login)
router.patch('/users/:id/password', verifyUser, validateUserAuth.changeOtherUserPassword, Authorize.allowSelfAndManager, userAuth.changeOtherUserPassword)


router.put('/users/:id/info', verifyUser, validateUser.validateUpdateUser, Authorize.allowSelfAndManager, user.updateUserInfo)
router.delete('/users/:id', verifyUser, Authorize.preventRegularUsers, user.removeUser)
router.get('/users/', verifyUser, Authorize.preventRegularUsers, user.getUsers)
router.get('/users/:id', verifyUser, Authorize.allowSelfAndManager, user.getUser)
// router.patch('/users/:id/role', verifyUser, validateUpdateRole, Authorize.preventRegularUsers, updateUserRole)

// router.get('/bikes', verifyUser, Authorize.preventRegularUsers, bike.getBikes)
router.get('/bikesByLocation', bike.getByLocationAndFilterExcludingReservedBikes)
router.get('/bikesWithPagination', bike.getWithPaginationExcludingReservedBikes)

router.get('/bikes/:bikeId', verifyUser, Authorize.preventRegularUsers, bike.getBike)
// router.get('/bikes/:id', verifyUser, Authorize.allowSelfAndManager, getBike);
router.post('/bikes', verifyUser, validateBike.bikeFormSchema, Authorize.preventRegularUsers, bike.addBike)
router.delete('/bikes/:bikeId',  verifyUser, Authorize.preventRegularUsers,  bike.deleteBike)
router.put('/bikes/:bikeId', verifyUser, validateBike.bikeFormSchema, Authorize.preventRegularUsers, bike.updatebike)

router.get('/reservations', verifyUser, reservations.getReservations)
router.get('/reservationsForBike', verifyUser, reservations.getReservationsForBike)
// router.get('/reservationsForDate', verifyUser, reservations.getClashedReseravtionsForDateRange)
router.get('/reservations/:id', verifyUser, Authorize.allowSelfAndManager, reservations.getReservationsForUser)
router.post('/reservations/:id/:bikeId', verifyUser, validateReservation.validateReserveBike, Authorize.allowSelfAndManager, reservations.reserveBike)

// router.post('/reservations/:id/:bikeId', verifyUser, validateReservation.validateReserveBike, Authorize.allowSelfAndManager, reservations.checkNoPreviousReservation, reservations.reserveBike)
router.delete('/reservations/:id/:reservationId', verifyUser, Authorize.allowSelfAndManager, reservations.cancelReservation)

// router.get('/ratings', verifyUser, Authorize.allowSelfAndManager, ratings.getRatingsForSeveralBikes)
router.post('/ratings/:id/:bikeId/:rate', verifyUser, Authorize.allowSelfAndManager, ratings.rateBike)

// router.post('/reservations/:id/:bikeId', verifyUser, ReservationsValidation.validateReserveBike, Authorize.allowSelfAndManager, reservations.reserveBike)
// router.delete('/reservations/:id', verifyUser, Authorize.allowSelfAndManager, reservations.cancelReservation)
router.get('/s3/sign', bike.signImage);

module.exports = router





