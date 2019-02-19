class Bus {
    /** 命令总线 */
    public static Cmd: support.CmdBus;
    /** 配置总线 */
    public static Conf: support.CfgBus;
    /** 语言总线 */
    public static Lan: support.LanBus;
    /** 缓动总线 */
    public static Tween: support.TweenBus;
    /** 事件总线 */
    public static Event: support.EventBus;

    public static init(): void {
        let self = this;
        if (!self.Cmd) {
            self.Cmd = new support.CmdBus();
        }

        if (!self.Conf) {
            self.Conf = new support.CfgBus();
        }

        if (!self.Lan) {
            self.Lan = new support.LanBus();
        }

        if (!self.Tween) {
            self.Tween = new support.TweenBus();
        }

        if (!self.Event) {
            self.Event = new support.EventBus();
        }
    }
}