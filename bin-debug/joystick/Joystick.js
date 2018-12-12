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
        return _super.call(this) || this;
    }
    Joystick.prototype.createChildren = function () {
        this.skinName = "JoystickSkin";
        this.sensor.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        // this.joystick.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        // this.joystick.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        // this.joystick.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        // this.joystick.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCanel, this);
        this.defaultAlpha = 0.3;
        this.defaultPoint = new egret.Point(this.joyGroup.x, this.joyGroup.y);
        this.joyDefaultPoint = new egret.Point(this.joystick.x, this.joystick.y);
        this.joyStartPoint = new egret.Point();
        this.joyMovePoint = new egret.Point();
    };
    /** 设置摇杆的位置 */
    Joystick.prototype.setJoyPosition = function (point) {
        this.joyGroup.x = point.x;
        this.joyGroup.y = point.y;
        this.defaultPoint.x = this.joyGroup.x;
        this.defaultPoint.y = this.joyGroup.y;
    };
    Joystick.prototype.onTouchBegin = function (event) {
        console.log(" ===== onJoystickTouchBegin ===== ");
        this.joyStartPoint.x = event.stageX, this.joyStartPoint.y = event.stageY;
        this.joyGroup.alpha = 1;
        var point = new egret.Point(); //申请一个点做世界转局部的存储变量
        this.globalToLocal(event.stageX, event.stageY, point);
        this.joyGroup.x = point.x;
        this.joyGroup.y = point.y;
        this.sensor.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.sensor.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.sensor.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Joystick.prototype.onTouchMove = function (event) {
        console.log(" ===== onJoystickTouchMove ===== ");
        this.joyMovePoint.x = event.stageX;
        this.joyMovePoint.y = event.stageY;
        this.joystick.x = this.joyDefaultPoint.x + this.joyMovePoint.x - this.joyStartPoint.x;
        this.joystick.y = this.joyDefaultPoint.y + this.joyMovePoint.y - this.joyStartPoint.y;
    };
    Joystick.prototype.onTouchOutside = function (event) {
        console.log(" ===== onJoystickTouchOutside ===== ");
        this.joyGroup.alpha = this.defaultAlpha;
        this.touchEnabled = false;
        this.joyGroup.x = this.defaultPoint.x;
        this.joyGroup.y = this.defaultPoint.y;
        this.joystick.x = this.joyDefaultPoint.x;
        this.joystick.y = this.joyDefaultPoint.y;
        this.sensor.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.sensor.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.sensor.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Joystick.prototype.onTouchEnd = function (event) {
        console.log(" ===== onJoystickTouchEnd ===== ");
        this.joyGroup.alpha = this.defaultAlpha;
        this.touchEnabled = false;
        this.joyGroup.x = this.defaultPoint.x;
        this.joyGroup.y = this.defaultPoint.y;
        this.joystick.x = this.joyDefaultPoint.x;
        this.joystick.y = this.joyDefaultPoint.y;
        this.sensor.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.sensor.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.sensor.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    return Joystick;
}(eui.Component));
__reflect(Joystick.prototype, "Joystick");
//# sourceMappingURL=Joystick.js.map