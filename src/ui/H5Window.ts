/**
 * 窗体基类
 */
class H5Window extends H5View {

	private _enableDrag: boolean = true;

	private _isOpen: boolean = false;

	constructor() {
		super();
	}

	// public setTitleImgCenter(): void {
	// 	if (_windowTitleImg != null) {
	// 		_windowTitleImg.x = (width - _windowTitleImg.width) >> 1;
	// 	}
	// }

	// /**
	//  * 是否能够拖动
	//  * @return boolean
	//  */
	// public get enableDrag(): boolean {
	// 	return _enableDrag;
	// }
	// public set enableDrag(value: boolean): void {
	// 	_enableDrag = value;

	// 	if (value == true) {
	// 		addEventListener(MouseEvent.MOUSE_DOWN, onWindowMouseDown);
	// 	}
	// 	else {
	// 		removeEventListener(MouseEvent.MOUSE_DOWN, onWindowMouseDown);
	// 		removeEventListener(MouseEvent.MOUSE_UP, onWindowMouseUp);
	// 	}
	// }

	// public bindSkin(skin: Skin): void {
	// 	super.bindSkin(skin);
	// }

	// protected goFrontEnd(): void {
	// 	UIBus.getInstance().dispatchEvent(new WindowEvent(WindowEvent.WindowGoFrontEnd, this));
	// }

	// protected onWindowMouseDown(e: MouseEvent): void {
	// 	e.stopPropagation();

	// 	goFrontEnd();

	// 	if (enableDrag) {
	// 		if (e.target == this || e.target == backgroundImage) {
	// 			GlobalContext.getInstance().stage.addEventListener(MouseEvent.MOUSE_UP
	// 				, onWindowMouseUp);
	// 			addEventListener(MouseEvent.ROLL_OUT, onWindowMouseUp);
	// 			addEventListener(MouseEvent.MOUSE_MOVE, onWindowMouseMove);

	// 			/*startDrag(false, new Rectangle(0, 0,
	// 					GlobalContext.getInstance().stage.stageWidth - width,
	// 					GlobalContext.getInstance().stage.stageHeight - height));*/

	// 			startDrag();
	// 		}
	// 	}
	// }

	// protected onWindowMouseUp(e: MouseEvent): void {
	// 	GlobalContext.getInstance().stage.removeEventListener(MouseEvent.MOUSE_UP
	// 		, onWindowMouseUp);
	// 	removeEventListener(MouseEvent.ROLL_OUT, onWindowMouseUp);
	// 	removeEventListener(MouseEvent.MOUSE_MOVE, onWindowMouseMove);

	// 	stopDrag();

	// 	//最后一次也抛出窗口移动事件
	// 	onWindowMouseMove();
	// }

	// protected onWindowMouseMove(e: MouseEvent = null): void {
	// 	// To Do 通知窗体移动了
	// 	this.dispatchEvent(new WindowEvent(WindowEvent.WindowMove));
	// }

	// public get windowTitleImg(): GBitmap {
	// 	return _windowTitleImg;
	// }

	// public setWindowTitleImg(pathName: string): void {
	// 	(Manager.getInstance().getManager(ManagerType.LOAD) as ILoadManager).load(
	// 		PathDefiner.wintitle + pathName + ".png", onLoadWinTitle);
	// }

	// private onLoadWinTitle(bm: Bitmap): void {
	// 	_windowTitleImg.backgroundImage = bm;
	// 	_windowTitleImg.x = (width - _windowTitleImg.width) / 2;
	// 	_windowTitleImg.y = 5;
	// }

	// /**
	//  * 窗体是否被打开
	//  * @return 
	//  */
	// public get isOpen(): boolean {
	// 	return _isOpen;
	// }
	// public set isOpen(value: boolean): void {
	// 	_isOpen = value;
	// }

}