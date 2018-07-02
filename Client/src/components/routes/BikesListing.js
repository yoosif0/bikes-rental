import React from 'react'
import { ApiService } from '../../services/data.service';
import BikesTable from '../tables/BikesTable/BikesTable';
import { toast } from 'react-toastify';
import { EnhancedBikeFilterForm } from '../forms/BikeFilterForm/EnhancedBikeFilterForm';
import Title from '../text/Title';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import { PaginationContainer } from '../pagination/PaginationContainer';
import { PageContentLayout } from '../layout/PageContentLayout';


const mapStateToProps = state => ({ isManager: state.authStoreState.role === 'manager' })

export class PBikesListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bikes: [], skip: 0, filter: {} };
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        ApiService.getBikesWithPagination({
            skip: this.state.skip,
            filter: {
                ...this.state.filter,
                startDate: this.state.startDate ? this.state.startDate.utc().format().substring(0, 10) : null,
                endDate: this.state.endDate ? this.state.endDate.utc().format().substring(0, 10) : null
            }
        }).then(x => {
            this.setState({bikes: x.items, pageCount: x.count / 10, isTableHidden: false })
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }

    onDelete = (item) => {
        ApiService.deleteBike(item._id).then(x => {
            this.setState((oldState)=>({ bikes: oldState.bikes.filter(bike => bike._id !== item._id) }))
        })
    }

    // onPageChanged = );


    onFilterUpdated = (filter) => {
        this.setState({ filter })
        this.fetchData()
    }

    onDatesChange(startDate, endDate) {
        this.setState({ startDate, endDate, isTableHidden: true })
    }

    onReserve = (item) => {
        ApiService.reserveBike(item._id, this.state.startDate, this.state.endDate).then(x => {
            this.fetchData()
        })
    }
    render() {
        return (
            <React.Fragment>
                <Title className="forTest"> Bikes </Title>
                <div className="mb-4">
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
                </div>

                <EnhancedBikeFilterForm filter={this.state.filter} filterUpdated={this.onFilterUpdated} />
                <PageContentLayout isRendering={!this.state.isTableHidden} unAvailabilityText="No reservations">
                    <BikesTable isManager={this.props.isManager} bikes={this.state.bikes} onDeleteClick={this.onDelete}
                        areReservationsAllowed={this.state.startDate && this.state.endDate} onReserveClick={this.onReserve} />
                    <PaginationContainer pageCount={this.state.pageCount} handlePageClick={skip => this.setState({ skip }, () => this.fetchData())} />
                </PageContentLayout>
            </React.Fragment>


        )

    }

}

export const BikesListing = connect(mapStateToProps, null)(PBikesListing)