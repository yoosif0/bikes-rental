import React from 'react'
import UsersTable from '../tables/MealsTable/UsersTable';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Title from '../text/Title';


export class UsersListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [], skip: 0 };
    }

    componentDidMount() {
        this.fetchUsers()

    }

    fetchUsers() {
        ApiService.getUsers({ skip: this.state.skip }).then(x => {
            this.setState({ ...this.state, users: x.users, pageCount: x.count / 10 })
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let skip = Math.ceil(selected * 10);
        this.setState({ skip }, () => {
            this.fetchUsers();
        });
    };

    onDelete = (item) => {
        ApiService.deleteUser(item._id).then(x => {
            this.setState({ ...this.state, users: this.state.users.filter(bike => bike._id !== item._id) })
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }

    render() {
        return (
            <React.Fragment>
            <Title> Users </Title>
            <div id="react-paginate">
                <UsersTable users={this.state.users} onDeleteClick={this.onDelete} />
                <ReactPaginate previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div >
            </React.Fragment>


        )

    }

}


