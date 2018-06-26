import React from 'react';
import PropTypes from 'prop-types';

export const InputFeedback = ({ error }) =>
    error ? (
        <p test-id="errorMessage" className="form-text text-danger"> {error}</p>
    ) : null;

InputFeedback.propTypes = {
    error: PropTypes.any,
}

