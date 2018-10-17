module support
{
	/**
	 * 池对象
	 * @author zx
	 */
	export class Poolable implements IPoolable
	{
		
		public constructor() 
		{
			return;
		}
		
		public initPoolable(...params):void
		{
			
		}
		
		public resetPoolable():void
		{
			
		}
		
		private _poolIndex:number;
		public setPoolIndex(value:number):void
		{
			if (this._poolIndex > 0)		return;
			this._poolIndex = value;
		}
		public getPoolIndex():number
		{
			return this._poolIndex;
		}

		public dispose():void{

		}
		
	}

}