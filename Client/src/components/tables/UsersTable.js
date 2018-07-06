import React from 'react'
import { NavLink } from 'react-router-dom';
import { TableLayout } from './TableLayout';

export const UsersTable = ({ users, onAddClick, onEditClick, onDeleteClick }) => (

    <TableLayout
        TableHeaders={() =>
            <React.Fragment>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Past Reservations</th>
                <th>Upcoming Reservations</th>
                <th className="text-center">Update</th>
                <th className="text-center">Delete</th>
            </React.Fragment>
        }


        TableBodyContent={() => users.map((item, index) =>
            (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td className="text-center">
                        <NavLink to={`/pastReservations?userId=${item._id}&label=${item.name}'s`} className="fa fa-chevron-left text-default" id="editButton"></NavLink>
                    </td>
                    <td className="text-center">
                        <NavLink to={`/upcomingReservations?userId=${item._id}&label=${item.name}'s`} className="fa fa-chevron-right text-default" id="editButton"></NavLink>
                    </td>
                    <td className="text-center">
                        <NavLink to={'/editUser/' + item._id} className="fa fa-edit text-warning" id="editButton"></NavLink>
                    </td>
                    <td className="text-center ">
                        <a className="link" onClick={() => onDeleteClick(item)}>
                            <i className="fa fa-trash text-danger"> </i>
                        </a>
                    </td>
                </tr>
            ))}

    />

)