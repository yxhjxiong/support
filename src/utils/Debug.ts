/**
 * 全局打印
 */
class Debug {
    public static readonly LEVEL_1: number = 1;

    public static readonly LEVEL_2: number = 2;

    public static readonly LEVEL_3: number = 3;

    /** 当前打印级别 */
    public static logLevel: number = 1;

    /**
     * 打印-级别低
     * @param msg 
     * @param args 
     */
    public static print(msg: any, ...args): void {
        if (this.logLevel < this.LEVEL_3) return;
        this.format(msg, ...args);
    }

    /**
     * 打印-级别中
     * @param msg 
     * @param args 
     */
    public static trace(msg: any, ...args): void {
        if (this.logLevel < this.LEVEL_2) return;
        this.format(msg, ...args);
    }

    /**
     * 打印-级别高
     * @param msg 
     * @param args 
     */
    public static log(msg: any, ...args): void {
        if (this.logLevel < this.LEVEL_1) return;
        this.format(msg, ...args);
    }

    private static format(msg: any, ...args): void {
        if (!msg) return;
        if (typeof msg === "string") {
            msg = StringUtil.substitute(msg, ...args);
        }
        egret.log(msg, ...args);
    }
}