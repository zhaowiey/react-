import React,{Component} from 'react';

import '../../style/header.css';

import {Link} from 'react-router-dom';

class Header extends Component{
	render(){
		return(
			<div className="header">
				<div className="left_box">
					<a href="https://m.baidu.com"></a>
					<Link to='profile'></Link>
				</div>
				<div className="right_box">
					<Link to="/searchpage"></Link>
					<Link to="/manage"></Link>
				</div>				
			</div>
		);
	}
}

export default Header;