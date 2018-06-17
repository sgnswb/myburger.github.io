import React from 'react';
import './BuildControl.css';

const buildControl = (props) => {
	let lessBtn = null;
		if (props.count > 0) {
			lessBtn = <button className="Less" onClick={props.removed}> - </button>
		}else {
			lessBtn = <button className="Less" onClick={props.removed} disabled> - </button>
		}
	
	return (
		<div className="BuildControl">
			<div className="Label">{props.label}</div>
			{lessBtn}
			<button className="More" onClick={props.added}> + </button>
		</div>
	)
};

export default buildControl;