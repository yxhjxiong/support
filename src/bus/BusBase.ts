/**
 * 总线基类
 * @author zx
 */
class BusBase implements IBus {

	protected _callbackDic: any = {};

	public constructor() {
		return;
	}

	/**
	 * 增加特定回调.
	 * @param key 回调所绑定的特殊健
	 * @param callback 回调函数
	 * @param callobj 回调对象
	 */
	public addCallback(key: any, callback: Function, callobj: any, ...params): void {
		var callbackList: any[] = this.getCallbackList(key);
		if (null == callbackList) {
			callbackList = [];
			this._callbackDic[key] = callbackList;
		}
		callbackList.push({ callback, callobj, params });

	}

	/**
	 * 移除特定回调
	 * @param key 回调所绑定的特殊健
	 * @param callback 回调函数
	 */
	public removeCallback(key: any, callback: Function, callobj: any): void {
		var callbackList: any[] = this.getCallbackList(key);
		if (null == callbackList) return;

		let len = callbackList.length;
		for (let i = len - 1; i >= 0; i--) {
			if (callbackList[i].callback == callback && callbackList[i].callobj == callobj) {
				callbackList.splice(i, 1);
			}
		}
		if (callbackList.length == 0) {
			this._callbackDic[key] = null;
			delete this._callbackDic[key];
		}
	}

	/**
	 * 移除对象所有回调
	 */
	public removeAllCallBack(callobj: any):void{
		let self = this;
		for(let key in self._callbackDic){
			var callbackList: any[] = self._callbackDic[key];
			let len = callbackList.length;
			for (let i = len - 1; i >= 0; i--) {
				if (callbackList[i].callobj == callobj) {
					callbackList.splice(i, 1);
				}
			}
			if (callbackList.length == 0) {
				self._callbackDic[key] = null;
				delete self._callbackDic[key];
			}
		}
	}

	/**
	 * 唤起回调函数
	 */
	public riseCallback(key: any, ...args): void {
		var callbackList: any[] = this.getCallbackList(key);
		if (null == callbackList) return;

		callbackList = callbackList.slice();
		let len = callbackList.length;
		for (let i = 0; i < len; i++) {
			let callback: Function = callbackList[i].callback;
			let callobj: any = callbackList[i].callobj;
			let params: any[] = callbackList[i].params;
			if (!callback || !callobj) continue;
			if (params) {
				callback.apply(callobj, params.concat(args));
			} else {
				callback.apply(callobj, args);
			}
		}
	}

	/**
	 * 取得回调函数列表.
	 */
	public getCallbackList(key: any): any[] {
		return this._callbackDic[key];
	}
}