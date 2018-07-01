import { publicInfoStore } from './publicInfoStore';
describe('public info store reducer', () => {
    describe('SAVE_PUBLIC_EMAIL', () => {
        it('should return correct state', () => {
            const payload = 's'
            const action = {
                type: 'SAVE_PUBLIC_EMAIL',
                payload
            }
            expect(publicInfoStore({}, action)).toEqual({
                email: 's'
            })
        })
    })
  
})
