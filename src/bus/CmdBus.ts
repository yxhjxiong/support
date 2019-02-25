/**
 * 命令总线
 * @author zx
 */
class CmdBus extends BusBase {
    private _iSocket: SmartSocket;
    private _host: string;
    private _port: number;

    private _bytes: egret.ByteArray;

    private _protobuf: any;
    private _protobufReq: any;
    private _protobufResp: any;

    public constructor() {
        super();

        this._bytes = new egret.ByteArray();
        this._bytes.endian = egret.Endian.BIG_ENDIAN;

        
    }

    /** 初始protobuf */
    public initProtobuf():void{
        if(GConfig.isProtoBuf == true){
            var proto: string = RES.getRes("game_proto");
            this._protobuf = dcodeIO.ProtoBuf.loadProto(proto);

            this._protobufReq = {};
            this._protobufResp = {};
            let children = this._protobuf.ns.children;
            for(let key in children){
                let name = children[key].name;
                let params = name.split("_");
                if (params.length < 2) continue;
                let protocol = params[1];
                if (name.indexOf("Req_") != -1) {
                    this._protobufReq[protocol] = name;
                } else if(name.indexOf("Resp_") != -1) {
                    this._protobufResp[protocol] = name;
                }
            }
        }
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

    //获取命令类
    private getClazz(cmd: number):any{
        let clazz:any;
        if(GConfig.isProtoBuf == true){
            let cmdName = this._protobufReq[cmd];
            clazz = this._protobuf.build(cmdName);
        }else{
            clazz = Object;
        }
        return clazz;
    }

    /**
     * 生成命令结构
     */
    public newCmd(cmd: number): any {
        let clazz = this.getClazz(cmd);
        let objet = new clazz();
        objet.cmd = cmd;
        return objet;
    }

    /**
     * 发送数据
     * @param data 数据
     */
    public send(data: any): void {
        let self = this;
        self._bytes.clear();
        if(GConfig.socketDebug == true){
            Debug.print("send", data);
        }
        if(GConfig.isProtoBuf == true){
            self._bytes.writeBytes(data.toArrayBuffer());
        }else{
            self._bytes.writeUTFBytes(JSON.stringify(data));
        }
        let len = self._bytes.length;
        self._bytes.position = 0;
        if(GConfig.isProtoBuf == true){
            self._bytes.writeByte(0x7c);
        }else{
            self._bytes.writeByte(0x01);
        }
        self._bytes.writeShort(len + 4);
        self._bytes.writeInt(data.cmd);
        self._iSocket.send(self._bytes);
    }

    //接收数据
    private receive(data: egret.ByteArray): void {
        let self = this;
        data.position = 0;//归位
        data.readByte();
        data.readShort();
        let cmd = data.readInt();
        self._bytes.clear();
        data.readBytes(self._bytes, data.position, data.bytesAvailable);
        self._bytes.position = 0;
        let receive:any;
        if(GConfig.isProtoBuf == true){
            var clazz = this.getClazz(name);
            receive = clazz.decode(self._bytes);
        }else{
            let json = self._bytes.readUTFBytes(self._bytes.length);
            receive = JSON.parse(json);
        }
        if(GConfig.socketDebug == true){
            Debug.print("receive", receive);
        }
        self.riseCallback(cmd, receive);
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