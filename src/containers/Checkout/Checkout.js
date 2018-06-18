import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {
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
					ingredients={this.props.ings}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutNext={this.checkoutNextHandler} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		totalPrice: state.totalPrice
	};
}

export default connect(mapStateToProps)(Checkout);