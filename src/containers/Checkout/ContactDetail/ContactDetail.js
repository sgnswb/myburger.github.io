import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import './ContactDetail.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import ServerErrorHandler from '../../../hoc/ServerErrorHandler/ServerErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactDetail extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 30
				},
				errorMessage: 'Please enter valid name',
				valid: false,
				dirty: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				errorMessage: 'Please enter valid email',
				valid: false,
				dirty: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				errorMessage: 'Please enter valid street',
				valid: false,
				dirty: false
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'City'
				},
				value: '',
				validation: {
					required: true
				},
				errorMessage: 'Please enter valid city',
				valid: false,
				dirty: false
			},
			delivery: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: 'fastest',
				validation: {},
				valid: true
			}
		},
		formIsValid: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.totalPrice,
			orderData: formData
		}
		this.props.orderBurger(order, localStorage.getItem('token'));
	}

	checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		let formIsValid = true;
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.dirty = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		console.log(formIsValid);
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		});
	}

	render () {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form>
				{formElementsArray.map(formElementArray => {
					return <Input 
						key={formElementArray.id} 
						elementType={formElementArray.config.elementType} 
						elementConfig={formElementArray.config.elementConfig}  
						value={formElementArray.config.value}  
						invalid={!formElementArray.config.valid}
						shouldValidate={formElementArray.config.validation}
						dirty={formElementArray.config.dirty}
						errorMessage={formElementArray.config.errorMessage}
						changed={(event) => this.inputChangedHandler(event, formElementArray.id)}/>
				})}
				<Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className="ContactData">
				<h4>Enter your contact detail</h4>
				{form}
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token
	};
}

const mapDispatchToProps = dispatch => {
	return {
		orderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerErrorHandler(ContactDetail, axios));