class LoginUI extends egret.Sprite implements IDispose{
    public constructor() {
        super();
    }

    public dispose() {
        this.parent && this.parent.removeChild(this);
    }
}