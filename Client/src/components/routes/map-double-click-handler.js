export const locatorUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer';

export function implement(view, Locator) {
    const self = this;
    const locatorTask = new Locator({ url: locatorUrl });
    view.on('double-click', function (event) {
        event.stopPropagation();
        const longitude = event.mapPoint.longitude;
        const latitude = event.mapPoint.latitude;
        let address = 'none';

        locatorTask.locationToAddress(event.mapPoint)
            .when(response => {
                address = response.address
                self.graphicsService.showAddingPopup(view, event.mapPoint, response.address)
            })
            // .otherwise(err => self.showPopup(view, event.mapPoint, address));


        view.popup.on('trigger-action', (e) => {
            if (e.action.id === 'show-add-modal') {
                self.savedPlaceService.saveLocation(longitude, latitude, address);
                self.router.navigate(['/places/add']);
            }
        });

    });


}