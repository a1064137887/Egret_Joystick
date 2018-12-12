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
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        super.createChildren();
        this.createJoystick();
    }

    /** 创建摇杆 */
    private createJoystick()
    {
        this.joystickL = new Joystick();
        this.joystickR = new Joystick();

        this.joystickL.width = Main.stageWid / 2;
        this.joystickL.height = Main.stageHei;
        this.addChild(this.joystickL);

        this.joystickR.x = Main.stageWid / 2;
        this.joystickR.width = Main.stageWid / 2;
        this.joystickR.height = Main.stageHei;
        this.addChild(this.joystickR);

        let point = new egret.Point(50 + this.joystickL.joyGroup.anchorOffsetX, Main.stageHei - this.joystickL.joyGroup.height + this.joystickL.joyGroup.anchorOffsetY - 50);
        this.joystickL.setJoyPosition(this.joystickL.globalToLocal(point.x, point.y));

        point = new egret.Point(Main.stageWid - this.joystickR.joyGroup.anchorOffsetX - 50, this.joystickL.joyGroup.y);
        this.joystickR.setJoyPosition(this.joystickR.globalToLocal(point.x, point.y));
    }
    
    // private onTouchBegin(event: egret.TouchEvent)
    // {
    //     let touchPoint = new egret.Point(event.stageX, event.stageY);
    //     if(touchPoint.x < Main.stageWid / 2)
    //     {
    //         console.log(" ===== onViewTouchBegin left ===== ");
    //         this.startPointL = touchPoint;
    //         this.joystickL.alpha = 1;
    //         this.joystickL.x = touchPoint.x;
    //         this.joystickL.y = touchPoint.y;
    //         this.joystickL.touchEnabled = true;
    //     }
    //     else 
    //     {
    //         console.log(" ===== onViewTouchBegin right ===== ");
    //         this.startPointR = touchPoint;
    //         this.joystickR.alpha = 1;
    //         this.joystickR.x = touchPoint.x;
    //         this.joystickR.y = touchPoint.y;
    //         this.joystickR.touchEnabled = true;
    //     }
    //     this.touchEnabled = false;
    // }


//class end
}