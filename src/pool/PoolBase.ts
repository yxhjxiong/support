module support
{
	/**
	 * 对象池基类
	 * @author zx
	 */
	export class PoolBase implements IDispose
	{
		/** 对象池默认保留数量 */
		public static readonly DEFAULT_SIZE:number = 5;
		
		protected _poolName:String = null;
		
		protected _objectClass:any = null;
		
		protected _keepSize:number;

		protected _pool:IPoolable[] = [];
		
		protected _poolDic:any = {};

		protected _useingPool:any = {};
		
		protected _useingPoolNum:number = 0;
		
		protected _poolIndex:number = 1;

		/**
		 * 对象池构造函数
		 * @param ObjectClass:any 构建对象类名
		 * @param keepSize:number 对象池的保留容量
		 */
		public constructor(objectClass:any, keepSize:number = 5)
		{
			this._poolName = egret.getQualifiedClassName(objectClass);
			this._objectClass = objectClass;
			this._keepSize = keepSize;
		}

		/**
		 * 释放对象
		 * @param poolable
		 * @return ture 回收成功，false 回收失败
		 */		
		public relaseObject(poolable:IPoolable):Boolean
		{
			if (poolable == null)			return false;
			let poolName = egret.getQualifiedClassName(poolable);
			if (poolName != this._poolName)		return false;
			
			var key = this._poolName + String(poolable.getPoolIndex());
			if(this._useingPool[key] != null)
			{
				poolable.resetPoolable();
				
				delete this._useingPool[key];//在使用池内删除该对象
				this._useingPoolNum -= 1;
				
				if(this._poolDic[key] == null)
				{
					this._pool.push(poolable);//添加该对象到对象池
					this._poolDic[key] = true;
				}
				/*Debug.log("对象池释放资源成功  name={0}   key={1}", this._poolName, key);*/
				return true;
			}
			/*Debug.log("对象池释放资源失败  name={0}   key={1}", this._poolName, key);*/
			return false;
		}
		
		/**
		 * 请求对象,当对象准备完毕后会调用传递的回调函数.<br/>
		 * @param buildParams	初始化参数
		 * @return IPoolable
		 */		
		public requestObject(...params):IPoolable
		{
			var poolable:IPoolable;
			if(this._pool.length == 0)
			{
				poolable = new this._objectClass();
				poolable.setPoolIndex(this._poolIndex ++);
			}else
			{
				poolable = this._pool.pop();
			}
			
			var key = this._poolName + String(poolable.getPoolIndex());
			this._useingPool[key] = poolable;
			this._useingPoolNum += 1;
			
			delete this._poolDic[key];
			
			poolable.initPoolable.apply(poolable, params);
			
			return poolable;
		}

		/**
		 * 清空对象池（只会清理闲置对象，使用中的不会有影响）
		 */		
		public clearPool():void
		{
			while(this._pool.length > 0)
			{
				let poolable = this._pool.pop();
				let key = this._poolName + String(poolable.getPoolIndex());
				delete this._poolDic[key];
				poolable.dispose();
				poolable = null;
			}
		}
		
		/**
		 * 重置对象池容量为保留大小（只会清理闲置对象，使用中的不会有影响）
		 */		
		public resetPool():void
		{
			while(this._pool.length > 0 && this.currentSize > this.keepSize)
			{
				let poolable = this._pool.pop();
				let key = this._poolName + String(poolable.getPoolIndex());
				delete this._poolDic[key];
				poolable.dispose();
				poolable = null;
			}
		}
		
		/**
		 * 获取池内保留容量
		 * @return number
		 */
		public get keepSize():number
		{
			return this._keepSize;
		}

		/**
		 * 当前池内所有对象数量
		 * @return number
		 */
		public get currentSize():number
		{
			return this._pool.length + this._useingPoolNum;
		}

		/**
		 * 获取构建对象类名
		 * @return any
		 */
		public get objectClass():any
		{
			return this._objectClass;
		}
		
		public dispose():void
		{
			this._objectClass = null;
			
			for(let key in this._useingPool){
				this.relaseObject(this._useingPool[key]);
			}
			this._useingPool = null;
			this._useingPoolNum = 0;
			
			while(this._pool.length > 0)
			{
				let poolable = this._pool.pop();
				poolable.dispose();
				poolable = null;
			}
			for(let key in this._poolDic)
			{
				delete this._poolDic[key];
			}
			this._pool = null;
			this._poolDic = null;
		}
		
	}
}