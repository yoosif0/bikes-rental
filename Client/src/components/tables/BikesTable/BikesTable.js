import React from 'react'
import PropTypes from 'prop-types';



 const BikesTable = ({ bikes, onAddClick, onEditClick, onDeleteClick }) => (
    <div>
        <h3 className="panel-title">
            <button title="Add New Meal" id="addButton" onClick={onAddClick} className="text-info pull-right fa fa-plus link" aria-hidden="true"></button>
        </h3>

        <table id="BikesTable" className="table table-hover">
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Weight</th>
                    <th className="text-center">Update</th>
                    <th className="text-center">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    bikes.map((item, index) =>
                        (
                            <tr key={index}>
                                <td>{item.model}</td>
                                <td>{item.color}</td>
                                <td>{item.weight}</td>
                                <td className="text-center">
                                    <a className="link" id="editButton" onClick={()=>onEditClick(item)}>
                                        <i className="fa fa-edit text-warning"> </i>
                                    </a>
                                </td>
                                <td className="text-center ">
                                    <a className="link" onClick={()=>onDeleteClick(item)}>
                                        <i className="fa fa-trash text-danger"> </i>
                                    </a>
                                </td>
                            </tr>
                        )
                    )}
            </tbody>
        </table>
    </div>

)

export default BikesTable

BikesTable.propTypes = {
    bikes: PropTypes.array,
    onAddClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func
};
