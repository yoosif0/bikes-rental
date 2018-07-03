import React from 'react'
import { connect } from 'react-redux';
import { EnhancedBikeFilterForm } from '../forms/BikeFilterForm/EnhancedBikeFilterForm';
import Title from '../text/Title';


const mapStateToProps = state => ({ filter: state.esriStore.filter })
const mapDispatchToProps = dispatch => ({ 
    filterBikes: (payload) => dispatch({ type: 'FILTER_BIKES', payload }) , 
    loadEsriModules: () => dispatch({ type: 'LOAD_ESRI_MODULES' }) 
})

export class Com extends React.Component {

    componentDidMount() {
        this.props.loadEsriModules()
    }

    render() {
        return (
            <React.Fragment>
                <Title> Map </Title>
            <div className="mb-4">
                <EnhancedBikeFilterForm filter={this.props.filter} filterUpdated={this.props.filterBikes}/>
            </div>
            <div className="mb-4" id="viewMap" style={{ height: `780px` }}></div>
            </React.Fragment>
        )

    }

}

export const BikesMap = connect(mapStateToProps, mapDispatchToProps)(Com)
