/**
 * 语言包总线
 * @author zx
 */
class LanBus extends BusBase {
	private _lanDic: any = {};

	public constructor() {
		super();
	}

	/**
	 * 获取语言包中的文字, 并通过args参数填充其中的占位符
	 * @param key:any
	 * @param args:Array
	 * @return String
	 */
	public getBindStr(key: any, ...args): string {
		return StringUtil.substitute(this.getStr(key), ...args);
	}

	/**
	 * 获取语言包中的文字
	 * @param strLabel:String
	 * @return String
	 */
	public getStr(key: any): string {
		return this._lanDic[key];
	}

}