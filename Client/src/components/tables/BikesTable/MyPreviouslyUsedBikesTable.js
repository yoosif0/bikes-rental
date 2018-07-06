import React from 'react'
import { BasicTableHeaders, BasicTableDescription } from './BikesTableFragments';
import { TableLayout } from '../TableLayout';
import { StarRatingTableDescription } from './StarRatingTableDescription';


export const MyPreviouslyUsedBikesTable = ({ bikesDetails }) => (
    <TableLayout
        TableHeaders={() =>
            <React.Fragment>
                <BasicTableHeaders />
                <th>Number of Rides</th>
                <th>My Rate</th>
            </React.Fragment>
        }

        TableBodyContent={() =>
            bikesDetails.map((item, index) =>
                (
                    <tr key={index}>
                        <BasicTableDescription item={item.bike} />
                        <td>{item.numberOfRides}</td>
                        <StarRatingTableDescription id={item.bike._id} rate={item.rate} />
                    </tr>
                )
            )
        }
    />
)

