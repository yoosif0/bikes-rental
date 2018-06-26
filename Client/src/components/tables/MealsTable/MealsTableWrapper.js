import { React } from 'react';
import { MealsTable } from './MealsTable';
import { ApiService } from '../../../services/data.service';

export default class MealsTableWrapper extends React.Component {

    meals;

    render() {
        return (
            <MealsTable meals={this.meals} onAddClick={this.onAddClick} onDeleteClick={this.onDeleteClick} onEditClick={this.onEditClick} />
        )
    }

    onAddClick = () => {

    }

    componentDidMount() {
        // Subscribe to changes
        ApiService.getMeals('aaa', {}).subscribe(
            data => {
                this.meals = data.meals
                this.totalItems = data.count
                if (this.meals && this.meals.length === 0) {
                    this.isEmpty = true
                }
            },
            error => {}
        )
    }




}