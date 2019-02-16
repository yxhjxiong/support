module support
{
	/**
	 * 语言包总线
	 * @author zx
	 */
	export class LanBus extends BusBase
	{
		private static _instance:LanBus;
		private static _allowInstance:Boolean;

		private _lanDic:any = {};

		public constructor()
		{
			super();
			
			if (!LanBus._allowInstance)
            {
                throw new egret.error("不能直接实例化LanBus类");
            }
		}

		public static instance():LanBus
		{
			if (!this._instance)
            {
                this._allowInstance = true;
                this._instance = new LanBus();
                this._allowInstance = false;
            }
            return this._instance;
		}
		
		/**
		 * 获取语言包中的文字, 并通过args参数填充其中的占位符
		 * @param key:any
		 * @param args:Array
		 * @return String
		 */
		public getBindStr(key:any, ...args):string
		{
			return StringUtil.substitute(this.getStr(key), ...args);
		}
		
		/**
		 * 获取语言包中的文字
		 * @param strLabel:String
		 * @return String
		 */
		public getStr(key:any):string
		{
			return this._lanDic[key];
		}

	}
}
