import React,{Component} from 'react';

import '../../style/nav.css';

import NavLi from './navli.js';

import {Link} from 'react-router-dom';

class Nav extends Component{

	constructor(){
		super();
		this.state={
			navOnoff : false,
			navData : [
				{title:"推荐",checked:true},
				{title:"新闻",checked:false},
				{title:"财经",checked:false},
				{title:"体育",checked:false},
				{title:"娱乐",checked:false},
				{title:"教育",checked:false},
				{title:"军事",checked:false},
				{title:"科技",checked:false},
				{title:"NBA",checked:false},
				{title:"股票",checked:false},
				{title:"星座",checked:false},
				{title:"女性",checked:false},
				{title:"健康",checked:false},
				{title:"育儿",checked:false}		
			],
			ulLeft:0			
		};
	}

	changeNav = () => {
		this.setState({
			navOnoff:!this.state.navOnoff
		});
	}

	changeSelected = (id,w,str) => {
		this.view.scrollIntoView();
		//nav
		let list = null;
		let navData = JSON.parse(localStorage.getItem("navData"));
		//console.log(navData);
		list = Object.assign(navData);
		list.forEach((e,i)=>{
			e.checked = false;
			if(i===id){
				e.checked = !e.checked;
			}
		});
		localStorage.setItem("navData", JSON.stringify(list));
		if(id>1){
			this.setState({
				navData : list,
				navOnoff:false,
				ulLeft:-id*w+(document.documentElement.offsetWidth-w)/2
			});			
		}else{
			this.setState({
				navData : list,
				navOnoff:false,
				ulLeft:0
			});			
		}
		//this.view.scrollIntoView();
		//渲染
		this.props.getKeyWord(str);
	}

	componentWillMount(){
		let list = null;
		let navData = JSON.parse(localStorage.getItem("navData"));
		if(navData){
			list = Object.assign(navData);
			list.forEach((e,i)=>{
				e.checked = false;
				if(i===0){
					e.checked = true;
				}			
			});
			localStorage.setItem("navData", JSON.stringify(list));
			this.setState({
				navData : list,
				ulLeft:0
			});
		}		
	}

	render(){

		let l = 0;
		if(!this.state.navOnoff){
			l = this.state.ulLeft;
		}
		//console.log(l);
		let ulStyle = {
			left:l+"px"
		};

		if(!localStorage.getItem("navData")){
			localStorage.setItem("navData", JSON.stringify(this.state.navData));
		}
		const navData = JSON.parse(localStorage.getItem("navData"));
		//console.log( navData );
		let list = null;
		list = navData.map((e,i)=>{
			let json = {
				key:i,
				id:i,
				data:e,
				changeSelected:this.changeSelected
			};
			return <NavLi {...json}/>;
		});		

		let navClass = this.state.navOnoff?'nav':'nav_b';

		return(
			<div 
				className={navClass}
				ref={(el)=>{this.view=el}}
			>
				<i 
					className={this.state.navOnoff?'i1':'i2'}
					onClick={this.changeNav}
				></i>
				<div className="title">切换栏目</div>

				<ul style={ulStyle}>
					{ list }
				</ul>

				<Link 
					className="del"
					to="/subscribe/manage"
				>
					管理我的订阅
				</Link>	
			</div>
		);
	}
}

export default Nav;