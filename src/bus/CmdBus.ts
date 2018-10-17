module support
{
    /**
     * 命令总线
     * @author zx
     */
    export class CmdBus extends BusBase
    {
		private _iSocket:SmartSocket;
		private _host:string;
        private _port:number;
        
        private _bytes:egret.ByteArray;

        public constructor()
        {
            super();

            if (!CmdBus._allowInstance)
            {
                throw new egret.error("不能直接实例化CmdBus类");
            }

            this._bytes = new egret.ByteArray();
            this._bytes.endian = egret.Endian.BIG_ENDIAN;
        }

        public static getInstance():IBus
		{
			if (!this._instance)
            {
                this._allowInstance = true;
                this._instance = new CmdBus();
                this._allowInstance = false;
            }
            return this._instance;
        }
        
        /**
         * 连接socket
         * @param host 
         * @param port 
         */
        public connect(host:string, port:number):void
        {
            if(this._iSocket)
            {
                Pools.getInstance().returnItem(this._iSocket);
                this._iSocket = null;
            }
            this._host = host;
            this._port = port;
            
            this._iSocket = SmartSocket.connect(this._host, this._port, this, 
                this.receive, this.closed, this.connected, this.error);
        }
		
		/**
         * 解除命令的绑定。 
         */        
        public unbind(cmd:number, callback:Function, callobj:any):void
        {
            super.removeCallback(cmd, callback);
        }

        /**
         * 绑定命令。 
         */        
        public bind(cmd:number, callback:Function, callobj:any):void
        {
            super.addCallback(cmd, callback, callobj);
        }

        /**
         * 生成协议结构
         */
        public newClass(cmd:number):any{
            return {cmd};
        }

        /**
         * 发送数据
         * @param data 数据
         */
        public send(data:any):void
        {
            let self = this;
            let json = JSON.stringify(data);
            Debug.print("send", json);
            self._bytes.clear();
            self._bytes.writeUTFBytes(json);
            let len = self._bytes.length;
            self._bytes.position = 0;
            self._bytes.writeInt(len);
            self._iSocket.send(self._bytes);
        }
		
		//接收数据
		private receive(data:egret.ByteArray):void
        {
            let self = this;
            self._bytes.clear();
            data.position = 0;//归位
            data.readInt();
            data.readBytes(self._bytes, data.position, data.length);
            let msg = self._bytes.readUTFBytes(self._bytes.length);
            let json = JSON.parse(msg);
            Debug.print("receive", json);
            self.riseCallback(json.cmd, json);
        }
        
        private connected():void
        {

        }

        private closed():void
        {

        }

        private error():void
        {

        }

    }
}
