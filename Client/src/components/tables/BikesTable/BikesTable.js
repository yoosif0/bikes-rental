import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const BikesTable = ({ bikes, onAddClick, onEditClick, onDeleteClick }) => (
    <div>
        <h3 className="panel-title">
            <NavLink title="Add New Bike" id="addButton" className="text-info pull-right fa fa-plus link" to='/addBike' aria-hidden="true"></NavLink>
        </h3>
        <table id="BikesTable" className="table table-hover">
            <thead>
                <tr>
                    <th>Image</th>
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
                                <td>
                                    {item.imageName ?
                                        <img style={{ maxHeight: "60px" }} alt="bike" src={'https://s3.amazonaws.com/bike-images-22/' +item.imageName}></img>
                                        :
                                        <p>No image available</p>
                                    }
                                </td>
                                <td>{item.model}</td>
                                <td>{item.color}</td>
                                <td>{item.weight}</td>
                                <td className="text-center">
                                    <NavLink to={'/editBike/' + item._id} className="fa fa-edit text-warning" id="editButton"></NavLink>
                                </td>
                                <td className="text-center ">
                                    <a className="link" onClick={() => onDeleteClick(item)}>
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
