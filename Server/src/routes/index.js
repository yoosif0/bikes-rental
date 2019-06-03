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
const recaptchaConfig = require('../config/recaptcha.config')
const Recaptcha = require('express-recaptcha').Recaptcha;
const recaptcha = process.env.NODE_ENV === 'testing' ? new Recaptcha(recaptchaConfig.testingSiteKey, recaptchaConfig.testingSecretKey)
    : new Recaptcha(recaptchaConfig.siteKey, recaptchaConfig.secretKey)


router.post('/recovery_code_requests', userAuth.sendMeRecoveryCode, userAuth.sendMeRecoveryCode)
router.post('/recovery_code', userAuth.updatepsswordByRecoveryCode, userAuth.updatepsswordByRecoveryCode)



router.post('/users/', recaptcha.middleware.verify, validateUserAuth.signup, userAuth.signup)

router.post('/users/login', validateUserAuth.login, userAuth.login)
router.patch('/password', verifyUser, validateUserAuth.changeMyPassword, userAuth.changeMyPassword)
router.patch('/users/:id/password', verifyUser, validateUserAuth.changeOtherUserPassword, Authorize.allowSelfAndManager, userAuth.changeOtherUserPassword)


router.put('/users/:id/info', verifyUser, validateUser.validateUpdateUser, Authorize.allowSelfAndManager, user.updateUserInfo)
router.delete('/users/:id', verifyUser, Authorize.preventRegularUsers, user.removeUser)
router.get('/users/', verifyUser, Authorize.preventRegularUsers, user.getUsers)
router.get('/users/:id', verifyUser, Authorize.allowSelfAndManager, user.getUser)
// router.patch('/users/:id/role', verifyUser, validateUpdateRole, Authorize.preventRegularUsers, updateUserRole)

// router.get('/bikes', verifyUser, Authorize.preventRegularUsers, bike.getBikes)
router.get('/bikesByLocation', verifyUser, Authorize.showOnlyAvailableBikesForRegularUsers, bike.getByLocationAndFilterExcludingReservedBikes)
router.get('/bikesWithPagination', verifyUser, Authorize.showOnlyAvailableBikesForRegularUsers, bike.getWithPaginationExcludingReservedBikes)

router.get('/bikes/:bikeId', verifyUser, Authorize.preventRegularUsers, bike.getBike)
// router.get('/bikes/:id', verifyUser, Authorize.allowSelfAndManager, getBike);
router.post('/bikes', verifyUser, validateBike.bikeFormSchema, Authorize.preventRegularUsers, bike.addBike)
router.delete('/bikes/:bikeId', verifyUser, Authorize.preventRegularUsers, bike.deleteBike)
router.put('/bikes/:bikeId', verifyUser, validateBike.bikeFormSchema, Authorize.preventRegularUsers, bike.updatebike)

// router.get('/myReservations', verifyUser, reservations.getMyReservations)
router.get('/reservations/past/:id', verifyUser, Authorize.allowSelfAndManager, reservations.getPastReservationsForUser)
router.get('/reservations/upcoming/:id', verifyUser, Authorize.allowSelfAndManager, reservations.getUpcomingReservationsForUser)

router.get('/bikeReservations/:bikeId', verifyUser, Authorize.preventRegularUsers, reservations.getBikeReservations)


router.get('/myPreviouslyUsedBikes', verifyUser, reservations.getMyPreviouslyUsedBikes)



router.get('/reservationsForBike', verifyUser, reservations.getReservationsForBike)
// router.get('/reservationsForDate', verifyUser, reservations.getClashedReseravtionsForDateRange)
// router.get('/reservations/:id', verifyUser, Authorize.allowSelfAndManager, reservations.getReservationsForUser)

router.post('/reservations', verifyUser, validateReservation.validateReserveBike, reservations.reserveBike)

// router.post('/reservations/:id/:bikeId', verifyUser, validateReservation.validateReserveBike, Authorize.allowSelfAndManager, reservations.checkNoPreviousReservation, reservations.reserveBike)
router.delete('/reservations/:reservationId', verifyUser, reservations.cancelReservation)

// router.get('/ratings', verifyUser, Authorize.allowSelfAndManager, ratings.getRatingsForSeveralBikes)
router.post('/ratings/:bikeId/:rate', verifyUser, ratings.rateBike)

// router.post('/reservations/:id/:bikeId', verifyUser, ReservationsValidation.validateReserveBike, Authorize.allowSelfAndManager, reservations.reserveBike)
// router.delete('/reservations/:id', verifyUser, Authorize.allowSelfAndManager, reservations.cancelReservation)
router.get('/s3/sign', verifyUser, Authorize.preventRegularUsers, bike.signImage);
router.put('/bikeImageRef', verifyUser, Authorize.preventRegularUsers, bike.updateBikeImage)

module.exports = router





