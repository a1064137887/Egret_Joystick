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
 * class name : JoyStick
 * description : 摇杆
 * time : 2018.12.11
 * @author : 杨浩然
 */
var Joystick = (function (_super) {
    __extends(Joystick, _super);
    function Joystick() {
        var _this = _super.call(this) || this;
        _this.defaultAlpha = 0.3; //默认透明度
        return _this;
    }
    Joystick.prototype.createChildren = function () {
        this.skinName = "JoystickSkin";
    };
    return Joystick;
}(eui.Component));
__reflect(Joystick.prototype, "Joystick");
//# sourceMappingURL=Joystick.js.map