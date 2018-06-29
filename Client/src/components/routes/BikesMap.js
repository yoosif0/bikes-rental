import React from 'react'
// import * as ReactDOM from 'react-dom';
// import { Map } from 'react-arcgis';
// import { graphicsService } from './graphicsSevice';
// import { assignMapEventHandlers, addUIWidgets } from './map-ui-widgets';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const mapStateToProps = state => ({ ters: state.terState.ters })
const mapDispatchToProps = dispatch => ({ loadEsriModules: () => dispatch({ type: 'LOAD_ESRI_MODULES' }) })


export class Com extends React.Component {

    componentDidMount() {
        this.props.loadEsriModules()
    }

    render() {
        return (
            <div id="viewMap" style={{ height: `780px` }}>
                AAAAAA
            </div>
        )

    }

}

export const BikesMap = connect(mapStateToProps, mapDispatchToProps)(Com)

Com.propTypes = {
    loadEsriModules: PropTypes.any,
}
