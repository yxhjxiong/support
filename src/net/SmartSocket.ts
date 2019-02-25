/**
 * 通信Socket
 * @author zx
 */
class SmartSocket extends egret.HashObject implements IPoolable {
    public static readonly PING_REFRESH: String = "PING_REFRESH";

    private _socket: egret.WebSocket;

    private _receive: egret.ByteArray;

    private _host: String;
    private _port: number;

    private _callTarget: any;
    private _closeCallback: Function;
    private _connectedCallback: Function;
    private _socketDataCallback: Function;
    private _ioErrorCallback: Function;

    public constructor() {
        super();

        this._socket = new egret.WebSocket();
        this._socket.type = egret.WebSocket.TYPE_BINARY;

        this._receive = new egret.ByteArray();
        this._receive.endian = egret.Endian.BIG_ENDIAN;

        this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClosed, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketIoError, this);
    }

    public initPoolable(...params): void {
        let param = params[0];
        this._callTarget = param.target;
        this._closeCallback = param.closed;
        this._connectedCallback = param.connected;
        this._socketDataCallback = param.socketData;
        this._ioErrorCallback = param.ioError;
    }

    public resetPoolable(): void {
        this.close();

        this._callTarget = null;
        this._closeCallback = null;
        this._connectedCallback = null;
        this._socketDataCallback = null;
        this._ioErrorCallback = null;
    }

    public dispose(): void {
        this.close();

        this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClosed, this);
        this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
        this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
        this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketIoError, this);
        this._socket = null;

        this._closeCallback = null;
        this._connectedCallback = null;
        this._socketDataCallback = null;
        this._ioErrorCallback = null;

        this._receive.clear();
        this._receive = null;
    }

    /**
     * socket连接
     * @param host 服务器主机或IP
     * @param port 端口
     * @return Boolean 操作是否成功
     */
    public connect(host: string, port: number): Boolean {
        if (this.connected) return false;

        this._host = host;
        this._port = port;

        this._receive.clear();

        this._socket.connect(host, port);

        return true;
    }

    /**
     * socket关闭
     * @return Boolean 操作是否成功
     */
    public close(): Boolean {
        if (!this.connected) return false;

        this._socket.close();

        return true;
    }

    /**
     * 发送数据
     * @param	data 发送数据
     * @return Boolean 操作是否成功
     */
    public send(data: egret.ByteArray): Boolean {
        if (!data) return false;
        if (!this.connected) return false;

        data.position = 0;//归位
        this._socket.writeBytes(data, 0, data.bytesAvailable);
        this._socket.flush();

        return true;
    }

    private onSocketClosed(e: egret.Event): void {
        if (!this._callTarget || !this._closeCallback) return;
        this._closeCallback.apply(this._callTarget, [this._host, this._port]);
    }

    private onSocketConnected(e: egret.Event): void {
        // this._socket.writeUTFBytes("I am client");
        // this._socket.flush();

        if (!this._callTarget || !this._connectedCallback) return;
        this._connectedCallback.apply(this._callTarget, [this._host, this._port]);
    }

    private onSocketData(e: egret.ProgressEvent): void {
        this._receive.clear();
        this._socket.readBytes(this._receive, this._receive.length);

        if (!this._callTarget || !this._socketDataCallback) return;
        this._socketDataCallback.apply(this._callTarget, [this._host, this._port, this._receive]);
    }

    private onSocketIoError(e: egret.IOErrorEvent): void {
        if (!this._callTarget || !this._ioErrorCallback) return;
        this._ioErrorCallback.apply(this._callTarget, [this._host, this._port]);
    }

    public get connected(): Boolean {
        return this._socket.connected;
    }


    /** smartsocket字典 */
    private static _sockets: any = {};

    /**
     * 连接Socket
     * @param host 服务器主机或IP
     * @param port 端口
     * @param target 回调对象
     * @param onSocketData 接收数据回调
     * @param onClosed 关闭回调
     * @param onConnected 连接成功回调
     * @param onIoError IO错误回调
     */
    public static connect(host: string, port: number, target: any, onSocketData: Function,
        onClosed: Function = null, onConnected: Function = null, onIoError: Function = null): SmartSocket {
        var key = host + "_" + port;
        var param: any = { target: target };
        param.closed = onClosed;
        param.connected = onConnected;
        param.socketData = onSocketData;
        param.ioError = onIoError;
        var socket: SmartSocket = this._sockets[key];
        if (socket == null) {
            socket = Pools.borrowItem(SmartSocket, param) as SmartSocket;
        } else {
            socket.initPoolable(param);
        }
        if (socket.connected == true) return;

        socket.connect(host, port);
        // Debug.log("Socket请求连接, host:{0}, port:{1}", host, port);
        return socket;
    }

    /**
     * 关闭Socket
     * @param host 服务器主机或IP
     * @param port 端口
     */
    public static close(host: string, port: number): void {
        var key = host + "_" + port;
        var socket: SmartSocket = this._sockets[key];
        if (socket == null) {
            // Debug.log("Socket未创建, host:{0}, port:{1}", host, port);
            return;
        }

        delete this._sockets[key];
        Pools.returnItem(socket);

        // Debug.log("Socket请求关闭, host:{0}, port:{1}", host, port);
    }

}