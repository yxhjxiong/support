module support
{
	/**
	 * 事件总线
	 * @author zx
	 */
	export class EventBus extends BusBase
	{
		public constructor()
		{
			super();
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
