import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import '../../style/profile.css';
import AlreadyLogin from './AlreadyLogin.js';

class NotLoginYet extends Component{
	constructor(){
		super();
		this.state = {
			viewShow:false
		};
	}
	componentDidMount(){
		this.setState({
			viewShow:true
		});
	}
	render(){
		return(
			<div 
				className={this.state.viewShow?'viewshow':'view'}
			>
				<div className="profileHeader">
					<Link to="/" className="go_back"></Link>
					<Link to="/login" className="log_in">立即登录</Link>
				</div>
				<div className="log_con">
					<div>我的消息</div>
					<div>我的收藏</div>
					<div>无图模式</div>
				</div>		
			</div>
		);
	}
}

const Profile = () => {

	let USER = JSON.parse(localStorage.getItem("user"));
	if(USER){
		return <AlreadyLogin />;
	}else{
		return <NotLoginYet />;
	}

}

export default Profile;