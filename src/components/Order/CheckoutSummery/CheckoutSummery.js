import React from 'react';
import './CheckoutSummery.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummery = (props) => {
	return (
		<div className="CheckoutSummery">
			<h1>Enjoy your Burger!</h1>
			<div className="CheckoutBurger">
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button 
				btnType="Danger"
				clicked={props.checkoutCancelled}>Cancel</Button>
			<Button 
				btnType="Success"
				clicked={props.checkoutNext}>Next</Button>
		</div>
	);
};

export default checkoutSummery;