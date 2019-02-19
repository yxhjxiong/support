class Global {
    
    /** 是否调试 */
    public static DEBUG = true;

    /** 全局上下文 */
    public static Context: GlobalContext;
    /** 全局配置 */
    public static Config: GlobalConfig;
    /** 全局显示层级 */
    public static Layer: GlobalLayers;
    /** 全局原生交互接口 */
    public static External: GlobalExternal;

    public static init(stage?: egret.Stage, root?: egret.DisplayObjectContainer): void {
        if (!this.Config) {
            this.Config = new GlobalConfig();
        }

        if (!this.Context) {
            this.Context = new GlobalContext();
            this.Context.init(stage);
        }

        if (!this.Layer) {
            this.Layer = new GlobalLayers();
            this.Layer.init(root);
        }

        if (!this.External) {
            this.External = new GlobalExternal();
            this.External.init();
        }
    }
}