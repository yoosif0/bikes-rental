import React from 'react'
import PropTypes from 'prop-types';

export const SubmitButton =({label, disabled}) => (
    <button className="btn btn-default" disabled={disabled} type="submit"> {label || 'Submit'}</button>
)

SubmitButton.propTypes = {
    disabled: PropTypes.any,
    label: PropTypes.string,
}

export default SubmitButton