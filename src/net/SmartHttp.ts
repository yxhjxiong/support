module support {
    /**
     * 通信Http
     * @author zx
     */
    export class SmartHttp extends egret.HashObject implements IPoolable {
        public _http: egret.HttpRequest;

        private _callTarget: any;
        private _completeCallback: Function;
        private _ioErrorCallback: Function;

        public constructor() {
            super();

            this._http = new egret.HttpRequest();

            this._http.addEventListener(egret.Event.COMPLETE, this.onHttpComplete, this);
            this._http.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpIOError, this);
            this._http.addEventListener(egret.ProgressEvent.PROGRESS, this.onHttpProgress, this);
        }

        public initPoolable(...params): void {
            let param = params[0];
            this._callTarget = param.target;
            this._completeCallback = param.complete;
            this._ioErrorCallback = param.ioError;
        }

        public resetPoolable(): void {
            this._callTarget = null;
            this._completeCallback = null;
            this._ioErrorCallback = null;
        }

        public dispose(): void {
            this._http.removeEventListener(egret.Event.COMPLETE, this.onHttpComplete, this);
            this._http.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpIOError, this);
            this._http.removeEventListener(egret.ProgressEvent.PROGRESS, this.onHttpProgress, this);
            this._http = null;

            this._callTarget = null;
            this._completeCallback = null;
            this._ioErrorCallback = null;
        }

        public post(url: string, param: any = null, type: string = egret.HttpResponseType.TEXT): void {
            this.run(egret.HttpMethod.POST, url, param, type);
        }

        public get(url: string, param: any = null, type: string = egret.HttpResponseType.TEXT): void {
            this.run(egret.HttpMethod.GET, url, param, type);
        }

        private run(method: string, url: string, param: any, type: string): void {
            let paramStr = "";
            if (param) {
                if (typeof (param) == 'object') {
                    for (let key in param) {
                        paramStr += (key + '=' + param[key] + '&');
                    }
                    paramStr = paramStr.substr(0, paramStr.length - 1);
                } else {
                    paramStr = String(param);
                }
                if (paramStr.length > 0) {
                    url += ('?' + paramStr);
                }
            }

            if (method == egret.HttpMethod.POST) {
                this._http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            this._http.responseType = type;
            this._http.open(url, method);
            this._http.send(param);
        }

        private onHttpComplete(event: egret.Event): void {
            var http = <egret.HttpRequest>event.currentTarget;
            if (this._callTarget && this._completeCallback) {
                this._completeCallback.call(this._callTarget, [http.response]);
            }
            Pools.returnItem(this);
        }

        private onHttpIOError(event: egret.IOErrorEvent): void {
            if (this._callTarget && this._ioErrorCallback) {
                this._ioErrorCallback.call(this._callTarget);
            }
            Pools.returnItem(this);
        }

        private onHttpProgress(event: egret.ProgressEvent): void {
            // console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        }

        /**
         * http请求POST
         * @param url 该请求所要访问的URL该请求所要访问的URL
         * @param param 参数
         * @param type 返回的数据格式
         */
        public static post(url: string, param: any = null, complete?: Function, ioError?: Function, target?: any,
            type: string = egret.HttpResponseType.TEXT): void {
            let http = <SmartHttp>Pools.borrowItem(SmartHttp, {complete, ioError, target});
            http.post(url, param, type);
        }

        /**
         * http请求GET
         * @param url 
         * @param param 
         * @param type 
         */
        public static get(url: string, param: any = null, complete?: Function, ioError?: Function, target?: any,
            type: string = egret.HttpResponseType.TEXT): void {
            let http = <SmartHttp>Pools.borrowItem(SmartHttp, {complete, ioError, target});
            http.get(url, param, type);
        }
    }
}
