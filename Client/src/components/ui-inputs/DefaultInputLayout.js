import React from 'react'

export default class DefaultInput extends React.Component {
    render() {
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">{this.props.label} </label>
                <div className="col-sm-10">
                    {this.props.children}
                </div>
            </div>
        )
    }
}


