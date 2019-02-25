/**
 * 事件工具类
 */
class EventUtil {
    private static eventMap: any = {};
    private static otherEventMap: any = {};
    private static isAddStageEvent: boolean = false;

    private static addEvent(object: egret.EventDispatcher, type: string, listener: Function, thisObject: any,
        useCapture?: boolean, priority?: number, param?: any): void {
        let eventList = this.eventMap[object.hashCode];
        if (!eventList) {
            eventList = [];
            this.eventMap[object.hashCode] = eventList;
        }
        eventList.push({ object, type, listener, thisObject, useCapture, priority, param });
    }

    private static addOtherEvent(object: egret.EventDispatcher, type: string, param?: any): void {
        let eventList = this.otherEventMap[object.hashCode];
        if (!eventList) {
            eventList = [];
            this.otherEventMap[object.hashCode] = eventList;
        }
        eventList.push({ object, type, param });
    }

    private static removeOtherEvent(object: egret.EventDispatcher): void {
        let event = this.otherEventMap[object.hashCode];
        delete this.otherEventMap[object.hashCode];
        if (event) {
            egret.Tween.removeTweens(object);
        }
        event = null;
    }

    /** 添加点击事件 */
    public static addTouchTapListener(object: egret.EventDispatcher, listener: Function, thisObject: any,
        useCapture?: boolean, priority?: number) {
        EventUtil.addEventListener(object, egret.TouchEvent.TOUCH_TAP, listener, thisObject, useCapture, priority);
    }

    /** 添加缩放点击事件，按钮效果 */
    public static addTouchScaleListener(object: egret.DisplayObject, listener: Function, thisObject: any,
        useCapture?: boolean, priority?: number) {
        EventUtil.addEventListener(object, egret.TouchEvent.TOUCH_TAP, listener, thisObject, useCapture, priority);
        let scaleParam: any = { isScale: false };
        scaleParam.scaleX1 = object.scaleX * 0.85;
        scaleParam.scaleY1 = object.scaleY * 0.85;
        scaleParam.scaleX2 = object.scaleX;
        scaleParam.scaleY2 = object.scaleY;
        this.addOtherEvent(object, "touchBegin", scaleParam);
        object.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchScaleBeginHandler, this);
        this.addOtherEvent(object, "touchScale", scaleParam);
        if (!this.isAddStageEvent) {
            this.isAddStageEvent = true;
            GContext.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchScaleEndHandler, this);
        }
    }

    /** 添加列表项选中事件 */
    public static addItemTapListener(object: eui.ListBase, listener: Function, thisObject: any,
        useCapture?: boolean, priority?: number) {
        EventUtil.addEventListener(object, eui.ItemTapEvent.ITEM_TAP, listener, thisObject, useCapture, priority);
    }

    /** 添加事件 */
    public static addEventListener(object: egret.EventDispatcher, type: string, listener: Function, thisObject: any,
        useCapture?: boolean, priority?: number, param?: any): void {
        this.addEvent(object, type, listener, thisObject, useCapture, priority, param);
        object.addEventListener(type, this.onEventHandler, this, useCapture, priority);
    }

    /** 移除指定目标所有事件 */
    public static removeEventListener(object: any) {
        if (!object) return;
        this.removeOtherEvent(object);
        let key = object.hashCode;
        let eventList = this.eventMap[key];
        delete this.eventMap[key];
        if (!eventList) return;
        let len = eventList.length;
        for (let i = 0; i < len; i++) {
            let event = eventList[i];
            event.object.removeEventListener(event.type, event.listener, event.thisObject, event.useCapture);
        }
    }

    /** 移除指定事件作用者所有事件 */
    public static removeEventListeners(thisObject: egret.DisplayObject): void {
        if (!thisObject) return;
        for (let key in this.eventMap) {
            let eventList = this.eventMap[key];
            if (!eventList) continue;
            let len = eventList.length;
            for (let i = len - 1; i >= 0; i--) {
                let event = eventList[i];
                if (event.thisObject != thisObject) continue;
                this.removeOtherEvent(event.object);
                eventList.splice(i, 1);
                event.object.removeEventListener(event.type, event.listener, event.thisObject, event.useCapture);
            }
            if (eventList.length > 0) continue;
            delete this.eventMap[key];
        }
    }

    private static onEventHandler(e: egret.Event): void {
        let type = e.type;
        let target = e.currentTarget;
        let eventList = this.eventMap[target.hashCode];
        if (!eventList) return;
        let len = eventList.length;
        for (let i = 0; i < len; i++) {
            let event = eventList[i];
            if (event.type != type) continue;
            event.listener.apply(event.thisObject, [e]);
        }
    }

    private static onTouchScaleBeginHandler(e: egret.TouchEvent): void {
        let type = e.type;
        let target = e.currentTarget;
        let eventList = this.otherEventMap[target.hashCode];
        if (!eventList) return;
        for (let index in eventList) {
            let event = eventList[index];
            if (event.type != "touchBegin") continue;
            if (event.param && event.param.scaleX1 != null && event.param.scaleY1 != null) {
                event.param.isScale = true;
                egret.Tween.removeTweens(target);
                egret.Tween.get(target).to({ scaleX: event.param.scaleX1, scaleY: event.param.scaleY1 }, 100);
            }
        }
    }

    private static onTouchScaleEndHandler(e: egret.TouchEvent): void {
        for (let key in this.otherEventMap) {
            let eventList = this.otherEventMap[key];
            for (let index in eventList) {
                let event = eventList[index];
                if (!event.object) continue;
                if (event.type != "touchScale") continue;
                if (event.param && event.param.scaleX2 != null && event.param.scaleY2 != null) {
                    if (event.param.isScale == false) continue;
                    event.param.isScale = false;
                    egret.Tween.removeTweens(event.object);
                    egret.Tween.get(event.object).to({ scaleX: event.param.scaleX2 * 1.1, scaleY: event.param.scaleY2 * 1.1 }, 80)
                        .to({ scaleX: event.param.scaleX2, scaleY: event.param.scaleY2 }, 50);
                }
            }
        }
    }
}