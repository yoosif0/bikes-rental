import React from 'react'
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import Title from '../text/Title';
import { UserReservationsTable } from '../tables/UserReservationsTable';
import qs from 'qs';
import { PaginationContainer } from '../pagination/PaginationContainer';
import { PageContentLayout } from '../layout/PageContentLayout';



export class UpcomingReservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reservations: [], skip: 0 };
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        ApiService.getUpcomingReservations(qs.parse(this.props.location.search)["?userId"], { skip: this.state.skip }).then(x => {
            this.setState({ reservations: x.items, pageCount: x.count / 10 })
        }).catch(err => {
            toast.error(err.data&&err.data.msg?err.data.msg:'Error')
        })
    }

    onCancelReservation = (item) => {
        ApiService.cancelReservation(item._id).then(x => this.fetchData()).catch(err=>{
			toast.error(err.data&&err.data.msg?err.data.msg:'Error')
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let skip = Math.ceil(selected * 10);
        this.setState({ skip }, () => {
            this.fetchData();
        });
    };


    render() {
        return (
            <React.Fragment>
                <Title> {qs.parse(this.props.location.search).label} Upcoming Reservations </Title>
                <PageContentLayout isRendering={this.state.reservations.length} unAvailabilityText="No reservations">
                    <UserReservationsTable reservations={this.state.reservations} onCancelClick={this.onCancelReservation} />
                    <PaginationContainer pageCount={this.state.pageCount} handlePageClick={skip => this.setState({ skip }, () => this.fetchData())} />
                </PageContentLayout>
            </React.Fragment>


        )

    }

}
