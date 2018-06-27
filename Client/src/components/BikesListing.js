import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ApiService } from '../services/data.service';
import BikesTable from './tables/BikesTable/BikesTable';

class Com extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bikes: [] };
    }
    componentDidMount() {
        ApiService.getBikes({}).then(x => {
            this.setState({ ...this.state, bikes: x.bikes })
        }).catch(err => { })
    }

    onDelete = (item) => {
        ApiService.deleteBike(item._id).then(x => {
            this.setState({ ...this.state, bikes: this.state.bikes.filter(bike => bike._id !== item._id) })
        })
    }
    render() {
        return (
            <div>
                <BikesTable bikes={this.state.bikes} onDeleteClick={this.onDelete} />
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


const BikeListing = connect(mapStateToProps, mapDispatchToProps)(Com)
export default BikeListing


Com.propTypes = {
    getData: PropTypes.func,
    ters: PropTypes.array
}

