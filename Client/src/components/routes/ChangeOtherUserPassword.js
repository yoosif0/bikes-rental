import React from 'react'
import Title from '../text/Title';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import {
	EnhancedChangeOtherUserPasswordForm
} from '../forms/ChangeOtherUserPasswordForm/EnhancedChangeOtherUserPasswordForm';
import { PageContentLayout } from '../layout/PageContentLayout';


class ChangeOtherUserPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: {} };
	}
	componentDidMount() {
		this.fetchUser()
	}

	fetchUser() {
		return ApiService.getUser(this.props.match.params.id).then(x => {
			this.setState({ user: x })
		}).catch(err => {
			toast.error(err.data&&err.data.msg?err.data.msg:'Error')
		})
	}

	render() {
		return (
			<PageContentLayout isRendering={this.state.user.name} unAvailabilityText="Waiting">
				<Title> Change {this.state.user.name} Password </Title>
				<EnhancedChangeOtherUserPasswordForm userId={this.state.user._id} />
			</PageContentLayout>
		)
	}
}


export default ChangeOtherUserPassword;