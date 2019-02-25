/** 
 * 入口
 */
class H5Game extends egret.DisplayObjectContainer {

    private _currStep: number;
    private _loadingUI: LoadingUI;
    private _loginUI: LoginUI;
    private _loader: GroupLoader;

    public constructor() {
        super();
        if (this.stage) this.onAddToStage(null);
        else this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        if (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        GContext.init(this.stage);
        GLayers.init(this);
        GExternal.init();
        Bus.init();

        // window.platform && window.platform.loadSplash && window.platform.loadSplash();
        this.initLifecycle();
        this.initFont();
        this.initAssetAdapter();
        this.startLoading();
    }

    private initLifecycle() {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }
    }

    private initFont() {
        let os = egret.Capabilities.os;
        if ("iOS" == os || "Mac OS" == os) {
            GConfig.fontFamily = "Helvetica";
        } else if ("Android" == os) {
            GConfig.fontFamily = "Droid Sans Fallback";
        } else {
            GConfig.fontFamily = "Microsoft YaHei";
        }
        egret.TextField.default_fontFamily = GConfig.fontFamily;
    }

    private initAssetAdapter() {
        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        let thread = 4;
        if (GConfig.isNative) {
            thread = 8;
        }
        RES.setMaxLoadingThread(thread);
    }

    private startLoading() {
        Bus.Event.addEventListener(LoadingEvent.LOADING_STEP, this.onLoadingStep, this);

        this._loadingUI = new LoadingUI();
        this.addChild(this._loadingUI);

        this.onLoadingStep(LoadingSteps.Start);
    }

    private onLoadingStep(step?: LoadingSteps) {
        step += 1;
        this._currStep = step;
        switch (step) {
            case LoadingSteps.Start:
                break;
            case LoadingSteps.ResConfig:
                this.loadResConfig();
                break;
            case LoadingSteps.ServerMsg:
                // this.callServerMsg();
                this.onLoadingStep(step);
                break;
            case LoadingSteps.Login:
                // this.startLogin();
                this.onLoadingStep(step);
                break;
            case LoadingSteps.ProtoConfig:
                // this.loadProtoConfig();
                this.onLoadingStep(step);
                break;
            case LoadingSteps.SocketConnected:
                // this.connectSocket();
                this.onLoadingStep(step);
                break;
            case LoadingSteps.GameJs:
                // this.loadGameJs();
                this.onLoadingStep(step);
                break;
            case LoadingSteps.ThemeConfig:
                this.loadThemeConfig();
                break;
            case LoadingSteps.Complete:
                Bus.Event.removeEventListener(LoadingEvent.LOADING_STEP, this.onLoadingStep, this);
                this._loadingUI && this._loadingUI.dispose();
                this._loginUI && this._loginUI.dispose();
                this._loader && this._loader.dispose();
                
                let main = egret.getDefinitionByName("h5game.Main");
                main.startup();
                break;
        }
    }

    public loadResConfig(): void {
        Debug.log("加载default.res.json");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        let url;
        if (GConfig.isNative || GConfig.isWxgame) {
            if (!console.assert) {
                console.assert = function () {
                    return true;
                }
            }
            url = GConfig.isWxgame ? "default.res.json" : GConfig.resRoot + "default.res.json";
        } else {
            url = GConfig.resRoot + "default.res.json";
        }
        url += ("?v=" + GConfig.version);
        RES.loadConfig(url, GConfig.resRoot);
    }


    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.ResConfig);
    }

    private callServerMsg() {
        PlatformUtils.getSwitch(this.callServerMsgBack, this);
    }

    private callServerMsgBack(body) {
        Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.ServerMsg);
    }

    private startLogin() {
        this._loginUI = new LoginUI();
        this.addChild(this._loginUI);
        this._loadingUI.visible = false;
    }

    private loadProtoConfig() {
        if (GConfig.isWxgame) {
            Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.ProtoConfig);
        } else {
            RES.createGroup("proto", ["game_proto"]);
            if (!this._loader) {
                this._loader = new GroupLoader();
            }
            this._loader.clear();
            this._loader.loadGroup('lanuch', this.onResourceLoadComplete, this.onResourceLoadProgress, this);
        }
    }

    private onResourceLoadComplete(groupName: string): void {
        if (groupName == "proto") {
            Bus.Cmd.initProtobuf();
            Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.ProtoConfig);
        }
    }

    private onResourceLoadProgress(itemsLoaded, itemsTotal): void {
        // debug("onResourceLoadProgress:",itemsLoaded, itemsTotal);
    }

    private connectSocket() {
        Bus.Cmd.addCallback(egret.Event.CONNECT, this.onSocketConnected, this);
        Bus.Cmd.connect(GConfig.serverAddress, GConfig.serverPort);
    }

    private onSocketConnected() {
        Bus.Cmd.removeCallback(egret.Event.CONNECT, this.onSocketConnected, this);
        Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.SocketConnected);
    }

    private loadThemeConfig() {
        let url = GConfig.resRoot + "default.thm.json";
        url += ("?v=" + GConfig.version);
        new ThemeLoader(url, this.stage, this.onThemeComplete, this);
    }

    private onThemeComplete() {
        Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.ThemeConfig);
    }

    private loadGameJs() {
        let jscode = egret.getDefinitionByName("h5game.Main");
        if (jscode) {
            Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.GameJs);
        } else {
            GExternal.loadScript(["main.min.js"], function () {
                Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.GameJs);
            }, false);
        }
    }
}