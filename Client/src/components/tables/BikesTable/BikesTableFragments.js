import { NavLink } from 'react-router-dom';
import { s3Url } from '../../../config/constants';
import React from 'react'

export const BasicTableHeaders = () => (
    <React.Fragment>
        <th>Image</th>
        <th>Model</th>
        <th>Color</th>
        <th>Weight</th>
    </React.Fragment>
)

export const AdminTableHeaders = () => (
    <React.Fragment>
        <th className="text-center">Update</th>
        <th className="text-center">Delete</th>
    </React.Fragment>
)

export const BasicTableDescription = ({ item }) => (
    <React.Fragment>
        <td>
            {item.imageName ?
                <img style={{ maxHeight: "60px" }} alt="bike" src={s3Url + item.imageName}></img>
                :
                <p>No image available</p>
            }
        </td>
        <td>{item.model}</td>
        <td>{item.color}</td>
        <td>{item.weight}</td>
    </React.Fragment>
)



export const AdminTableDescriptionActions = ({ item, onDeleteClick }) => (
    <React.Fragment>
        <td className="text-center">
            <NavLink to={'/editBike/' + item._id} className="fa fa-edit text-warning" id="editButton"></NavLink>
        </td>
        <td className="text-center ">
            <a className="link" onClick={() => onDeleteClick(item)}>
                <i className="fa fa-trash text-danger"> </i>
            </a>
        </td>
    </React.Fragment>
)

