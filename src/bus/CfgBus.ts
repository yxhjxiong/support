module support
{
	/**
	 * 配置总线
	 * @author zx
	 */
	export class CfgBus extends BusBase
	{
		private static _instance:CfgBus;
		private static _allowInstance:Boolean;

		private _lanDic:any = {};

		public constructor()
		{
			super();
			
			if (!CfgBus._allowInstance)
            {
                throw new egret.error("不能直接实例化CfgBus类");
            }
		}

		public static instance():CfgBus
		{
			if (!this._instance)
            {
                this._allowInstance = true;
                this._instance = new CfgBus();
                this._allowInstance = false;
            }
            return this._instance;
		}

	}
}
