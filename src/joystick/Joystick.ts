// TypeScript file

/**
 * class name : Joystick
 * description : 摇杆
 * time : 2018.12.11
 * @author : 杨浩然
 */
class Joystick extends eui.Component
{
    public active: boolean = false;//是否激活
    public touchID: number;//触摸ID
    public radius: number;//摇杆可移动的极限半径
    // public sensor: eui.Group;
    // public joyGroup: eui.Group;
    private joystick: eui.Image;
    private joystickBg: eui.Image;

    private defaultAlpha: number;//整个摇杆默认透明度
    private defaultPoint: egret.Point;//整个摇杆默认位置

    private joyDefaultPoint: egret.Point;//摇杆头的初始位置
    private joyStartPoint: egret.Point;//摇杆头开始触摸的位置
    private joyMovePoint: egret.Point;//摇杆头触摸移动时的位置

    public constructor()
    {
        super();
    }

    protected createChildren()
    {
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
    }

    /** 设置摇杆的位置 */
    // public setJoyPosition(point: egret.Point)
    // {
    //     this.joyGroup.x = point.x;
    //     this.joyGroup.y = point.y;
    //     this.defaultPoint.x = this.joyGroup.x;
    //     this.defaultPoint.y = this.joyGroup.y;
    // }


    public enable(event: egret.TouchEvent)
    {
        if(this.active) return;

        this.active = true;
        this.touchID = event.touchPointID;
        this.joyStartPoint.x = event.stageX, this.joyStartPoint.y = event.stageY;
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }


    private onTouchMove(event: egret.TouchEvent)
    {
        if(event.touchPointID != this.touchID) return;
        // console.log(" ===== onJoystickTouchMove ===== ");
        this.joyMovePoint.x = event.stageX;
        this.joyMovePoint.y = event.stageY;
        let distance = egret.Point.distance(this.joyStartPoint, this.joyMovePoint);
        if(distance <= this.radius)//在半径内
        {
            this.joystick.x = this.joyDefaultPoint.x + (this.joyMovePoint.x - this.joyStartPoint.x);
            this.joystick.y = this.joyDefaultPoint.y + (this.joyMovePoint.y - this.joyStartPoint.y);
        }
        else//在半径外
        {
            //joyStartPoint 和 joyMovePoint 是绝对坐标
            let point = egret.Point.interpolate(this.joyMovePoint, this.joyStartPoint, this.radius / distance);
            this.joystick.x = this.joyDefaultPoint.x + (point.x - this.joyStartPoint.x);
            this.joystick.y = this.joyDefaultPoint.y + (point.y - this.joyStartPoint.y)
        }
    }

    private onTouchOutside(event: egret.TouchEvent)
    {
        if(event.touchPointID != this.touchID) return;
        // console.log(" ===== onJoystickTouchOutside ===== ");
        this.touchEnd();
    }

    private onTouchEnd(event: egret.TouchEvent)
    {
        if(event.touchPointID != this.touchID) return;
        // console.log(" ===== onJoystickTouchEnd ===== ");
        this.touchEnd();
    }

    /** 当触摸结束时的处理工作 */
    private touchEnd()
    {
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
    }


//class end
}

window["Joystick"] = Joystick;