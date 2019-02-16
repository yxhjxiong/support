module support 
{
	/**
	  * 总线接口
	  * @author zx
	  */
	export interface IBus
	{
		addCallback(key: any, callback: Function, callobj: any, ...params): void;

		removeCallback(key: any, callback: Function, callobj: any): void;

		riseCallback(key:any, ...args):void;

		getCallbackList(key:any):any[];
	}

}
