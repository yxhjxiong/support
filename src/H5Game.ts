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

        Global.init(this.stage, this);
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
            Global.Config.fontFamily = "Helvetica";
        } else if ("Android" == os) {
            Global.Config.fontFamily = "Droid Sans Fallback";
        } else {
            Global.Config.fontFamily = "Microsoft YaHei";
        }
        egret.TextField.default_fontFamily = Global.Config.fontFamily;
    }

    private initAssetAdapter() {
        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        let thread = 4;
        if (Global.Config.isNative) {
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
                this.callServerMsg();
                break;
            case LoadingSteps.Login:
                this.startLogin();
                break;
            case LoadingSteps.ProtoConfig:
                this.loadProtoConfig();
                break;
            case LoadingSteps.SocketConnected:
                this.connectSocket();
                break;
            case LoadingSteps.GameJs:
                this.loadGameJs();
                break;
            case LoadingSteps.ThemeConfig:
                this.loadThemeConfig();
                break;
            case LoadingSteps.Complete:
                Bus.Event.removeEventListener(LoadingEvent.LOADING_STEP, this.onLoadingStep, this);
                this._loadingUI && this._loadingUI.dispose();
                this._loginUI && this._loginUI.dispose();
                this._loader && this._loader.dispose();
                break;
        }
    }

    public loadResConfig(): void {
        Debug.log("加载default.res.json");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        let url;
        if (Global.Config.isNative || Global.Config.isWxgame) {
            if (!console.assert) {
                console.assert = function () {
                    return true;
                }
            }
            url = Global.Config.isWxgame ? "default.res.json" : Global.Config.resRoot + "default.res.json";
        } else {
            url = Global.Config.resRoot + "default.res.json";
        }
        url += ("?v=" + Global.Config.version);
        RES.loadConfig(url, Global.Config.resRoot);
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
        if (Global.Config.isWxgame) {
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
            Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.ProtoConfig);
        }
    }

    private onResourceLoadProgress(itemsLoaded, itemsTotal): void {
        // debug("onResourceLoadProgress:",itemsLoaded, itemsTotal);
    }

    private connectSocket() {
        Bus.Cmd.addCallback(egret.Event.CONNECT, this.onSocketConnected, this);
        Bus.Cmd.connect(Global.Config.serverAddress, Global.Config.serverPort);
    }

    private onSocketConnected() {
        Bus.Cmd.removeCallback(egret.Event.CONNECT, this.onSocketConnected, this);
        Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.SocketConnected);
    }

    private loadThemeConfig() {
        let url = Global.Config.resRoot + "default.thm.json";
        url += ("?v=" + Global.Config.version);
        new ThemeLoader(url, this.stage, this.onThemeComplete, this);
    }

    private onThemeComplete() {
        Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.ThemeConfig);
    }

    private loadGameJs() {
        let jscode = egret.getDefinitionByName("game.Main");
        if (jscode) {
            Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.GameJs);
        } else {
            Global.External.loadScript(["main.min.js"], function () {
                Bus.Event.dispatchEvent(LoadingEvent.LOADING_STEP, LoadingSteps.GameJs);
            }, false);
        }
    }
}