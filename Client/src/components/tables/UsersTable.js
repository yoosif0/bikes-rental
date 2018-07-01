import React from 'react'
import { NavLink } from 'react-router-dom';


 export const UsersTable = ({ users, onAddClick, onEditClick, onDeleteClick }) => (
    <div>
        <table id="UsersTable" className="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="text-center">Update</th>
                    <th className="text-center">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((item, index) =>
                        (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td className="text-center">
                                    <NavLink to={'/editUser/' + item._id} className="fa fa-edit text-warning" id="editButton"></NavLink>
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
