class LoadingUI extends egret.Sprite implements IDispose{

    public bg: H5Image;
    public logo: H5Image;


    public constructor() {
        super();
    }

    $onRemoveFromStage(isclear = true): void {
        super.$onRemoveFromStage();
    }

    public dispose(): void {
        this.parent && this.parent.removeChild(this);
    }

}
