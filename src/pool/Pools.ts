module support
{
	export class Pools
	{
		private static _isAllowInstance:Boolean;
		private static _instance:Pools;
		
		private _pools:any = {};
		
		public constructor()
		{
			if (!Pools._isAllowInstance)
			{
				throw new egret.error("Can not instance Pools");
			}
		}
		
		public static getInstance():Pools
		{
			if (!this._instance)
			{
				this._isAllowInstance = true;
				this._instance = new Pools();
				this._isAllowInstance = false;
			}
			
			return this._instance;
        }
        
        /**
         * 注册对象池
         * @param objectClass 
         * @param poolClass 
         * @param keepSize 
         */
        public registerPool(objectClass:any, poolClass:any = PoolBase, keepSize:number = 5):void
        {
            if(!objectClass || !poolClass)    return;
            const poolName = egret.getQualifiedClassName(objectClass);
            if(this._pools[poolName])       return;
            this._pools[poolName] = new poolClass(objectClass, keepSize);
        }
        
        /**
         * 获取对象池
         * @param objectClass 
         */
        public getPool(objectClass:any):PoolBase
        {
            if(!objectClass)    return null;
            const poolName = egret.getQualifiedClassName(objectClass);
            if(!this._pools[poolName])
            {
                this._pools[poolName] = new PoolBase(objectClass);
            }
            return this._pools[poolName];
        }
        
        public returnItem(item:IPoolable):Boolean
        {
            var pool:PoolBase = this.getPool(item);
            if(pool == null)
            {
                // Debug.log("Pool Not find！  name={0}", poolName);
                return false;
            }
            return pool.relaseObject(item);
        }
        
        public borrowItem(objectClass:any, ...params):IPoolable
        {
            var pool:PoolBase = this.getPool(objectClass);
            if(pool == null)
            {
                // Debug.log("Pool Not find！  name={0}", poolName);
                return null;
            }
            return pool.requestObject.apply(pool, params);
        }
        
        public disposePool(objectClass:any):void
        {
            if(!objectClass)    return;
            
            const poolName = egret.getQualifiedClassName(objectClass);
            let pool =  this._pools[poolName];

            delete this._pools[poolName];
            
            if(!pool)       return;
            pool.dispose();
            pool = null;
        }
    }
}