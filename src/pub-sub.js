import propTypes from "prop-types";
import Rx from "rxjs";

class PubSub {
	constructor() {
		this.action$ = new Rx.Subject();
		this.state$ = new Rx.BehaviorSubject({});
		this.subject = new Rx.Subject();
	}
	/**
	 * 生成store
	 * @param  {function} reducers reducer集合
	 * @param  {object} initState 初始state
	 */
	createStore(reducers = () => {}, initState = {}) {
		// 根据reducers生成新的处理数据流
		this.action$
			.map(action => {
				return [reducers(this.state$.getValue(),action),action]
			})//根据action从reducers返回处理函数
			// 处理数据
			.scan((state, [cbReducer,action] ) => {
				if(typeof cbReducer === "object") {
					Object.keys(cbReducer).forEach((key) => {
						typeof cbReducer[key] === "function" && cbReducer[key](state[key] || {})
					})
				}else if(typeof cbReducer === "function") {
					cbReducer(state);
				}
				return state
			}, initState)
			.startWith(initState)//合并初始状态
			.subscribe(this.state$);

		return this.state$
	}

	dispatch(action) {
		this.action$.next(action);
	}

	// 合并reducers
	combineReducers(reducers = {}) {
		const finalReducers = Object.keys(reducers).reduce((result, key) => {
			if (typeof reducers[key] === 'function') {
				result[key] = reducers[key];
			} else {
				throw new Error(`reducer '${key}'不是一个function.`);
			}
			return result;
		}, {});

		return (state = {}, action) => {
			return Object.keys(finalReducers).reduce((result, key) => {
				result[key] = finalReducers[key](state[key],action);
				return result;
			}, {});
		}; 
	}

	//获得当前action对应的subject
	getCurrSubject(scope, actionType) {
		return this.subject.filter((action = {}) => {
			return action.type === actionType
		});
	}
	// 发布
	emit(scope, action = null) {
		if (!action || action.type === void 0) return;//如果action为空返回
		// 触发action
		this.getCurrSubject(scope, action.type).next(action);
	}
	// 订阅
	subscribe(scope, actionType, observer = () => { }) {
		return this.getCurrSubject(scope, actionType).subscribe(observer);
	}
	unsubscribe(subscription) {
		subscription.unsubscribe();
	}


	// 以下为试验性方法
	createAction() {
		return new Rx.Subject();
	}
	createActions(actionNames) {
		return actionNames.reduce((akk, name) => (Object.assign(akk, {
			[name]: this.createAction()
		})), {});
	}


	createState(reducer$, initialState$ = Rx.Observable.of({})) {
		return initialState$
			.merge(reducer$)
			.scan((state, [scope, reducer]) => {
				Object.assign(state, {
					[scope]: reducer(state[scope])
				})
			}
			)
			.publishReplay(1)
			.refCount();
	}
}
export default new PubSub()