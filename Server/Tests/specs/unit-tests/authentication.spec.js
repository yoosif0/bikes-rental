const { getToken, verifyUser } = require('src/core/authentication')
const env = Object.assign({}, process.env);


class MockRequest {
    constructor(token) {
        this.decoded = {}
        this.headers = {
            authorization: `Bearer ${token}`
        }
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


describe('authentication', () => {
    beforeAll(()=>{
        process.env.secret = 'correct'
    })
    afterAll(() => {
        process.env = env;
    });

    it('should authenticate token successfully ', function () {
        const token = getToken('123', 'role')
        const req = new MockRequest(token)
        const res = new MockResponse()
        const spyAuthorized = spyOn(toBeSpied, 'authorized')
        verifyUser(req, res, next)
        expect(spyAuthorized).toHaveBeenCalled()
    })


    it('should not authenticate token if secret is wrong ', function () {
        const req = new MockRequest('wrong')
        const res = new MockResponse()
        const spyNotAuthorized = spyOn(toBeSpied, 'notAuthorized')
        verifyUser(req, res, next)
        expect(spyNotAuthorized).toHaveBeenCalled()
    })


})

