import React from 'react'
import moment from 'moment'

export const BikeReservationsTable = ({ reservations }) => (
    <div>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>User name</th>
                    <th>User email</th>
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
                                    item.userId ?
                                        <React.Fragment>
                                            <td>{item.userId.name}</td>
                                            <td>{item.userId.email}</td>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <td>-</td>
                                            <td>-</td>
                                        </React.Fragment>
                                }

                            </tr>
                        )
                    )}
            </tbody>
        </table>
    </div>

)

