import React from 'react'
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({ rateBike: (payload) => dispatch({ type: 'RATE_BIKE', payload }) })

export class Com extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentRate: props.rate };
    }

    render() {
        return (
            <td>
                <StarRatingComponent
                    onStarClick={(nextValue, prevValue, id) => this.props.rateBike({bikeId: id, rate:nextValue})} 
                    name={this.props.id}
                    value={this.state.currentRate || 0}
                    starCount={5}
                    onStarHover={(nextValue, prevValue, id) => this.setState({ currentRate: nextValue })}
                    onStarHoverOut={(nextValue, prevValue, id) => this.setState((oldState) => ({ currentRate: this.props.rate }))}
                />
                {
                    this.props.rate !== undefined ?
                        <p>
                            {this.props.rate} {this.props.rate >= 2 ? <span>  Stars  </span> : <span>  Star  </span>}
                        </p> :
                        <p> Not Rated yet </p>
                }
            </td>

        )
    }
}

export const StarRatingTableDescription = connect(null, mapDispatchToProps)(Com)
