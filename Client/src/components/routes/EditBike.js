import React from 'react'
import PropTypes from 'prop-types';
import { EnhancedBikeForm } from '../forms/BikeForm/EnhancedEditForm';
import { ApiService } from '../../services/data.service';
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify';
import { s3Url } from '../../config/constants';

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
			toast.error(err)
		})
	}

	onDrop = (files) => {
		return ApiService.signUrl(files[0], this.state.bike._id).then((url) => {
			return ApiService.uploadImage(url, files[0]).then((response) => {
				this.setState({
					statusCode: response.status,
				});
			});
		})
			.catch(err => {
				toast.error(err)
			});
	};


	render() {
		return (
			<div>
				{
					this.state.bike.model ?
						<div>
							<Dropzone onDrop={this.onDrop} >
								{
									this.state.bike.imageName ? <img style={{ maxHeight: "170px" }} alt="bike" src={s3Url+this.state.bike.imageName}></img> : <p>Add an image.</p>
								}
							</Dropzone>

							<EnhancedBikeForm bike={this.state.bike} />
						</div>
						:
						<p>Waiting</p>
				}
			</div>
		)
	}
}

EditBike.propTypes = {
	disabled: PropTypes.any,
	match: PropTypes.any
}

