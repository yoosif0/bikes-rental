import React from 'react'
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Title from '../text/Title';
import { UsersTable } from '../tables/UsersTable';
import { PaginationContainer } from '../pagination/PaginationContainer';
import { PageContentLayout } from '../layout/PageContentLayout';

export class UsersListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [], skip: 0 };
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        ApiService.getUsers({ skip: this.state.skip }).then(x => {
            this.setState({ users: x.users, pageCount: x.count / 10 })
        }).catch(err => {
            toast.error(err.data?err.data.msg:'Error')
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let skip = Math.ceil(selected * 10);
        this.setState({ skip }, () => {
            this.fetchData();
        });
    };

    onDelete = (item) => {
        ApiService.deleteUser(item._id).then(x => {
            this.setState({ users: this.state.users.filter(bike => bike._id !== item._id) })
        }).catch(err => {
            toast.error(err.data?err.data.msg:'Error')
        })
    }

    render() {
        return (
            <React.Fragment>
                <Title> Users </Title>
                <PageContentLayout isRendering={this.state.users.length} unAvailabilityText="No users">
                    <UsersTable users={this.state.users} onDeleteClick={this.onDelete} />
                    <PaginationContainer pageCount={this.state.pageCount} handlePageClick={skip => this.setState({ skip }, () => this.fetchData())} />
                </PageContentLayout>
            </React.Fragment>


        )

    }

}


