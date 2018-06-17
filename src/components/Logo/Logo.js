import React from 'react';
import Logo from '../../assets/images/burger-logo.png';
import './Logo.css';

const logo = (props) => (
	<div className="Logo">
		<img src={Logo} alt="burger-logo"/>
	</div>
);

export default logo;