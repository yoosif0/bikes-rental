import React from 'react'
import PropTypes from 'prop-types';

export default class Title extends React.Component {
    render() {
        return (
            <h4 className="mb-4">
                {this.props.children}
            </h4>
        )
    }
}

Title.propTypes = {
    children: PropTypes.any.isRequired,
}

