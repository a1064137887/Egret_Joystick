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
 * class name : GameView
 * description : 游戏场景
 * time : 2018.12.11
 * @author : 杨浩然
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameViewSkin";
        _this.startPointL = new egret.Point();
        _this.startPointR = new egret.Point();
        return _this;
    }
    GameView.prototype.createChildren = function () {
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        _super.prototype.createChildren.call(this);
        this.createJoystick();
    };
    /** 创建摇杆 */
    GameView.prototype.createJoystick = function () {
        this.joystickL = new Joystick();
        this.joystickR = new Joystick();
        this.joystickL.width = Main.stageWid / 2;
        this.joystickL.height = Main.stageHei;
        this.addChild(this.joystickL);
        this.joystickR.x = Main.stageWid / 2;
        this.joystickR.width = Main.stageWid / 2;
        this.joystickR.height = Main.stageHei;
        this.addChild(this.joystickR);
        var point = new egret.Point(50 + this.joystickL.joyGroup.anchorOffsetX, Main.stageHei - this.joystickL.joyGroup.height + this.joystickL.joyGroup.anchorOffsetY - 50);
        this.joystickL.setJoyPosition(this.joystickL.globalToLocal(point.x, point.y));
        point = new egret.Point(Main.stageWid - this.joystickR.joyGroup.anchorOffsetX - 50, this.joystickL.joyGroup.y);
        this.joystickR.setJoyPosition(this.joystickR.globalToLocal(point.x, point.y));
    };
    return GameView;
}(eui.Component));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map