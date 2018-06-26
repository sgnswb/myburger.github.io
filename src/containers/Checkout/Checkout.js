import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import ContactDetail from './ContactDetail/ContactDetail';

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutNextHandler = () => {
		this.props.history.replace('/checkout/contact-detail');
	}

	render() {
		let summary = <Redirect to='/' />
		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummery 
						ingredients={this.props.ings}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutNext={this.checkoutNextHandler} />
						<Route path={this.props.match.path + '/contact-detail'} component={ContactDetail} />
					}
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
}

export default connect(mapStateToProps)(Checkout);