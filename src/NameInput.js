import React from "react";
import Rx from "rxjs";
import pubSub from "./pub-sub.js";

class Nameinput extends React.Component {
	constructor (props) {
		super(props);
		this.state = Object.assign({
			value:''
		},{
			value:this.props.user.value
		})
	}
	componentWillUnmount(){

	}
	handleChange(actionType,e) {
		pubSub.dispatch({
			type:actionType,
			text:e.target.value
		})
	}
	render() {
		return <from>
			<input ref="textInput" onChange={this.handleChange.bind(this,"UP_SUMMARY")}/><br/>
			<input ref="textInput1" onChange={this.handleChange.bind(this,"UP_TEXT")}/>
		</from>
	}
}
export default Nameinput;