import React, { Component } from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	shouldComponentUpdate ( nextProps, nextState ) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	render () {
		return (
			<React.Fragment>
				<Backdrop show={this.props.show} clicked={this.props.modalClose}/>
				<div 
					className="Modal"
					style={{
						display: this.props.show ? 'block' : 'none'
					}}>
					{this.props.children}
				</div>
			</React.Fragment>
		)
	}
};

export default Modal;