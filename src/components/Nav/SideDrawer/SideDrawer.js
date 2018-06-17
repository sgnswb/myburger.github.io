import React from 'react';
import './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavItems from '../../Nav/NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
	let toggleSideDrawer = null;
	if (props.show) {
		toggleSideDrawer = "SideDrawer Open"
	}else {
		toggleSideDrawer = "SideDrawer Close"
	}
	return (
		<React.Fragment>
			<Backdrop show={props.show} clicked={props.toggleSideDrawer}/>
			<div className={toggleSideDrawer}>
				<div className="SideDrawer-logo">
					<Logo />
				</div>
				<nav>
					<NavItems menu={props.menu}/>
				</nav>
			</div>
		</React.Fragment>
	);
};

export default sideDrawer;