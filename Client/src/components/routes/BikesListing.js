import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ApiService } from '../../services/data.service';
import BikesTable from '../tables/BikesTable/BikesTable';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

class Com extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bikes: [], skip: 0 };
    }
    componentDidMount() {
        this.fetchBikes()
    }

    fetchBikes() {
        ApiService.getBikesWithPagination({ skip: this.state.skip }).then(x => {
            this.setState({ ...this.state, bikes: x.bikes, pageCount: x.count / 10 })
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }

    onDelete = (item) => {
        ApiService.deleteBike(item._id).then(x => {
            this.setState({ ...this.state, bikes: this.state.bikes.filter(bike => bike._id !== item._id) })
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let skip = Math.ceil(selected * 10);
        this.setState({ skip }, () => {
            this.fetchBikes();
        });
    };

    render() {
        return (
            <div id="react-paginate">
                <BikesTable bikes={this.state.bikes} onDeleteClick={this.onDelete} />
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

        )

    }

}

const mapStateToProps = state => {
    return {
        ters: state.terState.ters
    }
}
const mapDispatchToProps = dispatch => {
    return ({
        selectBike: () => dispatch({ type: 'SAVE_SELECTED_BIKE' })
    })
}


const BikeListing = connect(mapStateToProps, mapDispatchToProps)(Com)
export default BikeListing


Com.propTypes = {
    getData: PropTypes.func,
    ters: PropTypes.array
}

