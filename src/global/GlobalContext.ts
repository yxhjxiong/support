/**
 * 全局上下文对象
 * @author zx
 */
class GlobalContext {

	private _stage: egret.Stage;

	private _ping: number;
	private _fps: number;
	private _mem: number;

	private _displayLevel: number;//显示级别

	/**
	 * 初始化全局上下文，只调用一次，后面不会生效。
	 * @param root 根容器
	 */
	public init(stage: egret.Stage): void {
		if (this._stage) return;
		this._stage = stage;
		this._stage.scaleMode = Global.Config.scaleMode;
	}

	/**
	 * 全局Stage对象
	 */
	public get stage(): egret.Stage {
		return this._stage;
	}

	/**
	 * 显示级别
	 */
	public get displayLevel(): number {
		return this._displayLevel;
	}

	/**
	 * 设置显示级别
	 * @param value:number
	 */
	public set displayLevel(value: number) {
		this._displayLevel = value;
	}

	/**
	 * 获取内存使用
	 * @return number
	 */
	public get mem(): number {
		return this._mem;
	}

	/**
	 * 获取ping
	 * @return number
	 */
	public get ping(): number {
		return this._ping;
	}

	/**
	 * 更新PING
	 * @param value:number
	 */
	public updatePing(value: number): void {
		this._ping = value;
	}

	/**
	 * 更新内存使用
	 * @param value:number
	 */
	public updateMEM(value: number): void {
		this._mem = value;
	}

	/**
	 * 获取fps
	 * @return number
	 */
	public get fps(): number {
		return this._fps;
	}

	/**
	 * 更新fps
	 * @param value:number
	 */
	public updateFPS(value: number): void {
		this._fps = value;
	}
}