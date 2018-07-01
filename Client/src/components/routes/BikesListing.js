import React from 'react'
import { ApiService } from '../../services/data.service';
import BikesTable from '../tables/BikesTable/BikesTable';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { EnhancedBikeFilterForm } from '../forms/BikeFilterForm/EnhancedBikeFilterForm';
import Title from '../text/Title';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';


const mapStateToProps = state =>   ({  isManager: state.authStoreState.role==='manager' })

class PBikesListing extends React.Component {
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
            filter: {
                ...this.state.filter,
                startDate: this.state.startDate ? this.state.startDate.utc().format().substring(0, 10) : null,
                endDate: this.state.endDate ? this.state.endDate.utc().format().substring(0, 10) : null
            }
        }).then(x => {
            this.setState({ ...this.state, bikes: x.items, pageCount: x.count / 10, isTableHidden: false })
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
        this.setState({ startDate, endDate, isTableHidden: true })
    }

    onReserve = (item) => {
        ApiService.reserveBike(item._id, this.state.startDate, this.state.endDate).then(x => {
            this.fetchBikes()
        })
    }

    onRate = (nextValue, prevValue, id) => {
        ApiService.rateBike(id, nextValue).then(x => {
            this.fetchBikes();
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Title> Bikes </Title>
                <DateRangePicker
                    isOutsideRange={() => false}
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.onDatesChange(startDate, endDate)} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />



                <EnhancedBikeFilterForm filter={this.state.filter} filterUpdated={this.onFilterUpdated} />
                {
                    !this.state.isTableHidden &&
                    <div id="react-paginate">
                        <BikesTable isManager={this.props.isManager} bikes={this.state.bikes} onDeleteClick={this.onDelete}
                            areReservationsAllowed={this.state.startDate && this.state.endDate} onReserveClick={this.onReserve} onRateClick={this.onRate}/>
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
                }



            </React.Fragment>


        )

    }

}

export const BikesListing = connect(mapStateToProps, null)(PBikesListing)