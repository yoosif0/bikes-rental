import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const ReservationsTable = ({ reservations, onCancelClick }) => (
    <div>
        <h3 className="panel-title">
            <NavLink title="Add New Bike" id="addButton" className="text-info pull-right fa fa-plus link" to='/addBike' aria-hidden="true"></NavLink>
        </h3>
        <table id="ReservationsTable" className="table table-hover">
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Bike Model</th>
                    <th>Bike Color</th>
                    <th>Bike Weight</th>
                    <th className="text-center">Cancel</th>
                </tr>
            </thead>
            <tbody>
                {
                    reservations.map((item, index) =>
                        (
                            <tr key={index}>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td>{item.bikeId.model}</td>
                                <td>{item.bikeId.color}</td>
                                <td>{item.bikeId.weight}</td>
                                <td className="text-center ">
                                    <a className="link" onClick={() => onCancelClick(item)}>
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

export default ReservationsTable

ReservationsTable.propTypes = {
    reservations: PropTypes.array,
    onCancelClick: PropTypes.func,
};
