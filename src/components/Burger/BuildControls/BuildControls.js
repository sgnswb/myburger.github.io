import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
	let buildControls = Object.keys(props.ingredients)
		.map( igKey => {
			return <BuildControl 
						key={igKey} 
						label={igKey}
						count={props.ingredients[igKey]}
						added={()=> props.addIngredient(igKey)}
						removed={()=> props.removeIngredient(igKey)} />
		});
	return (
		<div className="BuildControls">
			<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
			{buildControls}
			<button 
				className="OrderButton" 
				disabled={!props.purchaseable}
				onClick={props.purchasing}>{props.isAuth ? 'Order Now' : 'Please sign in'}</button>
		</div>
	)
};

export default buildControls;