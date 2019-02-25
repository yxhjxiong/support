/**
 * 对象池基类
 * @author zx
 */
class PoolBase implements IDispose {
	/** 对象池默认保留数量 */
	public static readonly DEFAULT_SIZE: number = 5;

	protected _poolName: String = null;

	protected _objectClass: any = null;

	protected _keepSize: number;

	protected _pool: IPoolable[] = [];

	protected _poolDic: any = {};

	protected _useingPool: any = {};

	protected _useingPoolNum: number = 0;

	protected _poolIndex: number = 1;

	/**
	 * 对象池构造函数
	 * @param ObjectClass:any 构建对象类名
	 * @param keepSize:number 对象池的保留容量
	 */
	public constructor(objectClass: any, keepSize: number = 5) {
		this._poolName = egret.getQualifiedClassName(objectClass);
		this._objectClass = objectClass;
		this._keepSize = keepSize;
	}

	/**
	 * 释放对象
	 * @param poolable
	 * @return ture 回收成功，false 回收失败
	 */
	public relaseObject(poolable: IPoolable): Boolean {
		let self = this;
		if (poolable == null) return false;
		let poolName = egret.getQualifiedClassName(poolable);
		if (poolName != self._poolName) return false;

		var key = self._poolName + (poolable.hashCode + "");
		if (self._useingPool[key] != null) {
			poolable.resetPoolable();

			delete self._useingPool[key];//在使用池内删除该对象
			self._useingPoolNum -= 1;

			if (self._poolDic[key] == null) {
				self._pool.push(poolable);//添加该对象到对象池
				self._poolDic[key] = true;
			}
			/*Debug.log("对象池释放资源成功  name={0}   key={1}", self._poolName, key);*/
			return true;
		}
		/*Debug.log("对象池释放资源失败  name={0}   key={1}", self._poolName, key);*/
		return false;
	}

	/**
	 * 请求对象,当对象准备完毕后会调用传递的回调函数.<br/>
	 * @param buildParams	初始化参数
	 * @return IPoolable
	 */
	public requestObject(...params): IPoolable {
		let self = this;
		var poolable: IPoolable;
		if (self._pool.length == 0) {
			poolable = new self._objectClass();
		} else {
			poolable = self._pool.pop();
		}

		var key = self._poolName + (poolable.hashCode + "");
		self._useingPool[key] = poolable;
		self._useingPoolNum += 1;

		delete self._poolDic[key];

		poolable.initPoolable.apply(poolable, params);

		return poolable;
	}

	/**
	 * 清空对象池（只会清理闲置对象，使用中的不会有影响）
	 */
	public clearPool(): void {
		let self = this;
		while (self._pool.length > 0) {
			let poolable = self._pool.pop();
			var key = self._poolName + (poolable.hashCode + "");
			delete self._poolDic[key];
			poolable.dispose();
			poolable = null;
		}
	}

	/**
	 * 重置对象池容量为保留大小（只会清理闲置对象，使用中的不会有影响）
	 */
	public resetPool(): void {
		let self = this;
		while (self._pool.length > 0 && self.currentSize > self.keepSize) {
			let poolable = self._pool.pop();
			var key = self._poolName + (poolable.hashCode + "");
			delete self._poolDic[key];
			poolable.dispose();
			poolable = null;
		}
	}

	/**
	 * 获取池内保留容量
	 * @return number
	 */
	public get keepSize(): number {
		return this._keepSize;
	}

	/**
	 * 当前池内所有对象数量
	 * @return number
	 */
	public get currentSize(): number {
		return this._pool.length + this._useingPoolNum;
	}

	/**
	 * 获取构建对象类名
	 * @return any
	 */
	public get objectClass(): any {
		return this._objectClass;
	}

	/**
	 * 销毁
	 */
	public dispose(): void {
		let self = this;
		self._objectClass = null;

		for (let key in self._useingPool) {
			self.relaseObject(self._useingPool[key]);
		}
		self._useingPool = null;
		self._useingPoolNum = 0;

		while (self._pool.length > 0) {
			let poolable = self._pool.pop();
			poolable.dispose();
			poolable = null;
		}
		for (let key in self._poolDic) {
			delete self._poolDic[key];
		}
		self._pool = null;
		self._poolDic = null;
	}

}