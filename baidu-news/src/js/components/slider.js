import React from 'react';

import "../../style/slider.css";

class Slide extends React.Component{

  constructor(){
    super()
    this.state={
      startX:"",
      startY:"",
      endX:"",
      endY:""
    }
  }

  GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短
    if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }
    var angle = this.GetSlideAngle(dx, dy);
    if(angle >= -45 && angle < 45) {
        result = 4;
    }else if (angle >= 45 && angle < 135) {
        result = 1;
    }else if (angle >= -135 && angle < -45) {
        result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }
    return result;
  }

  render(){
    var background = this.props.background;
    var link = this.props.link;
    var active = this.props.active;
    var slideStyle = {
        backgroundImage: "url(" + background + ")"
    };
    return(

      <a href={link}>
        <div className="slider__slide" data-active={active} style={slideStyle}>
			<span 
				className="goleft"
			></span>
        </div>
      </a>

    )
  }

}


export default class Slider extends React.Component{
  constructor(){
    super()
    this.state={
      activeSlide: 0,
      this:this
    }
  }
  nextSlide(){
    var slide = this.state.activeSlide + 1 < this.props.slides.length ? this.state.activeSlide + 1 : 0;
    this.setState({
        activeSlide: slide
    });
  }
  componentDidMount(){
    setInterval(()=>{
    	this.nextSlide();
    },this.props.time);
  }

  render(){
    var _this = this;
    var slides = this.props.slides;
    var slide=slides.map(function(slide, index, array){
      return(
        <Slide 
        	background={slide.background } 
        	active={index === _this.state.activeSlide} 
        	link={slide.link} 
        	key={index} 
        	this={_this}
        />
      )
    });
    return(
      <div className="slider">
      	{slide}
      </div>
    )
  }

}