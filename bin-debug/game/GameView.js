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
        return _this;
    }
    GameView.prototype.createChildren = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    GameView.prototype.onTouchBegin = function (event) {
        var touchPoint = new egret.Point(event.stageX, event.stageY);
    };
    GameView.prototype.onTouchMove = function () {
    };
    GameView.prototype.onTouchEnd = function () {
    };
    return GameView;
}(eui.Component));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map