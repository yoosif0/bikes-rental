import React from 'react'
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Title from '../text/Title';
import { UsersTable } from '../tables/UsersTable';
import { PaginationContainer } from '../pagination/PaginationContainer';
import { PageContentLayout } from '../layout/PageContentLayout';
import { UndoDelete } from '../other/UndoDelete';

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
            toast.error(err.data && err.data.msg ? err.data.msg : 'Error')
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let skip = Math.ceil(selected * 10);
        this.setState({ skip }, () => {
            this.fetchData();
        });
    };

    onDelete = (id) => {
        ApiService.deleteUser(id).then(x => this.fetchData()).catch(err => {
            toast.error(err.data && err.data.msg ? err.data.msg : 'Error')
        })
    }

    render() {
        return (
            <React.Fragment>
                <Title> Users </Title>
                <PageContentLayout isRendering={this.state.users.length} unAvailabilityText="No users">
                    {
                        this.state.users.length &&
                        <UndoDelete items={this.state.users} deletedPermanently={this.onDelete}>
                            {(items, onDelete) =>
                                <UsersTable users={items} onDeleteClick={onDelete} />
                            }
                        </UndoDelete>
                    }
                    <PaginationContainer pageCount={this.state.pageCount} handlePageClick={skip => this.setState({ skip }, () => this.fetchData())} />
                </PageContentLayout>
            </React.Fragment>


        )

    }

}


