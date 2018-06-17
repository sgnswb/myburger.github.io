import React, { Component } from 'react';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {
	state = {
		ingredients: {
			salad: 1,
			meat: 1,
			bacon: 1,
			cheese: 1
		}
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutNextHandler = () => {
		this.props.history.replace('/checkout/contact-detail');
	}

	render() {
		return (
			<div>
				<CheckoutSummery 
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutNext={this.checkoutNextHandler} />
			</div>
		);
	}
}

export default Checkout;