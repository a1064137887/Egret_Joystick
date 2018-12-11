// TypeScript file

/**
 * class name : GameView
 * description : 游戏场景
 * time : 2018.12.11
 * @author : 杨浩然
 */
class GameView extends eui.Component
{
    private joystickL: Joystick;//左摇杆
    private joystickR: Joystick;//右摇杆
    
    public constructor()
    {
        super();
        this.skinName = "GameViewSkin";
    }


    protected createChildren()
    {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }

    
    private onTouchBegin(event: egret.TouchEvent)
    {
        let touchPoint = new egret.Point(event.stageX, event.stageY);
    }


    private onTouchMove()
    {

    }


    private onTouchEnd()
    {

    }



//class end
}