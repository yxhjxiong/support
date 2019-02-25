/**
 * A*寻路节点
 */
class AStarNode extends egret.HashObject implements IPoolable {

    public x: number;    //列
    public y: number;    //行
    public f: number;    //代价 f = g+h
    public g: number;    //起点到当前点代价
    public h: number;    //当前点到终点估计代价
    public walkable: boolean = true;
    public parent: AStarNode;
    public costMultiplier: number = 1.0;

    public constructor() {
        super();
    }

    public initPoolable(...params): void {
        this.x = params[0];
        this.y = params[1];
    }

    public resetPoolable(): void {
        let self = this;
        self.x = null;
        self.y = null;
        self.f = null;
        self.g = null;
        self.h = null;
        self.walkable = null;
        self.parent = null;
    }

    public dispose(): void {

    }

    public setGH(g: number, h: number): void {
        let self = this;
        self.g = g;
        self.h = h;
        self.f = self.g + self.h;
    }
}