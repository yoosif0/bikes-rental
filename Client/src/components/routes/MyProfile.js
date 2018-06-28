import React from 'react'
import PropTypes from 'prop-types';
import { EnhancedUserForm } from '../forms/UserForm/EnhancedEditForm';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';

export default class MyProfile extends React.Component {
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
            toast.error(err)
        })
    }




    render() {
        return (
            this.state.user.name ?
            <div>
                <EnhancedUserForm user={this.state.user} />
            </div>
           :
           <p>Waiting</p>
        )
    }
}

MyProfile.propTypes = {
    disabled: PropTypes.any,
    match: PropTypes.any
}

