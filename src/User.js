import React from "react";
import propTypes from "prop-types";
import Nameinput,{Observable} from "./NameInput.js";
import Rx from "rxjs";
import pubSub from "./pub-sub.js"

const Avatar = (props) => {
	return <img src={props.user.avatar} />
}

class Text extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.state = {
			date:new Date(),
			text:'default Text text'
		}

		// pubSub.subscribe("app","up text1",(x)=>{
		// 	this.upText(x.value)
		// })
		
	}

	componentDidMount() {
		setTimeout(() => this.setState({
			date:new Date("1990-4-14")
		}),500)
  	}
	formatTime() {
		return this.state.date.getFullYear() + "-" + (this.state.date.getMonth()+1) + "-" + this.state.date.getDate()
	}
	upText(value) {
		this.setState({
			text:value
		})
	}
	render(){
		return <article ref="aaa">
			<h1>hello,{this.props.user.name},your age is {this.props.user.age}.</h1>
			{this.formatTime()}<br/>
			user:<br/>
			summary:{this.props.user.summary} <br/>
			text:{this.props.user.text}<br/>
			person:<br/>
			summary:{this.props.person.summary} <br/>
			text:{this.props.person.text}
		</article>
	}
}


class User extends React.Component {
	constructor (props) {
		super(props);

		// this.subscription = pubSub.subscribe("app","up text",(x)=>{
		// 	this.upText(x.value)});
	}

	componentWillUnmount(){
		// pubSub.unsubscription(this.subscription);
	}

	upText(value) {
		this.setState({
			summary:value
		})
	}
	render(){
		return (
			<div>
				<Avatar {...this.props.store} />
				<Text {...this.props.store} />
				<Nameinput {...this.props.store} />
			</div>
		)
	}
}
export default User