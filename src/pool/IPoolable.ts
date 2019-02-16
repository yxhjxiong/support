module support
{
	/**
	 * 可装载到对象池内的对象必须实现该接口,
	 * 注：接口内的方法都由对象池来调用,用户无需自行调用.
	 * @author zx
	 */
	export interface IPoolable extends IDispose, egret.IHashObject
	{
		/**
		 * 初始化对象池对象
		 * @param params 
		 */
		initPoolable(...params):void;
		
		/**
		 * 释放对象池对象
		 */
		resetPoolable():void;
	}
}