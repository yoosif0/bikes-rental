import React from 'react'
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Title from '../text/Title';
import { MyPreviouslyUsedBikesTable } from '../tables/BikesTable/MyPreviouslyUsedBikesTable';
import { PaginationContainer } from '../pagination/PaginationContainer';
import { PageContentLayout } from '../layout/PageContentLayout';


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
            this.setState({ bikesDetails: x.items, pageCount: x.count / 10 })
        }).catch(err => {
            toast.error(err.data.msg)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Title> My Previously Used Bikes </Title>
                <PageContentLayout isRendering={this.state.bikesDetails.length} unAvailabilityText="No reservations">
                    <MyPreviouslyUsedBikesTable bikesDetails={this.state.bikesDetails} />
                    <PaginationContainer pageCount={this.state.pageCount} handlePageClick={skip => this.setState({ skip }, () => this.fetchData())} />
                </PageContentLayout>
            </React.Fragment>


        )

    }

}
