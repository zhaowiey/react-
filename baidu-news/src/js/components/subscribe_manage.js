import React from 'react';

import '../../style/subscribe_manage.css';

import {Link} from 'react-router-dom';

import ManageLi from './sm_li.js';

class SubscribeManage extends React.Component{

	constructor(){
		super();
		this.state = {
			navData:JSON.parse(localStorage.getItem("navData"))
		};
	}

	setLS = (arr) => {
		this.setState({
			navData:arr
		});
	}

	render(){

		let {navData} = this.state;
		const len = navData.length;
		let result = null;
		result = navData.map((e,i)=>{
			let json = {
				key:i,
				title:e.title,
				setLS:this.setLS
			};
			return <ManageLi {...json}/>;
		});					

		return(
			<div>
				<div className='smHeader'>
					<Link to="/" className="goBack"></Link>
					<div className="title">订阅管理</div>
					<Link to="/manage" className="done">完成</Link>
				</div>

				<div className="num">
					已有{len}个订阅
				</div>

				<section>
					{ result }
				</section>
			</div>
		);
	}

}

export default SubscribeManage;