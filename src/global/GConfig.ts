/**
 * 全局配置
 * @author zx
 */
class GConfig {
	/** 版本号 */
	public static version: string = "201902191733";

	/** 游戏类型(0：原生，1：微信小游戏) */
	public static gameType: number = 1;
	/** 游戏名字 */
	public static gameName: string = "";
	/** 服务端地址 */
	public static serverAddress: string = null;
	/** 服务端端口 */
	public static serverPort: number = 0;
	/** 平台 */
	public static platform: string = null;
	/** cdn地址 */
	public static cdn: string = null;
	/** 资源根目录 */
	public static resRoot:string = "resource/";
	/** 区号 */
	public static zoneId: number = 0;
	/** 登录名 */
	public static loginName: string = null;
	/**  */
	public static ticket: string = null;
	/**  */
	public static timestamp: number = 0;
	/** 官网地址 */
	public static officialUrl: string = null;
	/** 论坛地址 */
	public static BBSUrl: string = null;
	/** 充值地址 */
	public static rechargeUrl: string = null;
	/** 是否使用游客模式(0:否 1:是) */
	public static guestMode: number = 0;

	/** socket调试开关 */
	public static socketDebug: Boolean = false;
	/** 本地缓存开关 */
	public static cacherOpen: Boolean = false;
	/** 加载日志上传开关 */
	public static loadRecordOpen: Boolean = false;

	/** 所在城市 */
	public static city: string = "";
	/** 游戏开始时间 */
	public static startTime: number;
	/** 游戏开服时间 */
	public static openGameTime: number = 0;
	/** 创建角色时间戳*/
	public static creatRoleTime: number = 0;

	/** 默认字体 */
	public static fontFamily: string = "SimHei";
	/** 是否https */
	public static isHttps: boolean = true;
	/** 是否启用protobuf */
	public static isProtoBuf: boolean = true;
	/** 缩放模式 */
	public static scaleMode: string = "fixedWidth";

	public static init(rawCfg: any): void {
		let self = this;
		if (rawCfg == null) {
			self.gameName = "game";
			self.serverAddress = "sy.dev";
			self.serverPort = 8001;
			self.platform = "dev";
			self.zoneId = 1;

			self.cdn = "";
			self.loginName = "role1";
			self.timestamp = 12345678;
			self.ticket = "1234567890abcdef222";
			self.officialUrl = "";
			self.BBSUrl = "";
			self.rechargeUrl = "";
			self.guestMode = 0;
		} else {
			self.gameName = rawCfg.game_name;
			self.serverAddress = rawCfg.ip;
			self.serverPort = rawCfg.port;
			self.platform = rawCfg.platform;
			self.zoneId = rawCfg.zone_id;

			self.cdn = rawCfg.cdn;
			self.loginName = rawCfg.name;
			self.timestamp = rawCfg.timestamp;
			self.ticket = rawCfg.ticket;
			self.officialUrl = rawCfg.url;
			self.BBSUrl = rawCfg.bbs;
			self.rechargeUrl = rawCfg.pay_url;
			self.guestMode = rawCfg.guest_mode;
		}

		self.startTime = egret.getTimer();
	}

	/** 是否原生 */
	public static get isNative(): boolean {
		return this.gameType == 0;
	}

	/** 是否微信小游戏 */
	public static get isWxgame(): boolean {
		return this.gameType == 1;
	}
}