import React from 'react'

export default class DefaultInput extends React.Component {
    render() {
        return (
            <div className="form-group row">
                <label className="col-2 col-form-label">{this.props.label} </label>
                <div className="col-10">
                    {this.props.children}
                </div>
            </div>
        )
    }
}


