import React from 'react'
import PropTypes from 'prop-types';

export const SubmitButton =({label, disabled, classNames}) => (
    <button className={`btn btn-default ${classNames}`} disabled={disabled} type="submit"> {label || 'Submit'}</button>
)

SubmitButton.propTypes = {
    disabled: PropTypes.any,
    label: PropTypes.string,
}

export default SubmitButton