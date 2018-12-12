// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * class name : Joystick
 * description : 摇杆
 * time : 2018.12.11
 * @author : 杨浩然
 */
var Joystick = (function (_super) {
    __extends(Joystick, _super);
    function Joystick() {
        var _this = _super.call(this) || this;
        _this.active = false; //是否激活
        return _this;
    }
    Joystick.prototype.createChildren = function () {
        this.skinName = "JoystickSkin";
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        // this.sensor.touchThrough = true;
        // this.joystick.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        // this.joystick.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        // this.joystick.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        // this.joystick.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCanel, this);
        this.defaultAlpha = 0.3;
        this.defaultPoint = new egret.Point(this.x, this.y);
        this.joyDefaultPoint = new egret.Point(this.joystick.x, this.joystick.y);
        this.joyStartPoint = new egret.Point();
        this.joyMovePoint = new egret.Point();
        this.radius = this.joystickBg.width / 2;
    };
    /** 设置摇杆的位置 */
    // public setJoyPosition(point: egret.Point)
    // {
    //     this.joyGroup.x = point.x;
    //     this.joyGroup.y = point.y;
    //     this.defaultPoint.x = this.joyGroup.x;
    //     this.defaultPoint.y = this.joyGroup.y;
    // }
    Joystick.prototype.enable = function (event) {
        if (this.active)
            return;
        this.active = true;
        this.touchID = event.touchPointID;
        this.joyStartPoint.x = event.stageX, this.joyStartPoint.y = event.stageY;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Joystick.prototype.onTouchMove = function (event) {
        if (event.touchPointID != this.touchID)
            return;
        // console.log(" ===== onJoystickTouchMove ===== ");
        this.joyMovePoint.x = event.stageX;
        this.joyMovePoint.y = event.stageY;
        var distance = egret.Point.distance(this.joyStartPoint, this.joyMovePoint);
        // if(distance <= this.radius)//在半径内
        // {
        //     this.joystick.x = this.joyDefaultPoint.x + this.joyMovePoint.x - this.joyStartPoint.x;
        //     this.joystick.y = this.joyDefaultPoint.y + this.joyMovePoint.y - this.joyStartPoint.y;
        // }
        // else//在半径外
        // {
        //     //joyStartPoint 和 joyMovePoint 是绝对坐标
        //     let point = egret.Point.interpolate(this.joyStartPoint, this.joyMovePoint, this.radius / distance);
        //     point = this.globalToLocal(point.x, point.y);
        //     let tmpPoint = this.globalToLocal(this.joyStartPoint.x, this.joyStartPoint.y);
        //     this.joystick.x = point.x - tmpPoint.x;
        //     this.joystick.y = point.y - tmpPoint.y;
        // }
        this.joystick.x = this.joyDefaultPoint.x + this.joyMovePoint.x - this.joyStartPoint.x;
        this.joystick.y = this.joyDefaultPoint.y + this.joyMovePoint.y - this.joyStartPoint.y;
    };
    Joystick.prototype.onTouchOutside = function (event) {
        if (event.touchPointID != this.touchID)
            return;
        // console.log(" ===== onJoystickTouchOutside ===== ");
        this.touchEnd();
    };
    Joystick.prototype.onTouchEnd = function (event) {
        if (event.touchPointID != this.touchID)
            return;
        // console.log(" ===== onJoystickTouchEnd ===== ");
        this.touchEnd();
    };
    /** 当触摸结束时的处理工作 */
    Joystick.prototype.touchEnd = function () {
        this.active = false;
        this.alpha = this.defaultAlpha;
        this.touchEnabled = false;
        this.x = this.defaultPoint.x;
        this.y = this.defaultPoint.y;
        this.joystick.x = this.joyDefaultPoint.x;
        this.joystick.y = this.joyDefaultPoint.y;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    return Joystick;
}(eui.Component));
__reflect(Joystick.prototype, "Joystick");
window["Joystick"] = Joystick;
//# sourceMappingURL=Joystick.js.map