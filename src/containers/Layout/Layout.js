import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Layout.css';

import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import SideDrawer from '../../components/Nav/SideDrawer/SideDrawer';


class Layout extends Component {
	state = {
		menu: [
			{
				name: 'Burger Builder',
				link: '/',
				show: true
			},
			{
				name: 'Orders',
				link: '/orders',
				show: false
			},
			{
				name: 'Sign in',
				link: '/auth',
				show: true
			} 
		],
		toggleSideDrawer: false
	}

	componentDidUpdate () {
		let updateMenu = [...this.state.menu];
		updateMenu.splice(2, 1, {
			name: 'Logout',
			link: '/logout',
			show: true
		});
		updateMenu.splice(1, 1, {
			name: 'Orders',
			link: '/orders',
			show: true
		});
		let resetMenu = [...this.state.menu];
		resetMenu.splice(2, 1, {
			name: 'Sign in',
			link: '/auth',
			show: true
		});
		resetMenu.splice(1, 1, {
			name: 'Orders',
			link: '/orders',
			show: false
		});
		if (this.props.isAuthenticated) {
			if (this.state.menu[2].name !== updateMenu[2].name) {
				this.setState({menu: updateMenu});
			}
		}else {
			if (this.state.menu[2].name !== resetMenu[2].name) {
				this.setState({menu: resetMenu});
			}
		}
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

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);