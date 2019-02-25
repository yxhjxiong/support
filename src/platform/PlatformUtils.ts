class PlatformUtils {

    public static userLogin(callback: Function, target: any,errorCall?:Function,errorTarget?:any): void {
        // AGame.HttpClient.serverUrl = ClientConst.platformHost;
        // let params: any = {};
        // params.action = "user.login";
        // params.platform = ClientConst.platform;
        // params.open_id = LocalData.getOpenId();
        // params.channel = ClientConst.channel;
        // params.idfa = ClientConst.idfa;
        // params.MacId = ClientConst.MacId;
        // params.os = ClientConst.os;
        // params.device_type = ClientConst.deviceType();
        // params.ver = ClientConst.VERSION;
        // params.token = ClientConst.token;
        // params.model = ClientConst.Model;
		// params.brand = ClientConst.Brand;
		// params.system = ClientConst.Sysver;
        // if (ClientConst.inviteType > 0) {
        //     params.point_id = ClientConst.inviteType;
        // }
        // if (ClientConst.inviteImgId > 0) {
        //     params.img_id = ClientConst.inviteImgId;
        // }
        // let other = ClientConst.platformOther;
        // if (other) {
        //     debug("other",other);
        //     for (let key in other) {
        //         let str = other[key];
        //         if (str && isNaN(str)){
        //             let result = str.toString().replace(" ", "");
        //             params[key] = result;
        //         }else {
        //             params[key] = str;
        //         }
        //     }
        // }
        // var httpclient = AGame.HttpClient.get(callback, target, params);
        // if (errorCall) httpclient.setErrorCall(errorCall,errorTarget);
    }

    public static getSwitch(callback: Function, target: any){
        let params: any = {};
        params.action = "game.game_ver";
        params.ver = GConfig.version;
        SmartHttp.get(GConfig.platform, params, callback, null, target);
    }

    // public static getGzhInfo(callback: Function, target: any){
    //     AGame.HttpClient.serverUrl = ClientConst.platformHost;
    //     let params: any = {};
    //     params.action = "gzh.get_ridlist";
    //     params.g_openid = ClientConst.MulAccountData[1] ? ClientConst.MulAccountData[1] : "";
    //     params.x_openid = ClientConst.MulAccountData[0];
    //     params.platform = ClientConst.platform;
    //     AGame.HttpClient.get(callback, target, params);
    // }

    // public static getServerList(callback: Function, target: any) {
    //     AGame.HttpClient.serverUrl = ClientConst.platformHost;
    //     let params: any = {};
    //     params.action = "server.lists";
    //     params.platform = ClientConst.platform;
    //     params.open_id = ClientConst.openId;
    //     params.channel = ClientConst.channel;
    //     params.device_type = ClientConst.deviceType();
    //     params.ver = ClientConst.VERSION;
    //     AGame.HttpClient.get(callback, target, params);
    // }

    // /**获取公告type:2登录前公告，3维护公告 */
    // public static getNoticeList(type = 2, callback: Function, target: any) {
    //     AGame.HttpClient.serverUrl = ClientConst.platformHost;
    //     let params: any = {};
    //     params.action = "game.getNotice";

    //     params.type = type;
    //     params.sid = Number(ClientConst.serverId);

    //     AGame.HttpClient.get(callback, target, params);
    // }

    // public static sendRoleInfo() {
    //     AGame.HttpClient.serverUrl = ClientConst.platformHost + "/api/user/role_info";
    //     let accountData = egret.getDefinitionByName("AccountData");

    //     let params: any = {};
    //     params.rid = accountData.uuid;
    //     params.open_id = ClientConst.openId;
    //     params.nickname = accountData.nickName;
    //     params.server_id = ClientConst.serverId;
    //     params.version = ClientConst.VERSION;
    //     params.platform = ClientConst.platform;
    //     params.create_time = ClientConst.platform;
    //     params.device_type = ClientConst.deviceType();
    //     params.create_time = ClientConst.createTime;
    //     params.token = ClientConst.sign;
    //     AGame.HttpClient.get(this.callSendRolaInfo, this, params);
    // }

    // /**小游戏前端授权登录 通知平台 获取unoinid */
    // public static sendAuthorization(encryptedData,iv,callback: Function, target: any) {
    //     AGame.HttpClient.serverUrl = ClientConst.platformHost;
    //     let params: any = {};
    //     params.action = "user.authorization";
    //     params.encryptedData = encryptedData;
    //     params.iv = iv;

    //     params.extra = ClientConst.extra;
    //     params.platform = ClientConst.platform;
    //     params.open_id = ClientConst.openId;
    //     AGame.HttpClient.get(callback, target, params, egret.HttpResponseType.TEXT);
    // }

    // /**
    //  * 点击分享图后成功创角
    //  */
    // public static shareCreateRoleDot(point_id) {
    //     if (point_id >= 1) {
    //         AGame.HttpClient.serverUrl = ClientConst.platformHost;
    //         let params: any = {};
    //         params.action = "user.shareRoleRegister";
    //         params.point_id = point_id;
    //         params.open_id = ClientConst.openId;
    //         params.server_id = ClientConst.serverId;
    //         params.rid = ClientConst.rid;
    //         params.register_time = ClientConst.createTime;
    //         params.channel = ClientConst.channel;
    //         params.platform = ClientConst.splatform;
    //         params.img_id = ClientConst.inviteImgId;
    //         params.device_type = ClientConst.deviceType();
    //         AGame.HttpClient.get(null, null, params, egret.HttpResponseType.TEXT);
    //     }
    // }

    // /**获取分享的场景信息 */
    // public static getShareSceneInfo(shareDotType,callback: Function, target: any) {
    //     AGame.HttpClient.serverUrl = ClientConst.platformHost;
    //     let params: any = {};
    //     params.action = "game.share_scene";
    //     params.scene_type = shareDotType;
    //     AGame.HttpClient.get(callback, target, params);
    // }

    // /**
    //  * 微信分享打点
    //  */
    // public static wxshareDot(point_id, event, imgId = 0) {
    //     if (point_id >= 1) {
    //         AGame.HttpClient.serverUrl = ClientConst.platformHost;
    //         let params: any = {};
    //         params.action = "user.wxShare";
    //         params.point_id = point_id;
    //         params.open_id = ClientConst.openId;
    //         params.event = event;
    //         params.device_type = ClientConst.deviceType();
    //         params.img_id = imgId;
    //         params.channel = ClientConst.channel;
    //         params.platform = ClientConst.splatform;
    //         AGame.HttpClient.get(null, null, params, egret.HttpResponseType.TEXT);
    //     }
    // }

    // public static getPayOrder(order, callback: Function, target: any) {
    //     AGame.HttpClient.serverUrl = ClientConst.platformHost;
    //     let params: any = {};
    //     params.action = "pay.order";
    //     params.platform = ClientConst.platform;
    //     params.type = order.type;
    //     params.rid = order.rid;
    //     params.server_id = ClientConst.serverId;
    //     params.goods_id = order.goods_id;
    //     params.level = order.level;
    //     params.power = order.power;

    //     params.idfa = ClientConst.idfa;
    //     params.MacId = ClientConst.MacId;
    //     params.os = ClientConst.os;
    //     params.extra = ClientConst.extra;
    //     let other = ClientConst.platformOther;
    //     if (other) {
    //         for (let key in other) {
    //             params[key] = other[key];
    //         }
    //     }
    //     AGame.HttpClient.get(callback, target, params);
    // }


    // private static callSendRolaInfo(data: any) {
    //     debug("callSendRolaInfo", data);
    // }

    // /**小游戏支付成功回调 */
    // public static sendPayCall(url, callback: Function, target: any,isText = false) {
    //     AGame.HttpClient.serverUrl = url;
    //     if(isText){
    //         AGame.HttpClient.get(callback, target, null, egret.HttpResponseType.TEXT);
    //     }else{
    //         AGame.HttpClient.get(callback, target, null);
    //     }
    // }
    // /**
    //  * 排序 [{age:11}, {age:12}]
    //  * arr : 要排序的数组
    //  * key : 排序的key 比如 age
    //  * asc : 是否升序
    //  */
    // public static sortMap(arr: Array<any>, key: string, asc: boolean = true) {
    //     arr.sort(function (a, b) {
    //         if (asc) {
    //             return a[key] - b[key];
    //         } else {
    //             return b[key] - a[key];
    //         }
    //     });
    // }
}