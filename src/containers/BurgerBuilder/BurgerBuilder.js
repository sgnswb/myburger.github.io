import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import ServerErrorHandler from '../../hoc/ServerErrorHandler/ServerErrorHandler';
import * as actions from '../../store/actions/burgerBuilder';
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
		this.setState({purchasing: true});
	}

	pruchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	pruchaseContinueHandler = () => {
		this.props.history.push('/checkout');
		// this.setState({loading: true});
		// const order = {
		// 	ingredients: this.props.ings,
		// 	price: this.props.totalPrice,
		// 	customer: {
		// 		name: 'Tony Wang',
		// 		address: {
		// 			street: '111 queen st',
		// 			city: 'Auckland',
		// 			country: 'New Zealand'
		// 		},
		// 		email: 'test@test.com'
		// 	}
		// }
		// axios.post('/orders.json', order)
		// .then(response => {
		// 	this.setState({loading: false, purchasing: false});
		// 	this.props.history.push('/checkout');
		// })
		// .catch(error=> {
		// 	this.setState({loading: false, purchasing: false})
		// });
	}

	render () {
		let burger = this.props.error ? <p> Can't loaded Ingredients! </p> : <Spinner />,
			orderSummery = null;

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
		ings: state.ingredients,
		totalPrice: state.totalPrice,
		error: state.error
	};
}

const mapDispatchToProps = dispatch => {
	return {
		addIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
		removeIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
		initIngredients: () => dispatch(actions.initIngredients())
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(ServerErrorHandler(BurgerBuilder, axios));