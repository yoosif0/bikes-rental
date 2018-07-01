import React from 'react'
import { BasicTableHeaders, BasicTableDescription } from './BikesTableFragments';
import { BikesTableLayout } from './BikesTableLayout';
import StarRatingComponent from 'react-star-rating-component';


export const BikesTableForRating = ({ bikesDetails, onRateClick }) => (
    <BikesTableLayout
        TableHeaders={() =>
            <React.Fragment>
                <BasicTableHeaders />
                <th>Number of Rides</th>
                <th className="text-center">Rate</th>
            </React.Fragment>
        }

        TableBodyContent={() =>
            bikesDetails.map((item, index) =>
                (
                    <tr key={index}>
                        <BasicTableDescription item={item.bike} />
                        <td>{item.numberOfRides}</td>


                        <td className="text-center ">
                            <StarRatingComponent
                                name={item.bike._id} /* name of the radio input, it is required */
                                value={item.rate || 0 } /* number of selected icon (`0` - none, `1` - first) */
                                starCount={5} /* number of icons in rating, default `5` */
                                onStarClick={onRateClick} /* on icon click handler */
                            />
                        </td>
                    </tr>
                )
            )
        }
    />
)

