const { allowAdminAndManager, allowAdminOnly, allowSelfAdminAndManager, allowSelfAndAdminOnly, preventRegularUsers } = require('src/core/authorization')
const { admin, manager, regular } = require('src/config/rolesConstants')

describe('authorization', function () {

    class MockRequest {
        constructor(paramsId, decodedId, role) {
            this.params = { id: paramsId }
            this.decoded = { _id: decodedId, role: role }
        }
    }

    class MockResponse {
        status(num) {
            toBeSpied.notAuthorized()
            return this
        }
        json(str) {

        }
    }

    const toBeSpied = {
        notAuthorized() {
            return null
        },
        authorized() {
            return null
        }
    }

    const next = () => toBeSpied.authorized()

    describe('allow self, admin, and manager', () => {
        it('should authorize admin successfully ', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '12sd3', admin)
            allowSelfAdminAndManager(req, res, next)
            expect(spy).toHaveBeenCalled()
        })

        it('should not authorize manager to crud another manager', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            allowSelfAdminAndManager(req, res, next)
            expect(spy).not.toHaveBeenCalled()
        })

        it('should authorize manager to crud his or herself', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', manager)
            allowSelfAdminAndManager(req, res, next)
            expect(spy).toHaveBeenCalled()
        })

    })


    describe('allowed admin only', () => {
        it('should authorize admin successfully ', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', admin)
            allowAdminOnly(req, res, next)
            expect(spy).toHaveBeenCalled()
        })

        it('should not authorize manager ', function () {
            const spy = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            allowAdminOnly(req, res, next)
            expect(spy).toHaveBeenCalled()
        })


        it('should not authorize self ', function () {
            const spy = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', regular)
            allowAdminOnly(req, res, next)
            expect(spy).toHaveBeenCalled()
        })

        it('should not authorize other user ', function () {
            const spy = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', regular)
            allowAdminOnly(req, res, next)
            expect(spy).toHaveBeenCalled()
        })
    })



    describe('allowed admin and self only', () => {
        it('should authorize admin successfully ', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            allowSelfAndAdminOnly(req, res, next)
            expect(spy).toHaveBeenCalled()
        })

        it('should not authorize manager ', function () {
            const spy = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            allowSelfAndAdminOnly(req, res, next)
            expect(spy).toHaveBeenCalled()
        })


        it('should authorize self ', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '123', regular)
            allowSelfAndAdminOnly(req, res, next)
            expect(spy).toHaveBeenCalled()
        })

        it('should not authorize other user ', function () {
            const spy = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '13', regular)
            allowSelfAndAdminOnly(req, res, next)
            expect(spy).toHaveBeenCalled()
        })
    })


    describe('allowed manager and admin', () => {
        it('should authorize admin successfully ', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            allowAdminAndManager(req, res, next)
            expect(spy).toHaveBeenCalled()
        })
    })










    describe('allowed manager and admin', () => {
        it('should authorize admin successfully ', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            allowAdminAndManager(req, res, next)
            expect(spy).toHaveBeenCalled()
        })
    })





    describe('prevent regular users', () => {
        it('should authorize admin successfully ', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', admin)
            preventRegularUsers(req, res, next)
            expect(spy).toHaveBeenCalled()
        })

        it('should authorize manager successfully ', function () {
            const spy = spyOn(toBeSpied, 'authorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', manager)
            preventRegularUsers(req, res, next)
            expect(spy).toHaveBeenCalled()
        })

        it('should not authorize regular users ', function () {
            const spy = spyOn(toBeSpied, 'notAuthorized')
            const res = new MockResponse()
            const req = new MockRequest('123', '1253', regular)
            preventRegularUsers(req, res, next)
            expect(spy).toHaveBeenCalled()
        })


    })



})

