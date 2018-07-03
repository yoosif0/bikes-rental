import React from 'react'

export const SubmitButton =({label, disabled, classNames}) => (
    <button className={`btn btn-default ${classNames}`} disabled={disabled} type="submit"> {label || 'Submit'}</button>
)


export default SubmitButton