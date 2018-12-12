// TypeScript file

/**
 * class name : Joystick
 * description : 摇杆
 * time : 2018.12.11
 * @author : 杨浩然
 */
class Joystick extends eui.Component
{
    public sensor: eui.Rect;
    public joyGroup: eui.Group;
    private joystick: eui.Image;
    private joystickBg: eui.Image;

    private defaultAlpha: number;//默认透明度
    private defaultPoint: egret.Point;//默认位置
    private joyDefaultPoint: egret.Point;//摇杆的初始位置
    private joyStartPoint: egret.Point;//开始触摸的位置
    private joyMovePoint: egret.Point;//触摸移动时的位置

    public constructor()
    {
        super();
    }

    protected createChildren()
    {
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
    }

    /** 设置摇杆的位置 */
    public setJoyPosition(point: egret.Point)
    {
        this.joyGroup.x = point.x;
        this.joyGroup.y = point.y;
        this.defaultPoint.x = this.joyGroup.x;
        this.defaultPoint.y = this.joyGroup.y;
    }

    private onTouchBegin(event: egret.TouchEvent)
    {
        console.log(" ===== onJoystickTouchBegin ===== ");
        this.joyStartPoint.x = event.stageX, this.joyStartPoint.y = event.stageY;
        this.joyGroup.alpha = 1;

        let point = new egret.Point();//申请一个点做世界转局部的存储变量
        this.globalToLocal(event.stageX, event.stageY, point);
        this.joyGroup.x = point.x;
        this.joyGroup.y = point.y;
        
        this.sensor.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.sensor.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.sensor.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchMove(event: egret.TouchEvent)
    {
        console.log(" ===== onJoystickTouchMove ===== ");
        this.joyMovePoint.x = event.stageX;
        this.joyMovePoint.y = event.stageY;
        
        this.joystick.x = this.joyDefaultPoint.x + this.joyMovePoint.x - this.joyStartPoint.x;
        this.joystick.y = this.joyDefaultPoint.y + this.joyMovePoint.y - this.joyStartPoint.y;
    }

    private onTouchOutside(event: egret.TouchEvent)
    {
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
    }

    private onTouchEnd(event: egret.TouchEvent)
    {
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
    }


//class end
}