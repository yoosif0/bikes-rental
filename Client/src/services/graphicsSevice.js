import store from '../stores/configureStore';

const popupTemplate = {
    actions: [],
    title: '{model}',
    content: [{
        type: 'fields',
        fieldInfos: [{
            fieldName: 'Model'
        }, {
            fieldName: 'Weight'
        }, {
            fieldName: 'Color'
        }, {
            fieldName: 'Average Rate'
        }, {
            fieldName: 'Available'
        }]
    }]
}
const colorRgbMapper = {
    white: [255, 255, 255],
    black: [0, 0, 0],
    blue: [0, 0, 255],
    yellow: [255, 255, 4],
    green: [23, 169, 37],
    red: [255, 0, 0, 0.92],
}
export const graphicsService = {
    setGraphicsFromData(data) {
        const esriStore = store.getState().esriStore
        const newGraphics = data.map((bike, index) => {
            const attributes= {
                'Model': bike.model,
                'Color': bike.color,
                'Weight': bike.weight + ' kg',
                'Average Rate': bike.avgRate || 'Not rated',
                'Available': bike.isAvailable ? 'Yes' : 'No'
            }
            if (store.getState().authStoreState.role==='regular'){
                popupTemplate.content[0].fieldInfos = popupTemplate.content[0].fieldInfos.filter(x=>x.fieldName!== 'Available')
                delete attributes['Available']
            } 
            return new esriStore.Graphic({
                geometry: {
                    type: 'point',
                    longitude: bike.location.coordinates[0],
                    latitude: bike.location.coordinates[1]
                },
                symbol: {
                    type: 'simple-marker',
                    color: colorRgbMapper[bike.color],
                    outline: { color: [255, 255, 255], width: 2 }
                },
                attributes,
                popupTemplate
            });
        })
        // console.log(newGraphics)
        esriStore.view.graphics.removeAll()
        esriStore.view.graphics.addMany(newGraphics)
        esriStore.view.when(x=>{
        })
    },


    showAddingPopup(view, mapPoint, address) {
        // Get the coordinates of the click on the view
        const lat = Math.round(mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(mapPoint.longitude * 1000) / 1000;
        view.popup.actions = [{
            title: 'Confirm Location',
            id: 'show-add-modal',
            className: 'text-danger'
        }]
        view.popup.open({
            // Set the popup's title to the coordinates of the location
            title: address ? address : 'No address was found for this location',
            location: mapPoint // Set the location of the popup to the clicked location
        });
        view.popup.content = '[' + lon + ', ' + lat + ']'
    }



}

