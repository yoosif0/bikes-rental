import React from 'react'
import PropTypes from 'prop-types';
import DefaultInput from '../ui-inputs/DefaultInputLayout';

export default class MealForm extends React.Component {

    getDerivedStateFromProps(props, state){
        this.setState({
            meal: props.meal? props.meal : {}
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    isNameValid(name) {
        return name.length > 3 && name.length<20
    }
    isNumOfCaloriesValid(num) {
        return num >= 0 && num<3000
    }
    isFormValid() {
        return this.state.name && this.state.numOfCalories && this.isNameValid(this.state.name) && this.isNumOfCaloriesValid(this.state.numOfCalories)
    }

    render() {
        return (
            <form>
                <DefaultInput isDisplayingErrorMessage={this.state.name && this.isNameValid(this.state.name)}>
                    <input value={this.state.name} onChange={this.handleInputChange} type="text" name="name" className="form-control" />
                </DefaultInput>
                <DefaultInput isDisplayingErrorMessage={this.state.numOfCalories && this.isNumOfCaloriesValid(this.state.numOfCalories)}>
                    <input value={this.state.numOfCalories} onChange={this.handleInputChange} name="numOfCalories" type="number" className="form-control" />
                </DefaultInput>
                <app-submit-button isDisabled={this.isFormValid()}></app-submit-button>
            </form>
        )
    }
}

MealForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

