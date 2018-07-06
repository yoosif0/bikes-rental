import React from 'react'
// import { EnhancedBikeForm } from '../forms/BikeForm/EnhancedAddForm';
import Title from '../text/Title';
import { GeoCoderAndAddressForm } from '../other/GeocoderAndAddressForm';
import { Formik } from 'formik';
import { InnerForm } from '../forms/BikeForm/InnerForm';
import bikeFormSchema from '../forms/BikeForm/validationSchema';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import { SubmitButton } from '../buttons/SubmitButton';

export default class AddBike extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    addressUpdated = ({ latitude, longitude, addressName }) => this.setState({ latitude, longitude, addressName })

    onSubmit = (values, { setSubmitting, props, setErros }) => {
        ApiService.addBike({ ...values, ...this.state }).then((payload) => {
            setSubmitting(false);
            toast.success('Added successfully')
        }).catch(err => {
            toast.error(err.data && err.data.msg ? err.data.msg : 'Error')
            setSubmitting(false)
        })
    }

    innerForm = props => (
        <InnerForm {...props}>
            {hasBasicErrors => <SubmitButton disabled={!this.state.addressName || !props.dirty || hasBasicErrors()} ></SubmitButton>}
        </InnerForm>
    )


    render() {
        return (
            <div>
                <Title> Add new bike </Title>
                <GeoCoderAndAddressForm addressUpdated={this.addressUpdated} />
                {this.state &&
                    <Formik
                        validationSchema={bikeFormSchema}
                        initialValues={{ model: '', weight: '', color: '', isAvailable: true }}
                        onSubmit={this.onSubmit}
                        render={this.innerForm}
                    />

                }
            </div>
        )
    }
}
