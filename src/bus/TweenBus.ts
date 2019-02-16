module support
{
	/**
	 * 缓动总线
	 * @author zx
	 */
	export class TweenBus extends BusBase
	{
		private static _instance:TweenBus;
		private static _allowInstance:Boolean;

		//缓动集合
        private tweenDic:any = {};

		public constructor()
		{
			super();
			
			if (!TweenBus._allowInstance)
            {
                throw new egret.error("不能直接实例化TweenBus类");
            }
		}

		public static instance():TweenBus
		{
			if (!this._instance)
            {
                this._allowInstance = true;
                this._instance = new TweenBus();
                this._allowInstance = false;
            }
            return this._instance;
		}
		
		/**
         * 获取缓动
         */
        public get(target:any, props?: {loop?: boolean;onChange?: Function;onChangeObj?: any;}, 
                          pluginData?: any, override?: boolean, flag?:string):egret.Tween
        {
            if(!target)     return;
            this.remove(target);
            let tween = egret.Tween.get(target, props, pluginData, override);
            let obj = {tween, flag};
            this.tweenDic[target] = obj;
            return tween;
        }

        /**
         * 清除缓动
         */
        public remove(target:any):void
        {
            if(!target)     return;
            let tween = this.tweenDic[target];
            if(!tween)      return;
            delete this.tweenDic[target];
            egret.Tween.removeTweens(target);
        }

        /**
         * 暂停缓动
         */
        public pause(flag?:string):void
        {   
            let self = this;
            for(let key in self.tweenDic)
            {
                let obj = self.tweenDic[key];
                if(flag && obj.flag != flag)      continue;
                let tween = <egret.Tween>obj.tween;
                tween.setPaused(true);
            }
        }

        /**
         * 恢复缓动
         */
        public resume(flag?:string):void
        {   
            let self = this;
            for(let key in self.tweenDic)
            {
                let obj = self.tweenDic[key];
                if(flag && obj.flag != flag)      continue;
                let tween = <egret.Tween>obj.tween;
                tween.setPaused(false);
            }
        }

	}
}
