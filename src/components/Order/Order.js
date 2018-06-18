import React from 'react';
import './Order.css';

const order = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map( igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <span key={igKey} className="Order-ingredient">{igKey} ({props.ingredients[igKey]})</span>;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el)
		}, []);
	return (
		<div className="Order">
			<p>Ingredients: {transformedIngredients}</p>
			<p>Price: <strong>NZD {props.price.toFixed(2)}</strong></p>
		</div>
	);
};

export default order;