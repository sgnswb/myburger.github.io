import React from 'react';
import Button from '../../UI/Button/Button';

const ordersummery = (props) => {
	const summery = Object.keys(props.ingredients)
		.map(igKey => {
			return (
				<li key={igKey}><span>{igKey}</span>: {props.ingredients[igKey]}</li>
			)
		});

		return (
			<React.Fragment>
				<h3>Your Order:</h3>
				<ul>
					{summery}
				</ul>
				<p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={props.modalClose}>Cancel</Button>
				<Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
			</React.Fragment>
		)
};

export default ordersummery;