import React,{Component} from 'react';

class NewsPaper extends Component{

	selectFn = () => {
		this.props.selectFn(this.props.data.id);
	}

	render(){
		return(
			<div>

				{ this.props.data.con }

				<span 
					className={this.props.data.checked?'bg2':'bg1'}
					onClick={this.selectFn}
				>
				</span>

			</div>			
		);
	};
}

export default NewsPaper;