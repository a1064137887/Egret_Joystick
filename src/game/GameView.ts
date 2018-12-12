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
    private startPointL: egret.Point;//开始触摸的点，左
    private startPointR: egret.Point;//开始触摸的点，右
        
    public constructor()
    {
        super();
        this.skinName = "GameViewSkin";
        this.startPointL = new egret.Point();
        this.startPointR = new egret.Point();        
    }


    protected createChildren()
    {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        super.createChildren();
    }

    
    private onTouchBegin(event: egret.TouchEvent)
    {
        let touchPoint = new egret.Point(event.stageX, event.stageY);
        if(touchPoint.x < Main.stageWid / 2)
        {
            if(this.joystickL.active) return;
            console.log(" ===== onViewTouchBegin left ===== ");
            this.joystickL.x = touchPoint.x;
            this.joystickL.y = touchPoint.y;
            this.joystickL.alpha = 1;
            this.joystickL.enable(event);
        }
        else 
        {
            if(this.joystickR.active) return;
            console.log(" ===== onViewTouchBegin right ===== ");
            this.joystickR.x = touchPoint.x;
            this.joystickR.y = touchPoint.y;
            this.joystickR.alpha = 1;
            this.joystickR.enable(event);
        }
        this.touchEnabled = false;
    }


//class end
}

window["GameView"] = GameView;