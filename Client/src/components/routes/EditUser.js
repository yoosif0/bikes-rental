import React from 'react'
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Title from '../text/Title';
import { Button } from 'reactstrap';
import { PageContentLayout } from '../layout/PageContentLayout';
import userFormSchema from '../forms/UserForm/validationSchema';
import { InnerForm } from '../forms/UserForm/InnerForm';
import { Formik } from 'formik';
import { SubmitButton } from '../buttons/SubmitButton';
import { withRouter } from 'react-router-dom';


class PEditUser extends React.Component {
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
            toast.error(err.data && err.data.msg ? err.data.msg : 'Error')
        })
    }

    onSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
        return ApiService.editUser(this.state.user._id, values).then((payload) => {
            toast.success('Updated successfully')
            setSubmitting(false);
            resetForm({ email: payload.email, name: payload.name, role: payload.role })
            this.props.history.push(`../users`)

        }).catch(err => {
            setSubmitting(false)
            toast.error(err.data && err.data.msg ? err.data.msg : 'Error')
        })
    }

    innerForm = props => (
        <InnerForm {...props}>
            <SubmitButton disabled={!props.dirty || props.isSubmitting || Object.keys(props.errors).length} ></SubmitButton>
        </InnerForm>
    )


    render() {
        return (
            <PageContentLayout isRendering={this.state.user.name} unAvailabilityText="Waiting">
                <Title> Update User Info </Title>
                <Formik
                    validationSchema={userFormSchema}
                    initialValues={{ name: this.state.user.name, email: this.state.user.email, role: this.state.user.role }}
                    onSubmit={this.onSubmit}
                    render={this.innerForm}
                />
                <Button className="pull-right" color="link" onClick={() => this.props.history.push(`../changeOtherUserPassword/${this.state.user._id}`)}>Change {this.state.user.name} Password </Button>
            </PageContentLayout>
        )
    }
}

const EditUser = withRouter(PEditUser)

export default EditUser;