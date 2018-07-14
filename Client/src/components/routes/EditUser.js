import React from 'react'
import PropTypes from 'prop-types';
import { EnhancedUserForm } from '../forms/UserForm/EnhancedEditForm';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Title from '../text/Title';
import { Button } from 'reactstrap';
import { PageContentLayout } from '../layout/PageContentLayout';


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
            toast.error(err.data&&err.data.msg?err.data.msg:'Error')
        })
    }

    render() {
        return (
            <PageContentLayout isRendering={this.state.user.name} unAvailabilityText="Waiting">
                <Title> Update User Info </Title>
                <EnhancedUserForm user={this.state.user} />
                <Button className="pull-right" color="link"  onClick={() => this.props.history.push(`../changeOtherUserPassword/${this.state.user._id}`)}>Change {this.state.user.name} Password </Button>
            </PageContentLayout>
        )
    }
}

EditUser.propTypes = {
    match: PropTypes.any,
    history: PropTypes.any
}

