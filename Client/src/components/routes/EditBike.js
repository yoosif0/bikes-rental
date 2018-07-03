import React from 'react'
import PropTypes from 'prop-types';
import { EnhancedBikeForm } from '../forms/BikeForm/EnhancedEditForm';
import { ApiService } from '../../services/data.service';
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify';
import { s3Url } from '../../config/constants';
import { PageContentLayout } from '../layout/PageContentLayout';

export default class EditBike extends React.Component {
	constructor(props) {
		super(props);
		this.state = { bike: {} };
	}
	componentDidMount() {
		this.fetchBike()
	}

	fetchBike() {
		return ApiService.getBike(this.props.match.params.id).then(x => {
			this.setState({ bike: x })
		}).catch(err => {
			toast.error(err.data?err.data.msg:'Error')
		})
	}

	onDrop = (files) => {
		const imageName = this.state.bike._id + files[0].name
		return ApiService.signUrl(imageName)
			.then((url) => ApiService.uploadImage(url, files[0]))
			.then(() => ApiService.saveImageReferenceToOurBackend(this.state.bike._id, imageName))
			.then(() => this.fetchBike())
			.catch(err => {
				toast.error(err.data?err.data.msg:'Error')
			});
	};


	render() {
		return (
			<PageContentLayout isRendering={this.state.bike.model} unAvailabilityText="Waiting">
				<div>
					<div className="row">
						<div className="col-md-6 mb-4">
							{this.state.bike.imageName && <img style={{ maxHeight: "250px" }} alt="bike" src={s3Url + this.state.bike.imageName}></img>}
						</div>
						<Dropzone onDrop={this.onDrop}>
							{this.state.bike.imageName ? 'Change' : 'Add'} image by clicking here or just drop it here
								</Dropzone>

					</div>
					<EnhancedBikeForm bike={this.state.bike} />
				</div>
			</PageContentLayout>
		)
	}
}

EditBike.propTypes = {
	disabled: PropTypes.any,
	match: PropTypes.any
}

