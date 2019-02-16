module support
{
	/**
	 * 事件总线
	 * @author zx
	 */
	export class EventBus extends BusBase
	{
		private static _instance:EventBus;
		private static _allowInstance:Boolean;

		public constructor()
		{
			super();
			
			if (!EventBus._allowInstance)
            {
                throw new egret.error("不能直接实例化EventBus类");
            }
		}

		public static instance():EventBus
		{
			if (!this._instance)
            {
                this._allowInstance = true;
                this._instance = new EventBus();
                this._allowInstance = false;
            }
            return this._instance;
		}
		
		/**
		 * 侦听事件
		 */
		public addEventListener(type: string, listener: Function, thisObject: any):void{
			if(!listener || !thisObject)	return;
			this.addCallback(type, listener, thisObject);
		}

		/**
		 * 移除侦听
		 */
		public removeEventListener(type: string, listener: Function, thisObject: any):void{
			if(!listener || !thisObject)	return;
			this.removeCallback(type, listener, thisObject);
		}

		/**
		 * 派发事件
		 */
		public dispatchEvent(type: string, ...args):void{
			if(!type)		return;
			this.riseCallback(type, ...args);
		}

	}
}
