import { esriStore } from './esriStore';
describe('esri store reducer', () => {
    describe('MODULES_LOADED', () => {
        it('should return correct state', () => {
            const payload = {
                Graphic: 'g',
                Locator: 'l',
                Track: 't',
                Search: 's'
            }
            const action = {
                type: 'MODULES_LOADED',
                payload
            }
            expect(esriStore({filter:{}}, action)).toEqual({
                filter: {},
                Graphic: 'g',
                Locator: 'l',
                Track: 't',
                Search: 's'
            })
        })
    })


    describe('SAVE_VIEW', () => {
        it('should return correct state', () => {
            const payload = 's'
            const action = {
                type: 'SAVE_VIEW',
                payload
            }
            expect(esriStore({filter:{}}, action)).toEqual({
                filter: {},
                view: 's'
            })
        })
    })

    describe('SAVE_FILTER', () => {
        it('should return correct state', () => {
            const payload = 's'
            const action = {
                type: 'SAVE_FILTER',
                payload
            }
            expect(esriStore({filter:{}}, action)).toEqual({
                filter: 's'
            })
        })
    })


   
})
