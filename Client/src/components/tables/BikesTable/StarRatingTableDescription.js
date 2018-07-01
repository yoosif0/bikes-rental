import React from 'react'
import StarRatingComponent from 'react-star-rating-component';



export const StarRatingTableDescription = ({ id, rate, onRateClick}) => (
    <td>
        <StarRatingComponent
            onStarClick={onRateClick} /* on icon click handler */
            name={id} /* name of the radio input, it is required */
            value={rate}
            starCount={5} />
        {
            rate !== undefined ?
                <p>
                    {rate} {rate >= 2 ? <span>  Stars  </span> : <span>  Star  </span>}
                </p> :
                <p> Not Rated yet </p>
        }
    </td>
)