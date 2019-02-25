/**
 * 全局上下文对象
 * @author zx
 */
class GContext {

	private static _stage: egret.Stage;

	private static _ping: number;
	private static _fps: number;
	private static _mem: number;

	private static _displayLevel: number;//显示级别

	/**
	 * 初始化全局上下文，只调用一次，后面不会生效。
	 * @param root 根容器
	 */
	public static init(stage: egret.Stage): void {
		if (this._stage) return;
		this._stage = stage;
		this._stage.scaleMode = GConfig.scaleMode;
	}

	/**
	 * 全局Stage对象
	 */
	public static get stage(): egret.Stage {
		return this._stage;
	}

	/**
	 * 显示级别
	 */
	public static get displayLevel(): number {
		return this._displayLevel;
	}

	/**
	 * 设置显示级别
	 * @param value:number
	 */
	public static set displayLevel(value: number) {
		this._displayLevel = value;
	}

	/**
	 * 获取内存使用
	 * @return number
	 */
	public static get mem(): number {
		return this._mem;
	}

	/**
	 * 获取ping
	 * @return number
	 */
	public static get ping(): number {
		return this._ping;
	}

	/**
	 * 更新PING
	 * @param value:number
	 */
	public static updatePing(value: number): void {
		this._ping = value;
	}

	/**
	 * 更新内存使用
	 * @param value:number
	 */
	public static updateMEM(value: number): void {
		this._mem = value;
	}

	/**
	 * 获取fps
	 * @return number
	 */
	public static get fps(): number {
		return this._fps;
	}

	/**
	 * 更新fps
	 * @param value:number
	 */
	public static updateFPS(value: number): void {
		this._fps = value;
	}
}