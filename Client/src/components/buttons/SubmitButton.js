import React from 'react'
import PropTypes from 'prop-types';

export default class SubmitButton extends React.Component {
    render() {
        return (
            <button className="btn btn-default" disabled={this.props.disabled} type="submit">Submit</button>
        )
    }
}

SubmitButton.propTypes = {
    disabled: PropTypes.any,
}

