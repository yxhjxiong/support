class Pools {
    private static _pools: any = {};

    /**
     * 注册对象池
     * @param objectClass 
     * @param poolClass 
     * @param keepSize 
     */
    public static registerPool(objectClass: any, poolClass: any = PoolBase, keepSize: number = 5): void {
        if (!objectClass || !poolClass) return;
        const poolName = egret.getQualifiedClassName(objectClass);
        if (this._pools[poolName]) return;
        this._pools[poolName] = new poolClass(objectClass, keepSize);
    }

    /**
     * 获取对象池
     * @param objectClass 
     */
    public static getPool(objectClass: any): PoolBase {
        if (!objectClass) return null;
        const poolName = egret.getQualifiedClassName(objectClass);
        if (!this._pools[poolName]) {
            this._pools[poolName] = new PoolBase(objectClass);
        }
        return this._pools[poolName];
    }

    /**
     * 返回池对象
     * @param item 
     */
    public static returnItem(item: IPoolable): Boolean {
        var pool: PoolBase = this.getPool(item);
        if (pool == null) {
            // Debug.log("Pool Not find！  name={0}", poolName);
            return false;
        }
        return pool.relaseObject(item);
    }

    /**
     * 获取池对象
     * @param objectClass 
     */
    public static borrowItem(objectClass: any, ...params): IPoolable {
        var pool: PoolBase = this.getPool(objectClass);
        if (pool == null) {
            // Debug.log("Pool Not find！  name={0}", poolName);
            return null;
        }
        return pool.requestObject.apply(pool, params);
    }

    /**
     * 销毁指定对象池
     * @param objectClass 
     */
    public static disposePool(objectClass: any): void {
        if (!objectClass) return;

        const poolName = egret.getQualifiedClassName(objectClass);
        let pool = this._pools[poolName];

        delete this._pools[poolName];

        if (!pool) return;
        pool.dispose();
        pool = null;
    }

    /**
     * 销毁所有对象池
     */
    public static disposeAll(): void {
        let self = this;
        for (let key in self._pools) {
            let pool = self._pools[key];
            delete self._pools[key];
            if (!pool) continue;
            pool.dispose();
            pool = null;
        }
    }
}