import React from "react";
import ReactDOM from "react-dom";
import User from "./User.js";
import pubSub from "./pub-sub.js";
import reducers from "./reducer.js";

const store$ = pubSub.createStore(reducers,{
	user:{
		name:"刘明仁",
		age:"27",
		avatar:"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
		summary:"user summary",
		text:"text"
	},
	person:{}
});
const store = store$.getValue();
const render = () => {
	ReactDOM.render( 
		<User store={store}/>,
		document.getElementById("root")
	)
}

store$.subscribe(render)