import React,{Component} from 'react';
import {
	Link
} from 'react-router-dom';
import '../../style/manage.css';
import NewsPaper from '../components/newspaper.js';

class Manage extends Component{

	constructor(){
		super();
		this.state = {
			data:[
				{con:"央视网",checked:false,id:1},
				{con:"观察",checked:false,id:2},
				{con:"经济报",checked:false,id:3},
				{con:"时尚网",checked:false,id:4},
				{con:"读者",checked:false,id:5}
			],
			viewShow:false
		};
	}

	selectFn = (id) => {
		let list = null;
		let data = JSON.parse(localStorage.getItem("newspaper")) || [];
		list = Object.assign(data);
		list.forEach((e) => {
			if(e.id===id){
				e.checked = !e.checked;
			}
		});
		localStorage.setItem("newspaper", JSON.stringify(list));
		this.setState({
			data:list
		});
	}

	setLocalStorage = () => {
		let list = null;
		let data = JSON.parse(localStorage.getItem("newspaper"));
		list = Object.assign(data);
		let list2 = list.filter( (e) => {
			return e.checked === true;
		} );
		list2 = list2 || [];
		let list3 = list.filter( (e) => {
			return e.checked === false;
		} );
		list3 = list3 || [];
		//console.log(list2);//选中的
		//console.log(list3);//未选中的
		let navData = JSON.parse(localStorage.getItem("navData")) || [];
		list2.forEach((e)=>{
			let json = {
				title:e.con,
				checked:false
			};
			navData.push(json);
		});
		//console.log( navData );
		localStorage.setItem("newspaper", JSON.stringify(list3));
		localStorage.setItem("navData", JSON.stringify(navData));
	}

	componentDidMount(){
		//console.log('componentDidMount');
		this.setState({
			viewShow:true
		});
	}	

	render(){

		if(!localStorage.getItem("newspaper")){
			localStorage.setItem("newspaper", JSON.stringify(this.state.data));
		}
		let data = JSON.parse(localStorage.getItem("newspaper"));

		let list = null;
		list = Object.assign(data);
		let result = null;
		result = list.map((e,i)=>{
			let json = {
				data:e,
				key:i,
				selectFn:this.selectFn
			};
			return <NewsPaper {...json}/>;
		});		

		return(
			<div className={this.state.viewShow?'viewshow2':'view2'}>
				<div className='manageHeader'>
					<Link 
						to="/"
						onClick={this.setLocalStorage}
					></Link>
					<span>订阅中心</span>
				</div>
				
				<div className="manageSearch">
					<Link to="/subscribe/search">
						<span className="span1"></span>
						<span className="span2">搜索任意关键字即可订阅</span>
					</Link>
				</div>

				<div className="manageBody">
					{ result }
				</div>

				<div className="govern">
					<Link to="/subscribe/manage">管理我的订阅</Link>
				</div>
			</div>
		);
	}
}

export default Manage;