import React from 'react'
import PropTypes from 'prop-types';
import { EnhancedBikeForm } from '../forms/BikeForm/EnhancedAddForm';

export default class AddBike extends React.Component {
    render() {
        return (
            <EnhancedBikeForm/>
        )
    }
}

AddBike.propTypes = {
    disabled: PropTypes.any,
}

