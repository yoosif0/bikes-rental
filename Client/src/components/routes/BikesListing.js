import React from 'react'
import { ApiService } from '../../services/data.service';
import BikesTable from '../tables/BikesTable/BikesTable';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { EnhancedBikeFilterForm } from '../forms/BikeFilterForm/EnhancedBikeFilterForm';
import Title from '../text/Title';
import { DateRangePicker } from 'react-dates';

export class BikesListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bikes: [], skip: 0, filter: {} };
    }
    componentDidMount() {
        this.fetchBikes()
    }

    fetchBikes() {
        ApiService.getBikesWithPagination({
            skip: this.state.skip,
            filter: { ...this.state.filter, startDate: this.state.startDate, endDate: this.state.endDate }
        }).then(x => {
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
    onFilterUpdated = (filter) => {
        this.setState({ filter })
        this.fetchBikes()
    }

    onDatesChange(startDate, endDate) {
        this.setState({ startDate, endDate })
    }

    onReserve = (item) => {
        ApiService.reserveBike(item._id, this.state.startDate, this.state.endDate).then(x => {
            this.fetchBikes()
        })
    }

    render() {
        return (
            <React.Fragment>
                <Title> Bikes </Title>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.onDatesChange(startDate, endDate)} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />

                <div id="react-paginate">

                    <EnhancedBikeFilterForm filter={this.state.filter} filterUpdated={this.onFilterUpdated} />
                    <BikesTable bikes={this.state.bikes} onDeleteClick={this.onDelete} 
                    areReservationsAllowed={this.state.startDate && this.state.endDate} onReserveClick={this.onReserve} />
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
