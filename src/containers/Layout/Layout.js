import React, { Component } from 'react';
import './Layout.css';

import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import SideDrawer from '../../components/Nav/SideDrawer/SideDrawer';


class Layout extends Component {
	state = {
		menu: [
			{
				name: 'Burger Builder',
				link: '/',
				active: true,
			},
			{
				name: 'Checkout',
				link: '/',
				active: false,
			} 
		],
		toggleSideDrawer: false
	}

	toggleSideDrawerHandler = () => {
		console.log('test');
		this.setState((prevState) => {
			return {
				toggleSideDrawer: !prevState.toggleSideDrawer
			}
		});
	}

	render () {
		return (
			<React.Fragment>
				<Toolbar menu={this.state.menu} toggleSideDrawer={this.toggleSideDrawerHandler}/>
				<SideDrawer menu={this.state.menu} show={this.state.toggleSideDrawer} toggleSideDrawer={this.toggleSideDrawerHandler}/>
				<main className="layout-container">
					{this.props.children}
				</main>
			</React.Fragment>
		);
	}
};

export default Layout;