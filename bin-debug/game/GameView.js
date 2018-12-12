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
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        _super.prototype.createChildren.call(this);
    };
    GameView.prototype.onTouchBegin = function (event) {
        var touchPoint = new egret.Point(event.stageX, event.stageY);
        if (touchPoint.x < Main.stageWid / 2) {
            if (this.joystickL.active)
                return;
            console.log(" ===== onViewTouchBegin left ===== ");
            this.joystickL.x = touchPoint.x;
            this.joystickL.y = touchPoint.y;
            this.joystickL.alpha = 1;
            this.joystickL.enable(event);
        }
        else {
            if (this.joystickR.active)
                return;
            console.log(" ===== onViewTouchBegin right ===== ");
            this.joystickR.x = touchPoint.x;
            this.joystickR.y = touchPoint.y;
            this.joystickR.alpha = 1;
            this.joystickR.enable(event);
        }
        this.touchEnabled = false;
    };
    return GameView;
}(eui.Component));
__reflect(GameView.prototype, "GameView");
window["GameView"] = GameView;
//# sourceMappingURL=GameView.js.map