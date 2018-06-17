import React from 'react';
import NavItem from './NavItem/NavItem';
import './NavItems.css';

const navItems = (props) => {
	let navItems = props.menu.map((navItem, index) => {
		return <NavItem item={navItem.name} link={navItem.link} active={navItem.active} key={index} />;
	});
	return (
		<ul className="NavItems">
			{navItems}
		</ul>
	);
};

export default navItems;