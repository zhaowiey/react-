import React,{Component} from 'react';

import Header from './header.js';

import Nav from './nav.js';

import '../../style/news_category.css';

import $ from 'jquery';

import '../../style/SearchPage.css';

import Slider from './slider.js';

import { DATA as slides } from '../data/bannermap.js';

import loading from '../../images/loading.jpg';

class App extends Component{

	constructor(){
		super();
		this.state = {
			category:'',
			loadMore:false,
			num:10
		};
	}

	getKeyWord = (str) => {
		this.loading.style.display="block";
		this.view.scrollIntoView();
		if(str==='推荐'){
			this.setState({
				category:'头条',
				num:10,
				loadMore:true
			});			
		}else{
			this.setState({
				category:str,
				num:10,
				loadMore:true
			});			
		}
		setTimeout(function(){
			this.loading.style.display="none";
		},2000)		
	}

	componentDidMount(){
		this.setState({
			category:'头条',
			loadMore:true
		});
	}

	goTop = () => {
		this.view.scrollIntoView();
	}

	loadMoreFn = () => {
		this.loading.style.display="block";
		const that = this;
		let number = this.state.num+10;
		if(number>40){		
			return;
		}
		if(number==40){
			this.setState({
				loadMore:false
			});				
		}
		this.setState({
			num:number
		});
		setTimeout(function(){
			this.loading.style.display="none";
		},2000)
	}	

	render(){
		
		const that = this;
		if(that.state.category){
			$.ajax({
				url:'http://api.jisuapi.com/news/get?appkey=b78a2fc7172f206a',
				dataType:'jsonp',
				data:{
					 channel:that.state.category,
					 start:0,
					 num:this.state.num
				},
				success:function(data){
					let list = data.result.list;
					let html = '';
					if(that.state.category==='头条'){
						list.forEach(function(e){
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
														${e.src.substr(0,4)}
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
					}else{
						if(list){
							list.forEach(function(e){
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
													${e.time.substr(0,9)}
													<span class="src">
														${e.src.substr(0,4)}
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
						}else{
							html = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;没有该频道相关新闻';
						}
					}
					if(that.news){
						that.news.innerHTML = html;
					}
				}
			});		
		}

		let s = slides[this.state.category] || slides['error'];

		return(
			<div ref={(el)=>{this.view=el}}>
				<Header></Header>
				<Nav getKeyWord={this.getKeyWord}></Nav>
				<div className="marginTopDiv"></div>
				< Slider slides= {s} time="2000"/ >
				<div 
					ref={(el)=>{this.news=el}}
					className="news_category"
				>
				</div>
				<div 
					className='goTop'
					onClick={this.goTop}
				>
				</div>
				<div 
					className={this.state.loadMore?'loadMore':'loadMoreHide'}
					onClick={this.loadMoreFn}
					ref={(el)=>{this.addmore=el}}
				>
					点击加载更多
				</div>
				<div id="loading" ref={(el)=>{this.loading=el}}>
				</div>			
			</div>
		);
	}
}

export default App;
