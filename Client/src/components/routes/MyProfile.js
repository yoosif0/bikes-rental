import React from 'react'
import PropTypes from 'prop-types';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import { EnhancedEditProfileForm } from '../forms/ProfileForm/EnhancedEditProfileForm';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Title from '../text/Title';
import { PageContentLayout } from '../layout/PageContentLayout';


const mapStateToProps = state => ({ id: state.authStoreState.id })

class Com extends React.Component {
    constructor(props) {
        super(props);
        this.state = { profile: null };
    }
    componentDidMount() {
        this.fetchProfile()
    }

    fetchProfile() {
        return ApiService.getUser(this.props.id).then(x => {
            this.setState({ profile: x })
        }).catch(err => {
            toast.error(err.data&&err.data.msg?err.data.msg:'Error')
        })
    }

    render() {
        return (
            <PageContentLayout isRendering={this.state.profile} unAvailabilityText="Waiting">
                <Title> My Profile </Title>
                <EnhancedEditProfileForm profile={this.state.profile} />
                <Button className="pull-right" color="link" onClick={() => this.props.history.push('changeMyPasswordUsingOldPassword')}>Change My Password </Button>
            </PageContentLayout>
        )
    }
}


export const MyProfile = connect(mapStateToProps, {})(Com)



Com.propTypes = {
    id: PropTypes.string,
    history: PropTypes.any
}

