import React from 'react';

class ManageLi extends React.Component{

	delLS = (e) => {
		let arr = JSON.parse(localStorage.getItem("navData"));
		let list = null;
		list = Object.assign(arr);
		let index = 0;
		for(var i=0;i<list.length;i++){
			if(list[i].title === e.target.parentNode.innerText){
				index = i;
				break;
			}
		}
		list.splice(index,1);
		localStorage.setItem("navData", JSON.stringify(list));
		this.props.setLS(list);
	}

	render(){
		return(
			<div className="sec">
				<div>
					<span 
						className="del"
						onClick={this.delLS}
					></span>
					{ this.props.title }
				</div>
			</div>
		);
	}
}

export default ManageLi;