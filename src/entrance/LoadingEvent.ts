class LoadingEvent{
    /** 加载事件 */
    public static readonly LOADING_STEP = "loading_step";
}

/** 加载页流程 */
enum LoadingSteps {
    Start,//开始
    ResConfig,//资源配置
    ServerMsg,//服务器数据
    Login,//登陆
    ProtoConfig,//protobuf配置
    SocketConnected,//连接socket
    GameJs,//游戏代码
    ThemeConfig,//皮肤配置
    Complete,//结束
}