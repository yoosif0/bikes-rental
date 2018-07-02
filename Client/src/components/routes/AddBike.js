import React from 'react'
import { EnhancedBikeForm } from '../forms/BikeForm/EnhancedAddForm';
import Title from '../text/Title';


export default class AddBike extends React.Component {
    render() {
        return (
            <div>
            <Title> Add new bike </Title>
            <EnhancedBikeForm/>
            </div>
        )
    }
}
