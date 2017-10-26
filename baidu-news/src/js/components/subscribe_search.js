import React from 'react';

import '../../style/subscribe_search.css';

import {Link} from 'react-router-dom';

import $ from 'jquery';

import SearchListLi from './searchListLi.js';

class SubscribeSearch extends React.Component{

	constructor(){
		super();
		this.state = {
			value:'',
			array:[]
		};
	}

	changeValue = (e) => {
		this.setState({
			value:e.target.value
		});
		const that = this;
		$.ajax({
			url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?',
			dataType:'jsonp',
			data:{
				 wd:e.target.value,
				 cd:'fn'
			},
			success:function(data){
				if(data.q){
					that.searchWhat.innerText = '搜索 ' + data.q + ' 的相关新闻';
				}else{
					that.searchWhat.innerText = '';
				}
				that.setState({
					array:data.s
				});
				//console.log(data);
			}
		});		
	}

	//检测频道订阅
	detectFn = ( str, boolean ) => {
		let list = JSON.parse(localStorage.getItem("navData"));
		if(boolean){
			let onoff = false;
			for(var i=0;i<list.length;i++){
				if( list[i].title === str ){
					onoff = true;
					break;
				}
			}
			if(!onoff){
				let json = {
					title:str,
					checked:false
				};
				list.push(json);
			}
		}else{
			let index = 0;
			for(var k=0;k < list.length; k++){
				if( list[k].title === str ){
					index = k;
					break;
				}
			}
			list.splice(index,1);			
		}
		//console.log(list);
		localStorage.setItem("navData", JSON.stringify(list));
	}

	render(){

		let newArray = null;
		let { array } = this.state;
		newArray = Object.assign(array);
		//console.log(newArray);
		let result = null;
		result = newArray.map((e,i)=>{
			let json = {
				key:i,
				title:e,
				checked:false,
				detectFn:this.detectFn
			};
			return <SearchListLi {...json}/>;
		});		

		return(
			<div>
				<div className='ssHeader'>
					<Link to="/" className="goBack"></Link>
					<div className="title">搜索订阅</div>
					<Link to="/manage" className="done">完成</Link>
				</div>

				<div className="ssSearch">
					<div className="ssCon">
						<span></span>
						<input 
							placeholder="搜索任意关键词即可订阅"
							type="search"
							value={ this.state.value }
							onChange = { this.changeValue } 
						/>
					</div>
				</div>

				<div 
					className="searchW"
					ref={(el)=>{this.searchWhat=el}}
				>
				</div>

				<div 
					className="searchList"
					ref={(el)=>{this.searchList=el}}
				>
					{ result }
				</div>
			</div>
		);
	}
}

export default SubscribeSearch;