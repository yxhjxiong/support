module support
{
	/**
	 * 总线基类
	 * @author zx
	 */
	export class BusBase implements IBus
	{
		protected static _instance:IBus;
		protected static _allowInstance:Boolean;
		
		private _callbackDic:any = {};

		public constructor()
        {
			return;
		}

		/**
		 * 增加特定回调.
		 * @param key 回调所绑定的特殊健
		 * @param callback 回调函数
		 * @param callobj 回调对象
		 */
		public addCallback(key:any, callback:Function, callobj:any):void
		{
			var callbackList:any[] = this.getCallbackList(key);
			if (null == callbackList)
			{
				callbackList = [];
				this._callbackDic[key] = callbackList;
			}
			callbackList.push({callback, callobj});

		}

		/**
		 * 移除特定回调
		 * @param key 回调所绑定的特殊健
		 * @param callback 回调函数
		 */
		public removeCallback(key:any, callback:Function):void
		{
			var callbackList:any[] = this.getCallbackList(key);
			if (null == callbackList)	return;

			let len = callbackList.length;
			for(let i = 0; i < len; i++)
			{
				if(callbackList[i].callback == callback)
				{
					callbackList.splice(i, 1);
					break;
				}
			}
			if (callbackList.length == 0)
			{
				this._callbackDic[key] = null;
				delete this._callbackDic[key];
			}
		}

		/**
		 * 唤起回调函数
		 */
		public riseCallback(key:any, ...args):void
		{
			var callbackList:any[] = this.getCallbackList(key);
			if (null == callbackList)	return;
			
			callbackList = callbackList.slice();
			let len = callbackList.length;
			for(let i = 0; i < len; i++)
			{
				let callback:Function = callbackList[i].callback;
				let callobj:any = callbackList[i].callobj;
				if(!callback || callobj)	continue;
				callback.apply(callobj, args);
			}
		}

		/**
		 * 取得回调函数列表.
		 */
		public getCallbackList(key:any):any[]
		{
			return this._callbackDic[key];
		}
	}
}
