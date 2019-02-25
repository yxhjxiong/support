/**
 * A*寻路网格数据
 */
class AStarGrid extends egret.HashObject implements IPoolable {
	private _startNode: AStarNode;    //起点
	private _endNode: AStarNode;      //终点
	private _nodes: Array<any>;  //AStarNode二维数组
	private _numCols: number;    //网格行列
	private _numRows: number;

	public constructor() {
		super();
	}

	public initPoolable(...params): void {
		let self = this;
		self._numCols = params[0];
		self._numRows = params[1];
		self._nodes = [];

		for (let i: number = 0; i < self._numCols; i++) {
			self._nodes[i] = [];
			for (let j: number = 0; j < self._numRows; j++) {
				self._nodes[i][j] = Pools.borrowItem(AStarNode, i, j) as AStarNode;
			}
		}
	}

	public resetPoolable(): void {
		let self = this;
		if (self._nodes) {
			for (let i: number = 0; i < self._numCols; i++) {
				for (let j: number = 0; j < self._numRows; j++) {
					Pools.returnItem(self._nodes[i][j]);
				}
			}
		}
		self._startNode = null;
		self._endNode = null;
		self._nodes = null;
		self._numCols = null;
		self._numRows = null;
	}

	public dispose(): void {

	}

	public getNode(x: number, y: number): AStarNode {
		return this._nodes[x][y];
	}

	public setWalkable(x: number, y: number, value: boolean) {
		this._nodes[x][y].walkable = value;
	}

	public setEndNode(x: number, y: number) {
		this._endNode = this._nodes[x][y];
	}

	public setStartNode(x: number, y: number) {
		this._startNode = this._nodes[x][y];
	}

	public get startNode() {
		return this._startNode;
	}

	public get endNode() {
		return this._endNode;
	}

	public get numCols() {
		return this._numCols;
	}

	public get numRows() {
		return this._numRows;
	}
}