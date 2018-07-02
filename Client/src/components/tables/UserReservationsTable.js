import React from 'react'
import moment from 'moment'

export const UserReservationsTable = ({ reservations, onCancelClick }) => (
    <div>
        <table id="UserReservationsTable" className="table table-hover">
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Bike Model</th>
                    <th>Bike Color</th>
                    <th>Bike Weight in kg</th>
                    {
                        onCancelClick && <th className="text-center">Cancel Reservation</th>
                    }

                </tr>
            </thead>
            <tbody>
                {
                    reservations.map((item, index) =>
                        (
                            <tr key={index}>
                                <td>{moment(item.startDate).format('MM/DD/YYYY')}</td>
                                <td>{moment(item.endDate).format('MM/DD/YYYY')}</td>


                                {
                                    item.bikeId ?
                                        <React.Fragment>
                                            <td>{item.bikeId.model}</td>
                                            <td>{item.bikeId.color}</td>
                                            <td>{item.bikeId.weight}</td>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </React.Fragment>
                                }


                                {
                                    onCancelClick ?
                                        <td className="text-center ">
                                            {
                                                item.bikeId ?
                                                    <a className="link" onClick={() => onCancelClick(item)}>
                                                        <i className="fa fa-thumbs-down text-danger"> </i>
                                                    </a>
                                                    :
                                                    'Bike has been removed from our system'
                                            }
                                        </td>
                                        :
                                        null
                                }

                            </tr>
                        )
                    )}
            </tbody>
        </table>
    </div>

)

