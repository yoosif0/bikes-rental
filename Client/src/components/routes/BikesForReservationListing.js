import { DateRangePicker } from 'react-dates';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';



class Com extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bikes: [] };
    }

    componentDidMount() {
        // ApiService.getBikes({}).then(x => {
        //     this.setState({ ...this.state, bikes: x.bikes })
        // }).catch(err => { })
        // toast.onChange( numberOfToastDisplayed => {
        //     console.log(numberOfToastDisplayed)
        //   });
    }

    onDelete = (item) => {
        // ApiService.deleteBike(item._id).then(x => {
        //     this.setState({ ...this.state, bikes: this.state.bikes.filter(bike => bike._id !== item._id) })
        // })
    }

    onDatesChange(startDate, endDate) {
        this.setState({ startDate, endDate })
        console.log(startDate, endDate)
        if (startDate && endDate) {
            if (endDate.date() >= startDate.date() + 3) {
                toast.error('The maximum number of days to reserve is 3 days', { position: toast.POSITION.BOTTOM_CENTER })
                this.setState({ startDate: null, endDate: null })
            }
        }
        // console.log(new Date(endDate))
        // 
        // 
    }
    render() {
        return (
            <div>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.onDatesChange(startDate, endDate)} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
                <button onClick={this.search} disabled={!this.state.startDate || !this.state.startDate}> Search </button>
            </div>
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


const BikeForReservationListing = connect(mapStateToProps, mapDispatchToProps)(Com)
export default BikeForReservationListing


Com.propTypes = {
    getData: PropTypes.func,
    ters: PropTypes.array
}



