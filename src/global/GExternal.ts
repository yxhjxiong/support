class GExternal {

    public static firstEnter = true;  //第一次进入
    public static isLogin:boolean = false;

    /** 加载代码文件 */
    public static loadScript:Function;

    public static isNative(): boolean {
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            return true;
        }
        return false;
    }

    public static isRuntime2() {
        if (egret.RuntimeType.RUNTIME2 == egret.Capabilities.runtimeType) {
            return true;
        }
        return false;
    }

    public static isApp() {
        return this.isRuntime2() || this.isNative();
    }

    public static init(){
        // TypeScript 代码
        // egret.ExternalInterface.addCallback("setAppOptions", function (message:string) {
        //     egret.log("message form native setAppOptions: " + message);
        //     GlobalExternal.parseAppOptions(message);
        // });

        // egret.ExternalInterface.addCallback("onLoginSuccess", function (message:string) {
        //     egret.log("message form native onLoginSuccess: " + message);
        //     let options = JSON.parse(message);
        //     GlobalExternal.parseLogingOptions(options);
        // });

        // egret.ExternalInterface.addCallback("doLogoutGame", function (message:string) {
        //     if (GlobalExternal.lodingUI) {
        //         GlobalExternal.lodingUI.showLoginAccount();
        //     } else {
        //         h5game['ServerManager'] && h5game['ServerManager'].logoutGame(true);
        //     }
        // });

        // egret.ExternalInterface.addCallback("captureScreen", function (message:string) {
        //     GlobalExternal.captureScreen();
        // });

        this.sendCodeInit();
    }


    /**
     *         data:{
            "uid" : "2141074",
                "platformHost" : "http:\/\/mxxy-platform.allrace.com",
                "channel" : "com.yaowan.xiyou",
                "serial" : "45FFAE2C-F448-49C8-B839-DF1620B4C6B6",
                "net" : "0",
                "VERSION" : "201803212000",
                "idfa" : "F164E6CB-9332-420F-8F56-EC521466315D",
                "macId" : "45FFAE2C-F448-49C8-B839-DF1620B4C6B6",
                "os" : "ios",
                "device_type" : "1",
                "platform" : "yaowanios",
                "token" : "21410742a7399579543a598",
                "sysver" : "11.3",
                "operator" : "-(null)",
                "device" : "Simulator",
                "resolution" : "375x812",
                "isWXAppInstalled" : 0
        }
     * @param json
     */
    public static parseLogingOptions(options:any){
        // ClientConst.isShowAccount = false;
        // LocalData.setOpenId(options.uid);
        // ClientConst.uid = options.uid;
        // ClientConst.platformHost = options.platformHost;
        // ClientConst.VERSION = options.VERSION;
        // ClientConst.idfa = options.idfa || '';

        // if (options.device_type){
        //     ClientConst.device_type = options.device_type;
        // }

        // if (options.platformOther){
        //     ClientConst.platformOther = options.platformOther;
        // }

        // if (options.MulAccountData){
        //     if (options.MulAccountData.length > 1){
        //         ClientConst.IsMulAccount = true;
        //         ClientConst.MulAccountData = options.MulAccountData;
        //     }else{

        //         let uid = ClientConst.MulAccountData[0];
        //         LocalData.setOpenId(uid);
        //         ClientConst.uid = uid;
        //     }
        // }

        // ClientConst.MacId = options.MacId || '';
        // ClientConst.platform = options.platform;
        // ClientConst.channel = options.channel || '';
        // ClientConst.os = options.os || '';
        // ClientConst.token = options.token;

        // if (!ClientConst.IsMulAccount){
        //     this.isLogin = true;
        //     if (GlobalExternal.lodingUI) {
        //         GlobalExternal.lodingUI.showArea();
        //     } else if (!GlobalExternal.firstEnter) {
        //         h5game['ServerManager'] && h5game['ServerManager'].logoutGame();
        //     }
        // }
    }

    public static parseAppOptions(json:string){
        // debug("parseAppOptions",json);
        // let options = JSON.parse(json);
        // ClientConst.VERSION = options.version;
        // AGameConst.DEBUG = options.debug ? true : false;
        // AGameConst.isHttps = options.isHttps ? true : false;
        // AGameConst.isProto = options.isWx ? false : true;
        // AGameConst.isNative = options.isNative ? true : false;
        // ClientConst.platform = options.platform;
        // ClientConst.channel = options.channel || '';
        // ClientConst.logoId = options.logoId ? options.logoId : 0;
        // ClientConst.os = options.os || '';
        // ClientConst.isShowAccount = options.isShowAccount;
        // ClientConst.device_type = options.device_type;
        // ClientConst.platformSign = options.platformSign;
        // /**著作信息 */
        // ClientConst.ISBN = options.ISBN || '';
        // ClientConst.GameWord = options.GameWord || '';
        // ClientConst.TecAndNum = options.TecAndNum || '';
        // ClientConst.Copyright = options.Copyright || '';
        // ClientConst.Publisher = options.Publisher || '';


        // /**
        //  * 设备信息
        //  */
        // ClientConst.Model = options.model || '';
        // ClientConst.Brand = options.brand || '';
        // ClientConst.Sysver = options.sysver || '';

        
        // if(options.device_kind == 2){
        //     this.client.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        // }

        // this.setPlatformCopyright();

        // GlobalExternal.lodingUI && GlobalExternal.lodingUI.setPlatformUI();
    }

    private static setPlatformCopyright() {
        // if (ClientConst.platform == "quickhunfu" || ClientConst.platform == "yaowanyybhf") {
        //     ClientConst.ISBN = 'ISBN:978-7-89447-170-3';
        //     ClientConst.GameWord = '';
        //     ClientConst.TecAndNum = '新广出审  [2014]1095号';
        //     ClientConst.Copyright = '著作权人：上海邀玩网络技术有限公司';
        //     ClientConst.Publisher = '出版单位：北京科海电子出版社';

        //     ClientConst.platformSign = "apk_mxxy"
        // }
    }

    private static sendCodeInit(){
        egret.ExternalInterface.call("codeInit","");
    }

    public static sendEnterGame(str:string){
        egret.ExternalInterface.call("enterGame",str);
    }

    public static sendShowSdkLogin(str:string = ""){
        egret.ExternalInterface.call("showSdkLogin",str);
    }

    public static showLogin(str:string = ""){
        egret.ExternalInterface.call("showLogin",str);
    }

    public static showWdLogin(str:string = ""){
        egret.ExternalInterface.call("showWdLogin",str);
    }

    public static sendLogout(str:string = ""){
        egret.ExternalInterface.call("logout",str);
    }

    public static sendRoleInfo(rid,roleName,serverId,serverName){
        let data = {rid,roleName,serverId,serverName};
        let str = JSON.stringify(data);
        egret.ExternalInterface.call("roleInfo",str);
    }

    public static sendCreateRole(rid,roleName,serverId,serverName){
        let data = {rid,roleName,serverId,serverName};
        let str = JSON.stringify(data);
        egret.ExternalInterface.call("createRole",str);
    }

    public static sendPayment(str:string = ""){
        egret.ExternalInterface.call("payment",str);
    }

    /**
     * 设置角色信息
     */
    public static setGameRoleInfo(serverID, serverName, gameRoleName, gameRoleID, gameRoleBalance, 
            vipLevel, gameRoleLevel, sexId, partyId, partyName , roleCreateTime, isCreate, reportType,
            roleForce,career,careerName) {

        // var sex = sexId == 1 ? "女" : "男";
        // partyName = !partyName ? "无" : partyName;

        // var data = {
        //     serverID: String(serverID),
        //     serverName: String(serverName),
        //     gameRoleName: String(gameRoleName),
        //     gameRoleID: String(gameRoleID),
        //     gameRoleBalance: String(gameRoleBalance),
        //     vipLevel: String(vipLevel),
        //     gameRoleLevel: String(gameRoleLevel),
        //     sex:String(sex),
        //     partyId:String(partyId),
        //     partyName: String(partyName),
        //     roleCreateTime: String(roleCreateTime),
        //     isCreate : isCreate,
        //     reportType : reportType,
        //     uid: ClientConst.uid,
        //     fightvalue:roleForce,
        //     career:career,
        //     careerName:careerName
        // };
        
        // var jsonStr = JSON.stringify(data);
        // debug("发送角色信息:" + jsonStr);

        // egret.ExternalInterface.call("setGameRoleInfo", jsonStr);

        // window.platform && window.platform.reportRoleStatus && window.platform.reportRoleStatus(data);
    }

    /**上报游戏状态-选择服务器 */
    public static sendChooseServer() {
        // GlobalExternal.setGameRoleInfo(
        //     ClientConst.serverId, 
        //     ClientConst.serverName,
        //     0,
        //     0,
        //     0,
        //     0,
        //     1,
        //     0,
        //     0,
        //     "",
        //     0,
        //     true,
        //     ReportType.ChooseServer,
        //     0,
        //     0,
        //     ""
        // );
    }

    public static captureScreen() {
        // var renderTexture:egret.RenderTexture = new egret.RenderTexture();
        // renderTexture.drawToTexture(GlobalExternal.client.stage);
        // var str = renderTexture.toDataURL("image/png");
        // egret.ExternalInterface.call("onCapture", str);
    }

}