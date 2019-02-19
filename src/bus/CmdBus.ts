module support {
    /**
     * 命令总线
     * @author zx
     */
    export class CmdBus extends BusBase {
        private _iSocket: SmartSocket;
        private _host: string;
        private _port: number;

        private _bytes: egret.ByteArray;

        public constructor() {
            super();

            this._bytes = new egret.ByteArray();
            this._bytes.endian = egret.Endian.BIG_ENDIAN;
        }

        /**
         * 连接socket
         */
        public connect(host: string, port: number, callBack?: Function, target?: any): void {
            if (this._iSocket) {
                SmartSocket.close(this._host, port);
                this._iSocket = null;
            }
            this._host = host;
            this._port = port;

            this._iSocket = SmartSocket.connect(this._host, this._port, this, this.receive, this.closed, this.connected, this.ioError);
        }

		/**
         * 解除命令的绑定。 
         */
        public unbind(cmd: number, callback: Function, callobj: any): void {
            super.removeCallback(cmd, callback, callobj);
        }

        /**
         * 绑定命令。 
         */
        public bind(cmd: number, callback: Function, callobj: any): void {
            super.addCallback(cmd, callback, callobj);
        }

        /**
         * 生成协议结构
         */
        public newClass(cmd: number): any {
            return { cmd };
        }

        /**
         * 发送数据
         * @param data 数据
         */
        public send(data: any): void {
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
        private receive(data: egret.ByteArray): void {
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

        //关闭
        private closed(host: string, port: number): void {
            this.riseCallback(egret.Event.CLOSE, host, port);
        }

        //连接
        private connected(host: string, port: number): void {
            this.riseCallback(egret.Event.CONNECT, host, port);
        }

        //io错误
        private ioError(host: string, port: number): void {
            this.riseCallback(egret.IOErrorEvent.IO_ERROR, host, port);
        }

    }
}
