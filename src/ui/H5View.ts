/**
 * 视图基类
 */
class H5View extends eui.Component implements IDispose {

    constructor() {
        super();
    }

    public dispose(): void {

    }

    protected createChildren(): void {
        super.createChildren();
        //todo
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        //todo
    }

    /**
     * 该方法在当前容器中查找指定名称的挂件，如果找不到则会递归查找他下属
     * 的自容器内的内容。注意不要过渡使用。
     * @param name:string
     * @return DisplayObject
     */
    public getChildByName(name: string): egret.DisplayObject {
        var obj: egret.DisplayObject = super.getChildByName(name);
        if (null == obj) {
            var total: number = this.numChildren;
            var objContainer: egret.DisplayObjectContainer = null;
            for (var i: number = 0; i < total; i++) {
                objContainer = this.getChildAt(i) as egret.DisplayObjectContainer;
                if (null != objContainer) {
                    obj = objContainer.getChildByName(name);
                    if (null != obj) {
                        return obj;
                    }
                }
            }
        }
        return obj;
    }

    public removeFromParent(): void {
        this.parent && this.parent.removeChild(this);
    }

}