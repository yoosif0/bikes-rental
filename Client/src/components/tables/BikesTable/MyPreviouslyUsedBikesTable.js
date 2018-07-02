import React from 'react'
import { BasicTableHeaders, BasicTableDescription } from './BikesTableFragments';
import { BikesTableLayout } from './BikesTableLayout';
import { StarRatingTableDescription } from './StarRatingTableDescription';


export const MyPreviouslyUsedBikesTable = ({ bikesDetails, onRateClick }) => (
    <BikesTableLayout
        TableHeaders={() =>
            <React.Fragment>
                <BasicTableHeaders />
                <th>Number of Rides</th>
                <th className="text-center">My Rate</th>
            </React.Fragment>
        }

        TableBodyContent={() =>
            bikesDetails.map((item, index) =>
                (
                    <tr key={index}>
                        <BasicTableDescription item={item.bike} />
                        <td>{item.numberOfRides}</td>
                        <StarRatingTableDescription id={item.bike._id} rate={item.rate} onRateClick={onRateClick} />
                    </tr>
                )
            )
        }
    />
)

