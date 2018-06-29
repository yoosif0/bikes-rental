import React from 'react'
import PropTypes from 'prop-types';
import { EnhancedUserForm } from '../forms/UserForm/EnhancedEditForm';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Title from '../text/Title';
import { Button } from 'reactstrap';

export default class EditUser extends React.Component {
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
                <Title> Update User Info </Title>
                <EnhancedUserForm user={this.state.user} />
                <Button className="mt-4" color="default"onClick={()=>this.props.history.push(`../changeOtherUserPassword/${this.state.user._id}`)}>Change {this.state.user.name} Password </Button>
            </div>
           :
           <p>Waiting</p>
        )
    }
}

EditUser.propTypes = {
    match: PropTypes.any,
    history: PropTypes.any
}

