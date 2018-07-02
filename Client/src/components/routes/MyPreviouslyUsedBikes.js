import React from 'react'
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Title from '../text/Title';
import { MyPreviouslyUsedBikesTable } from '../tables/BikesTable/MyPreviouslyUsedBikesTable';


export class MyPreviouslyUsedBikes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bikesDetails: [], skip: 0 };
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        ApiService.getMyPreviouslyUsedBikes({ skip: this.state.skip }).then(x => {
            this.setState({ ...this.state, bikesDetails: x.items, pageCount: x.count / 10 })
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let skip = Math.ceil(selected * 10);
        this.setState({ skip }, () => {
            this.fetchData();
        });
    };

    onRate = (nextValue, prevValue, id) => {
        ApiService.rateBike(id, nextValue).then(x => {
            this.fetchData();
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Title> My Previously Used Bikes </Title>
                {
                    this.state.bikesDetails.length ?
                        <div id="react-paginate">
                            <MyPreviouslyUsedBikesTable bikesDetails={this.state.bikesDetails} onRateClick={this.onRate} />
                            <ReactPaginate previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={<a href="">...</a>}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"} />
                        </div >
                        :
                        <p> No reservations </p>
                }
            </React.Fragment>


        )

    }

}
