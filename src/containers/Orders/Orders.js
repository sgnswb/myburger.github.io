import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ServerErrorHandler from '../../hoc/ServerErrorHandler/ServerErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

	componentDidMount () {
		// this.props.fetchOrders(this.props.token);
		this.props.fetchOrders(localStorage.getItem('token'));
	}

	render () {
		let order = <Spinner />;
		console.log(this.props.loading);
		if (!this.props.loading) {
			order = (
				this.props.orders.map(order => {
					return (
						<Order 
							key={order.id}
							ingredients={order.ingredients}
							price={order.price}/>
					);
				})
			);
		}
		return (
			<div>
				{order}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token
	}
};

const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: (token) => dispatch(actions.fetchOrders(token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerErrorHandler(Orders, axios));