import React from 'react';
import NavItem from './NavItem/NavItem';
import './NavItems.css';

const navItems = (props) => {
	let navItems = props.menu.map((navItem, index) => {
		return (navItem.show ? <NavItem item={navItem.name} link={navItem.link} key={index} /> : null);
	});
	return (
		<ul className="NavItems">
			{navItems}
		</ul>
	);
};

export default navItems;