import React from 'react'
import { Formik } from 'formik';
import { InnerForm } from '../forms/BikeForm/InnerForm';
import bikeFormSchema from '../forms/BikeForm/validationSchema';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone'
import { s3Url } from '../../config/constants';
import { PageContentLayout } from '../layout/PageContentLayout';
import { GeoCoderAndAddressForm } from '../other/GeocoderAndAddressForm';
import Title from '../text/Title';
import { SubmitButton } from '../buttons/SubmitButton';


export default class EditBike extends React.Component {
	constructor(props) {
		super(props);
		this.state = { bike: {}, hasAddrressUpdatedWhileEditing:false };
	}
	componentDidMount() {
		this.fetchBike()
	}

	addressUpdated = ({ latitude, longitude, addressName }) => {
		this.setState((state)=>{
			return {
				bike: {...state.bike, addressName, location: {...state.bike.location, coordinates: [longitude, latitude]} },
				hasAddrressUpdatedWhileEditing: true
			}		
		})
	}

	fetchBike() {
		return ApiService.getBike(this.props.match.params.id).then(x => {
			this.setState({ bike: x })
		}).catch(err => {
			toast.error(err.data ? err.data.msg : 'Error')
		})
	}

	onDrop = (files) => {
		const imageName = this.state.bike._id + files[0].name
		return ApiService.signUrl(imageName)
			.then((url) => ApiService.uploadImage(url, files[0]))
			.then(() => ApiService.saveImageReferenceToOurBackend(this.state.bike._id, imageName))
			.then(() => this.fetchBike())
			.catch(err => {
				toast.error(err.data ? err.data.msg : 'Error')
			});
	};

	onSubmit = (values, { setSubmitting, setErros }) => {
		return ApiService.editBike(this.state.bike._id,
			{
				...values,
				longitude: this.state.bike.location.coordinates[0],
				latitude: this.state.bike.location.coordinates[1],
				addressName: this.state.bike.addressName

			})
			.then((payload) => {
				setSubmitting(false);
				toast.success('Updated successfully')
				this.props.history.push('../bikes')
			}).catch(err => {
				toast.error(err.data && err.data.msg ? err.data.msg : 'Error')
				setSubmitting(false)
			})
	}

	innerForm = props => (
		<InnerForm {...props}>
			{hasBasicErrors => <SubmitButton disabled={(!props.dirty && !this.state.hasAddrressUpdatedWhileEditing) || hasBasicErrors()} ></SubmitButton>}
		</InnerForm>
	)

	render() {
		return (
			<PageContentLayout isRendering={this.state.bike.model} unAvailabilityText="Waiting">
				<Title> Edit Bike </Title>
				<div className="mb-4">
					<div className="row">
						<div className="col-md-6 mb-4">
							{this.state.bike.imageName && <img style={{ maxHeight: "250px" }} alt="bike" src={s3Url + this.state.bike.imageName}></img>}
						</div>
						<Dropzone onDrop={this.onDrop}>
							{this.state.bike.imageName ? 'Change' : 'Add'} image by clicking here or just drop it here
								</Dropzone>

					</div>
					{this.state.bike && this.state.bike.location &&

						<GeoCoderAndAddressForm
							initialAddress={{
								addressName: this.state.bike.addressName,
								longitude: this.state.bike.location.coordinates[0],
								latitude: this.state.bike.location.coordinates[1]
							}}

							addressUpdated={this.addressUpdated} />
					}
					{
						this.state.bike.model &&
						<Formik
							validationSchema={bikeFormSchema}
							initialValues={{ model: this.state.bike.model, weight: this.state.bike.weight, color: this.state.bike.color, isAvailable: this.state.bike.isAvailable }}
							onSubmit={this.onSubmit}
							render={this.innerForm}
						/>
					}
				</div>
			</PageContentLayout>
		)
	}
}