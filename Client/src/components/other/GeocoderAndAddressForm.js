/* global google */
import { EnhancedAddressForm } from '../forms/AddressForm/EnhancedAddressForm';
import React from 'react'


export class GeoCoderAndAddressForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isGeocodingError: false, foundAddress: '' };
    }
    geocodeAddress = (address) => {
        this.geocoder.geocode({ 'address': address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                this.setState({
                    foundAddress: results[0].formatted_address,
                    isGeocodingError: false
                });
                this.map.setCenter(results[0].geometry.location);
                this.marker.setPosition(results[0].geometry.location);
                this.props.addressUpdated({ latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng(), addressName: address })
                return;
            } else {
                this.setState({
                    foundAddress: null,
                    isGeocodingError: true
                });
                this.map.setCenter({
                    lat: this.props.latitude,
                    lng: this.props.longitude
                });
                this.marker.setPosition({
                    lat: this.props.latitude,
                    lng: this.props.longitude
                });
            }
        });
    }


    onAddressUpdated = (values) => {
        this.geocodeAddress(values.address);
    }

    componentDidMount() {
        this.map = new google.maps.Map(this.mapElement, {
            zoom: 8,
            center: {
                lat: this.props.initialAddress ? this.props.initialAddress.latitude: undefined,
                lng: this.props.initialAddress ? this.props.initialAddress.longitude: undefined
            }
        });
        this.marker = new google.maps.Marker({
            map: this.map,
            position: {
                lat: this.props.initialAddress ?this.props.initialAddress.latitude: undefined,
                lng: this.props.initialAddress ? this.props.initialAddress.longitude: undefined
            }
        });
        this.geocoder = new google.maps.Geocoder();
    }
    setMapElementReference = (mapElementReference) => this.mapElement = mapElementReference;

    render() {
        return (
            <React.Fragment>
                <EnhancedAddressForm addressUpdated={this.onAddressUpdated} />
                <p style={{ padding: '15px', marginBottom: '20px' }} className={this.state.isGeocodingError ? 'bg-danger mt-4' : 'bg-info mt-4'}> {this.state.foundAddress || 
                
                (this.props.initialAddress && this.props.initialAddress.addressName) || 'No address'}</p>
                <div className="map mb-4" style={{ height: '300px' }} ref={this.setMapElementReference}></div>
            </React.Fragment>
        );
    }
}
