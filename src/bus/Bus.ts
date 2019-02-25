/**
 * 总线集合
 */
class Bus {
    /** 命令总线 */
    public static Cmd: CmdBus;
    /** 配置总线 */
    public static Conf: ConfBus;
    /** 语言总线 */
    public static Lan: LanBus;
    /** 缓动总线 */
    public static Tween: TweenBus;
    /** 事件总线 */
    public static Event: EventBus;

    public static init(): void {
        let self = this;
        if (!self.Cmd) {
            self.Cmd = new CmdBus();
        }

        if (!self.Conf) {
            self.Conf = new ConfBus();
        }

        if (!self.Lan) {
            self.Lan = new LanBus();
        }

        if (!self.Tween) {
            self.Tween = new TweenBus();
        }

        if (!self.Event) {
            self.Event = new EventBus();
        }
    }
}