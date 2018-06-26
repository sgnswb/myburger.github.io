import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import ServerErrorHandler from '../../hoc/ServerErrorHandler/ServerErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	}

	componentDidMount () {
		this.props.initIngredients();
	}

	updatePurchaseableStateHandler = (ingredients) => {
		const sum = Object.values(ingredients).reduce((sum, el) => {
			return sum + el
		}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({purchasing: true});
		}else {
			this.props.setAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
		
	}

	pruchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	pruchaseContinueHandler = () => {
		this.props.initPurchase();
		this.props.history.push('/checkout');
	}

	render () {
		let burger = this.props.error ? <p> Can't loaded Ingredients! </p> : <Spinner />,
			orderSummery = null;
			console.log(this.props.totalPrice);
		if (this.props.ings) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ings} />
					<BuildControls 
						ingredients={this.props.ings} 
						price={this.props.totalPrice}
						purchaseable={this.updatePurchaseableStateHandler(this.props.ings)}
						purchasing={this.purchaseHandler}
						addIngredient={this.props.addIngredient}
						removeIngredient={this.props.removeIngredient}
						isAuth={this.props.isAuthenticated}
					/>
				</React.Fragment>
			);
			orderSummery = <OrderSummery 
						ingredients={this.props.ings} 
						price={this.props.totalPrice}
						modalClose={this.pruchaseCancelHandler}
						purchaseContinue={this.pruchaseContinueHandler}/>
		}

		return (
			<React.Fragment>
				<Modal show={this.state.purchasing} modalClose={this.pruchaseCancelHandler}>
					{orderSummery}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
}

const mapDispatchToProps = dispatch => {
	return {
		addIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
		removeIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
		initIngredients: () => dispatch(actions.initIngredients()),
		initPurchase: () => dispatch(actions.purchaseInit()),
		setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(ServerErrorHandler(BurgerBuilder, axios));