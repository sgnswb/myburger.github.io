import React from 'react';
import './NavItem.css';
import { NavLink } from 'react-router-dom';

const navItem = (props) => {
	return (
		<li className="NavItem">
			<NavLink 
				exact
				to={props.link}
				activeClassName="active">{props.item}</NavLink>
		</li>
	);
};

export default navItem;