import React from 'react'
import {
    BasicTableHeaders,
    AdminTableHeaders,
    BasicTableDescription,
    AdminTableDescriptionActions
} from './BikesTableFragments';
import { BikesTableLayout } from './BikesTableLayout';
import { StarRatingTableDescription } from './StarRatingTableDescription';

const BikesTable = ({ bikes, areReservationsAllowed, onAddClick, onEditClick, onDeleteClick, onReserveClick, isManager }) => (
    <BikesTableLayout
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
                        {isManager && <AdminTableDescriptionActions item={item} onDeleteClick={onDeleteClick} />}
                        {
                            areReservationsAllowed && <td className="text-center">
                                <a className="link" onClick={() => onReserveClick(item)}>
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

