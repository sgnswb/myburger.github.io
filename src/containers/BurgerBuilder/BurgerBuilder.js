import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ServerErrorHandler from '../../hoc/ServerErrorHandler/ServerErrorHandler';


const INGREDIENT_PRICE = {
	cheese: 1.2,
	bacon: 2.3,
	meat: 2.1,
	salad: 0.5
}
class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 3.5,
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount () {
		axios.get('https://myburger-d3410.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data});
			})
			.catch(error => {
				this.setState({error: true});
			});
	}

	updatePurchaseableStateHandler = (ingredients) => {
		const sum = Object.values(ingredients).reduce((sum, el) => {
			return sum + el
		}, 0);
		this.setState({ purchaseable: sum > 0})
	}

	addIngredientHandler = (type) => {
		const updatedCount = this.state.ingredients[type] + 1,
			  priceAddition = this.state.totalPrice + INGREDIENT_PRICE[type],
			  updatedIngredient = {...this.state.ingredients};
			  updatedIngredient[type] = updatedCount;
			  this.setState({
			  	ingredients: updatedIngredient,
			  	totalPrice: priceAddition
			  });
			  this.updatePurchaseableStateHandler(updatedIngredient);
	}

	removeIngredientHandler = (type) => {
		if (this.state.ingredients[type] > 0) {
			const updatedCount = this.state.ingredients[type] - 1,
				  priceDeduction = this.state.totalPrice  - INGREDIENT_PRICE[type],
				  updatedIngredient = {...this.state.ingredients};
				  updatedIngredient[type] = updatedCount;
				  this.setState({
				  	ingredients: updatedIngredient,
				  	totalPrice: priceDeduction
				  });
				  this.updatePurchaseableStateHandler(updatedIngredient);
		}
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	pruchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	pruchaseContinueHandler = () => {
		this.setState({loading: true});
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Tony Wang',
				address: {
					street: '111 queen st',
					city: 'Auckland',
					country: 'New Zealand'
				},
				email: 'test@test.com'
			}
		}
		axios.post('/orders.json', order)
		.then(response => {
			this.setState({loading: false, purchasing: false});
			this.props.history.push('/checkout');
		})
		.catch(error=> {
			this.setState({loading: false, purchasing: false})
		});
	}

	render () {
		let burger = this.state.error ? <p> Can't loaded Ingredients! </p> : <Spinner />,
			orderSummery = null;

		if (this.state.ingredients) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls 
						ingredients={this.state.ingredients} 
						price={this.state.totalPrice}
						purchaseable={this.state.purchaseable}
						purchasing={this.purchaseHandler}
						addIngredient={this.addIngredientHandler}
						removeIngredient={this.removeIngredientHandler}
					/>
				</React.Fragment>
			);
			orderSummery = <OrderSummery 
						ingredients={this.state.ingredients} 
						price={this.state.totalPrice}
						modalClose={this.pruchaseCancelHandler}
						purchaseContinue={this.pruchaseContinueHandler}/>
		}

		if (this.state.loading) {
			orderSummery = <Spinner />;
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

export default ServerErrorHandler(BurgerBuilder, axios);