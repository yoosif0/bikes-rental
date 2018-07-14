import React from 'react'
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Title from '../text/Title';
import { UserReservationsTable } from '../tables/UserReservationsTable';
import qs from 'qs';
import { PaginationContainer } from '../pagination/PaginationContainer'
import { PageContentLayout } from '../layout/PageContentLayout';

export class PastReservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reservations: [], skip: 0 };
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        ApiService.getPastReservations(qs.parse(this.props.location.search)["?userId"], { skip: this.state.skip }).then(x => {
            this.setState({ reservations: x.items, pageCount: x.count / 10 })
        }).catch(err => {
            toast.error(err.data&&err.data.msg?err.data.msg:'Error')
        })
    }

    render() {
        return (
            <React.Fragment>
                <Title> {qs.parse(this.props.location.search).label} Past Reservations </Title>
                <PageContentLayout isRendering={this.state.reservations.length} unAvailabilityText="No reservations">
                    <UserReservationsTable reservations={this.state.reservations} />
                    <PaginationContainer pageCount={this.state.pageCount} handlePageClick={skip => this.setState({ skip }, () => this.fetchData())} />
                </PageContentLayout>
            </React.Fragment>


        )

    }

}
