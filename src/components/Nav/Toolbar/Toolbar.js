import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import Nav from '../NavItems/NavItems';

const toolbar = (props) => {
	return (
		<header className="Toolbar">
			<div className="DrawerToggle" onClick={props.toggleSideDrawer}>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div className="Toolbar-logo">
				<Logo />
			</div>
			<nav className="DeskTopOnly">
				<Nav menu={props.menu}/>
			</nav>
		</header>
	);
};

export default toolbar;