import React from 'react'
import {
    BasicTableHeaders,
    AdminTableHeaders,
    BasicTableDescription,
    AdminTableDescription
} from './BikesTableFragments';
import { TableLayout } from '../TableLayout';
import { StarRatingTableDescription } from './StarRatingTableDescription';

const BikesTable = ({ bikes, areReservationsAllowed, onAddClick, onEditClick, onDeleteClick, onReserveClick, isManager }) => (
    <TableLayout
        TableHeaders={() =>
            <React.Fragment>
                <BasicTableHeaders />
                <th>Rate</th>
                {isManager && <AdminTableHeaders />}
                {
                    areReservationsAllowed && <th className="text-center">Reserve</th>
                }

            </React.Fragment>
        }

        TableBodyContent={() =>
            bikes.map((item, index) =>
                (
                    <tr key={index}>
                        <BasicTableDescription item={item} />
                        <StarRatingTableDescription id={item._id} rate={item.avgRate} />
                        {isManager && <AdminTableDescription item={item} onDeleteClick={onDeleteClick} />}
                        {
                            areReservationsAllowed && <td className="text-center">
                                <a className="link" onClick={() => onReserveClick(item)} style={!item.isAvailable ? { opacity: 0.1, cursor: 'not-allowed' } : {}}>
                                    <i className="fa fa-check-square text-success"> </i>
                                </a>
                            </td>

                        }

                    </tr>
                )
            )
        }
    />
)

export default BikesTable

