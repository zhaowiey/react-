import React from 'react';

class SearchListLi extends React.Component{

	constructor(props){
		super(props);
		this.state =  {
			checked:false
		};
	}

	change = () => {
		//console.log(this.state.checked);
		this.setState({
			checked : !this.state.checked
		});
		// console.log(this.state.checked);
		this.props.detectFn(this.props.title,!this.state.checked);
	}

	render(){

		//console.log(this.state.checked);

		return(
			<div>
				{ this.props.title }
				<span 
					className={ this.state.checked?'bg_2':'' }
					onClick = { this.change }
				>
				</span>
			</div>
		);
	}
}

export default SearchListLi;