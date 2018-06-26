import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Auth.css';

import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email address'
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
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				errorMessage: 'Please enter password',
				valid: false,
				dirty: false
			}
		},
		isSignup: true
	}

	componentDidMount () {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.setAuthRedirectPath();
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				dirty: true
			}
		};

		this.setState({controls: updatedControls});
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

	submitHandler = (event) => {
		event.preventDefault();
		this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
	}

	switchAuthHandler = () => {
		this.setState(prevState => {
			return {isSignup: !prevState.isSignup};
		});
	}

	render () {
		const formElementsArray = [];
		let load = <Spinner />,
			errorMessage = null;
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		const form = formElementsArray.map(formElement => {
			return (
				<Input 
					key={formElement.id} 
					elementType={formElement.config.elementType} 
					elementConfig={formElement.config.elementConfig}  
					value={formElement.config.value}  
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					dirty={formElement.config.dirty}
					errorMessage={formElement.config.errorMessage}
					changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
			);
		});

		if (this.props.error) {
			errorMessage = (
				<p className="ErrorMessage">{this.props.error.message.replace('_', ' ').toLowerCase()}</p>
			);
		}

		if (!this.props.loading) {
			load = (
				<React.Fragment>
					<form onSubmit={this.submitHandler}>
						{form}
						{errorMessage}
						<Button btnType="Success">Submit</Button>
					</form>
					<Button 
						btnType="Danger"
						clicked={this.switchAuthHandler}>Switch to {this.state.isSignup ? 'sign in' : 'sign up'}</Button>
				</React.Fragment>
			);
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />
		}

		return (
			<div className="Auth">
				{authRedirect}
				{load}
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		error: state.auth.error,
		loading: state.auth.loading,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		auth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
		setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);