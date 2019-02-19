/**
 * 全局分层定义
 * @author zx
 */
class GlobalLayers {
	/** 根容器 */
	public root: egret.DisplayObjectContainer = null;
	/** 场景层 */
	public scene: egret.Sprite = null;
	/** 战斗层 */
	public battle: egret.Sprite = null;
	/** UI层 */
	public ui: egret.Sprite = null;
	/** 窗口层 */
	public window: egret.Sprite = null;
	/** 效果层 */
	public effect: egret.Sprite = null;
	/** 辅助层 */
	public helper: egret.Sprite = null;
	/** 消息层 */
	public message: egret.Sprite = null;
	/** 通知层 */
	public notify: egret.Sprite = null;
	/** 引导层 */
	public guide: egret.Sprite = null;
	/** 剧情层 */
	public gameflow: egret.Sprite = null;
	/** 对话框层 */
	public dialog: egret.Sprite = null;
	/** 公共控制层 */
	public controller: egret.Sprite = null;
	/** tips层 */
	public tips: egret.Sprite = null;
	/** 加载专用层 */
	public loading: egret.Sprite = null;
	/** 调试层 */
	public debug: egret.Sprite = null;

	public init(container: egret.DisplayObjectContainer): void {
		let self = this;
		self.root = container;
		self.root.touchEnabled = false;

		self.scene = new egret.Sprite();
		self.root.addChild(self.scene);

		self.battle = new egret.Sprite();
		self.root.addChild(self.battle);

		self.ui = new egret.Sprite();
		self.ui.touchEnabled = false;
		self.root.addChild(self.ui);

		self.window = new egret.Sprite();
		self.window.touchEnabled = false;
		self.root.addChild(self.window);

		self.effect = new egret.Sprite();
		self.effect.touchEnabled = false;
		self.effect.touchChildren = false;
		self.root.addChild(self.effect);

		self.helper = new egret.Sprite();
		self.helper.touchEnabled = false;
		self.helper.touchChildren = false;
		self.root.addChild(self.helper);

		self.message = new egret.Sprite();
		self.message.touchEnabled = false;
		self.root.addChild(self.message);

		self.notify = new egret.Sprite();
		self.notify.touchEnabled = false;
		self.root.addChild(self.notify);

		self.guide = new egret.Sprite();
		self.guide.touchEnabled = false;
		self.root.addChild(self.guide);

		self.gameflow = new egret.Sprite();
		self.root.addChild(self.gameflow);

		self.dialog = new egret.Sprite();
		self.dialog.touchEnabled = false;
		self.root.addChild(self.dialog);

		self.controller = new egret.Sprite();
		self.root.addChild(self.controller);

		self.tips = new egret.Sprite();
		self.root.addChild(self.tips);

		self.loading = new egret.Sprite();
		self.root.addChild(self.loading);

		self.debug = new egret.Sprite();
		self.root.addChild(self.debug);
	}
}