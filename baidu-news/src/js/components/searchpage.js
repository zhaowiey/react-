import React,{Component} from 'react';

import {Link} from 'react-router-dom';

import '../../style/SearchPage.css';

import $ from "jquery";

class SearchPage extends Component{

	constructor(){
		super();
		this.state = {
			loadingHide:false,
			viewShow:false
		};
	}
	//搜索新闻
	searchNews = () => {
		const that = this;
		if(that.search.value){
			$.ajax({
				url:'http://api.jisuapi.com/news/search?appkey=b78a2fc7172f206a',
				dataType:'jsonp',
				data:{
					 keyword:this.search.value
				},
				success:function(data){
					let html = '';
					//console.log(data);	
					that.setState({
						loadingHide:true
					});
					data.result.list.forEach(function(e){
						if(e.pic){
							html += `
								<div class="list">
									<a href="${e.url}">
										<img  src="${e.pic}"/>
										<div class="top">
											<span>
												${e.title.substr(0,23)}
											</span>
										</div>
										<div class="bottom">
											${e.time}
											<span class="src">
												${e.src.substr(0,4)+'..'}
											</span>
										</div>
									</a>
								</div>						
							`;
							}else{
							html +=`
								<div class="list2">
									<a href="${e.url}">
										<div class="top2">
											<span>
												${e.title.substr(0,26)}
											</span>
										</div>
										<div class="bottom2">
											${e.time}
											<span class="src">${e.src}</span>
										</div>
									</a>
								</div>
							`;
							}					
					});	
					that.newsBox.innerHTML = html;
					that.newsLength.innerHTML = `找到相关新闻${data.result.num}条`;
				}
			});	
		}
	}

	componentDidMount(){
		this.setState({
			viewShow:true
		});
	}	

	goTop = () => {
		//ReactDom.findDOMNode(this).scrollIntoView();
		//ReactDom.findDOMNode(this).scrollTop = 0;
		this.view.scrollIntoView();
	}

	render(){

		return(
			<div 
				className={this.state.viewShow?'viewshow':'view'}
				ref={(el)=>{this.view=el}}
			>
				<div className="searchHeader">
					<Link to="/"></Link>
					<span>搜新闻</span>
				</div>
				<div className="searchBox_Box">
					<div className="searchBox">
						<input type="search" ref={(el)=>{this.search=el}} />
						<span onClick={this.searchNews} >百度一下</span>
					</div>
				</div>
				<div 
					className="result_num"
					ref={(el)=>{this.newsLength=el}}>
				</div>
				<div 
					className="newsBox"
					ref={(el)=>{this.newsBox=el}}>
				</div>

				<div 
					className={this.state.loadingHide?'loading_hide':'loading'}
				>
					<div className="loading_logo"></div>
					<div className="loading_anim"></div>
				</div>	

				<div 
					className='goTop'
					onClick={this.goTop}
					ref={(el)=>{this.goTopEle=el}}
				>
				</div>

			</div>
		);
	}
}

export default SearchPage;




