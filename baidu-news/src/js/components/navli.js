import React,{Component} from 'react';
import '../../style/nav.css';

class NavLi extends Component{

	changeSelected = (e) => {
		if(e.target.tagName==="A"){
			this.props.changeSelected(
				this.props.id,
				e.target.parentNode.offsetWidth,
				this.props.data.title
			);
		}
	}

	render(){
		return(
			<li 
				onClick={this.changeSelected}
			>
				<a
					className={this.props.data.checked?"selected":""}>
					{this.props.data.title}
				</a>
			</li>
		);
	}
	
}

export default NavLi;