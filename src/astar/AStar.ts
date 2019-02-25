/**
 * A*寻路
 */
class AStar {
	private static _open: any;         //待考察表
	private static _closed: any;       //已考察表
	private static _openMap: any;
	private static _closeMap: any;
	private static _minF: number;
	private static _maxF: number;
	private static _straightCost: number = 10;  //上下左右走的代价
	private static _diagCost: number = 14;  	//斜着走的代价

	/**
	 * 寻路
	 */
	public static findPath(grid: AStarGrid): Array<AStarNode> {
		let startNode = grid.startNode;
		let endNode = grid.endNode;
		startNode.setGH(0, this.diagonal(startNode, endNode));

		this._open = {};
		this._closed = {};
		this._openMap = {};
		this._closeMap = {};
		this._minF = startNode.f;
		this._maxF = startNode.f;
		
		let pathList = this.search(grid);

		this._open = null;
		this._closed = null;
		this._openMap = null;
		this._closeMap = null;

		return pathList;
	}

	//查找路径
	private static search(grid: AStarGrid): Array<AStarNode> {
		var self = this;
		var node = grid.startNode;
		var endNode = grid.endNode;
		while (node != endNode) {
			var startX = Math.max(0, node.x - 1);
			var endX = Math.min(grid.numCols - 1, node.x + 1);
			var startY = Math.max(0, node.y - 1);
			var endY = Math.min(grid.numRows - 1, node.y + 1);

			for (var i = startX; i <= endX; i++) {
				for (var j = startY; j <= endY; j++) {
					//不让斜着走
					if (i != node.x && j != node.y) {
						continue;
					}
					var testNode: AStarNode = grid.getNode(i, j);
					if (testNode == node || self.isClosed(testNode)) {
						continue;
					}
					if (!testNode.walkable ||
						!grid.getNode(node.x, testNode.y).walkable ||
						!grid.getNode(testNode.x, node.y).walkable) {
						continue;
					}

					var cost: number = self._straightCost;
					if (!((node.x == testNode.x) || (node.y == testNode.y))) {
						cost = self._diagCost;
					}
					var g = node.g + cost * testNode.costMultiplier;
					var h = self.diagonal(testNode, endNode);
					if (self.isOpen(testNode)) {
						var f = g + h;
						if (testNode.f > f) {
							self.removeOpen(testNode);
							testNode.setGH(g, h);
							testNode.parent = node;
							self.pushOpenNode(testNode);
						}
					} else {
						testNode.setGH(g, h);
						testNode.parent = node;
						self.pushOpenNode(testNode);
						self._openMap[testNode.hashCode] = true;
					}
					self._minF = Math.min(self._minF, testNode.f);
					self._maxF = Math.max(self._maxF, testNode.f);
				}
			}
			self._closeMap[node.hashCode] = true;

			node = self.getOpenNode();
			if (!node) {
				Debug.log("寻路失败");
				return null;
			}
		}
		return self.buildPath(grid);
	}

	//构建路径
	private static buildPath(grid: AStarGrid): Array<AStarNode> {
		let pathList = [];
		let startNode = grid.startNode;
		var node = grid.endNode;
		pathList.push(node);
		while (node != startNode) {
			node = node.parent;
			pathList.push(node);
		}
		return pathList;
	}

	private static pushOpenNode(node: AStarNode): void {
		let openList = this._open[node.f];
		if (!openList) {
			openList = [];
			this._open[node.f] = openList;
		}
		openList.push(node);
	}

	private static removeOpen(node: AStarNode): void {
		let openList = this._open[node.f];
		let index = openList.indexOf(node);
		if (index == -1) return;
		openList.splice(index, 1);
	}

	private static getOpenNode(): AStarNode {
		let self = this;
		for (let f = self._minF; f <= self._maxF; f += 2) {
			let openList = self._open[f];
			if (!openList || openList.length == 0) continue;
			return openList.pop();
		}
		return null;
	}

	//是否待检查
	private static isOpen(node: AStarNode): boolean {
		return this._openMap[node.hashCode] == true;
	}

	//是否已检查
	private static isClosed(node: AStarNode): boolean {
		return this._closeMap[node.hashCode] == true;
	}

	//曼哈顿算法
	private static manhattan(startNode: AStarNode, endNode: AStarNode): number {
		return Math.abs(startNode.x - endNode.x) * this._straightCost + Math.abs(startNode.y + endNode.y) * this._straightCost;
	}

	private static euclidian(startNode: AStarNode, endNode: AStarNode): number {
		var dx = startNode.x - endNode.x;
		var dy = startNode.y - endNode.y;
		return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
	}

	private static diagonal(startNode: AStarNode, endNode: AStarNode): number {
		var dx = Math.abs(startNode.x - endNode.x);
		var dy = Math.abs(startNode.y - endNode.y);
		var diag = Math.min(dx, dy);
		var straight = dx + dy;
		return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
	}
}