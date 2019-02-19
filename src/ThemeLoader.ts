class ThemeLoader extends eui.Theme {
    private $url: string;
    private $onThemeLoadComplete: Function;
    private $target: any;

    public constructor(configURL: string, stage: egret.Stage, onThemeLoadComplete: Function, target: any, isDelayed?: boolean) {
        if (!isDelayed) {
            super(configURL, stage);
        } else {
            super('', stage);
            this.$url = configURL;
            this.loadTheme(configURL, stage);
        }
        this.$onThemeLoadComplete = onThemeLoadComplete;
        this.$target = target;
        this.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private onThemeLoadComplete(): void {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        if (this.$target && this.$onThemeLoadComplete) {
            this.$onThemeLoadComplete.call(this.$target);
        }
        this.$url = null;
        this.$onThemeLoadComplete = null;
        this.$target = null;
    }

    private loadTheme(url: string, stage: egret.Stage): void {
        var adapter: eui.IThemeAdapter = stage ? stage.getImplementation("eui.IThemeAdapter") : null;
        if (!adapter) {
            adapter = new eui.DefaultThemeAdapter();
        }
        adapter.getTheme(url, this.onThemeLoaded, this.onThemeLoaded, this);
    }

    private onThemeLoaded(str: string): void {
        var data = JSON.parse(str);
        var isContent: boolean = data.exmls[0]['content'] ? true : false;
        data.exmls.forEach((exml, index, exmls) => this.parseURLContent(exml, isContent, data.skins, exmls));
        this.dispatchEventWith(egret.Event.COMPLETE);
    }

    private parseURLContent(exml: any, isContent: boolean, preLoadList: any, exmls: any): void {
        // var path: string;
        // var content: string;

        // if (isContent) {
        //     path = exml['path'];
        //     content = exml['content'];
        // } else {
        //     path = exml;
        //     content = exml;
        // }
        // var splits: any[] = path.split('/');
        // var skinName: string = splits[splits.length - 1].replace('.exml', '');

        // CCSkinCache.addSkin(skinName, content, preLoadList[skinName] /*path.indexOf('/components/') > 0 ? SkinCacheType.Cache : SkinCacheType.Byte*/);
    }
}