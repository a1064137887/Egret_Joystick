// TypeScript file

/**
 * class name : Joystick
 * description : 摇杆
 * time : 2018.12.11
 * @author : 杨浩然
 */
class Joystick extends eui.Component
{
    // public ishEnd:boolean = false;//是否触发了end事件
    /**是否激活*/
    public active: boolean = false;//是否激活
    /**触摸ID*/
    public touchID: number;//触摸ID
    /*摇杆可移动的极限半径*/
    public radius: number;//摇杆可移动的极限半径
    /**是否需要抬手时清空手柄输出的信号*/
    public resetON: boolean = false;//是否需要抬手时清空手柄输出的信号
    // public up: boolean = false;//向外输出一个手柄触摸抬起的信号

    private joystick: eui.Image;
    private joystickBg: eui.Image;

    private defaultAlpha: number;//整个摇杆默认透明度
    /**整个摇杆默认位置*/
    private defaultPoint: egret.Point;//整个摇杆默认位置

    /**摇杆头的初始位置*/
    private joyDefaultPoint: egret.Point;//摇杆头的初始位置
    /**摇杆头开始触摸的位置*/
    private joyStartPoint: egret.Point;//摇杆头开始触摸的位置
    /**摇杆头触摸移动时的位置*/
    private joyMovePoint: egret.Point;//摇杆头触摸移动时的位置

    /**x轴的偏移*/
    private xAxis: number = 0;//x轴的偏移 [-1 ,1]
    public get XAxis(): number { return this.xAxis; }
    /**y轴的偏移*/
    private yAxis: number = 0;//y轴的偏移 [-1, 1]
    public get YAxis(): number { return this.yAxis; }
    /**摇杆头相对于中心点的角度*/
    private angle: number = 0;//摇杆头相对于中心点的角度 [0, 360)
    public get Angle(): number { return this.angle; }
    /**力度偏移*/
    private offset: number = 0;//力度偏移 [0, 1]
    public get Offset(): number { return this.offset; }

    public constructor()
    {
        super();
    }

    protected createChildren()
    {
        this.skinName = "JoystickSkin";

        this.defaultAlpha = 0.3;
        this.defaultPoint = new egret.Point(this.x, this.y);
        this.joyDefaultPoint = new egret.Point(this.joystick.x, this.joystick.y);
        this.joyStartPoint = new egret.Point();
        this.joyMovePoint = new egret.Point();
        this.radius = this.joystickBg.width / 2;
    }


    public enable(event: egret.TouchEvent)
    {
        if(this.active) return;

        this.active = true;
        // this.up = false;
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
        let sinTheta: number;
        if(distance <= this.radius)//在半径内
        {
            this.joystick.x = this.joyDefaultPoint.x + (this.joyMovePoint.x - this.joyStartPoint.x);
            this.joystick.y = this.joyDefaultPoint.y + (this.joyMovePoint.y - this.joyStartPoint.y);
            sinTheta = (this.joystick.x - this.joyDefaultPoint.x) / distance;
        }
        else//在半径外
        {
            //joyStartPoint 和 joyMovePoint 是绝对坐标
            let point = egret.Point.interpolate(this.joyMovePoint, this.joyStartPoint, this.radius / distance);
            this.joystick.x = this.joyDefaultPoint.x + (point.x - this.joyStartPoint.x);
            this.joystick.y = this.joyDefaultPoint.y + (point.y - this.joyStartPoint.y)
            sinTheta = (this.joystick.x - this.joyDefaultPoint.x) / this.radius;
        }

        //计算数据
        this.offset = (distance / this.radius) > 1 ? 1 : (distance / this.radius);//[0,1]
        this.xAxis = (this.joystick.x - this.joyDefaultPoint.x) / this.radius;//[-1,1]
        this.yAxis = -((this.joystick.y - this.joyDefaultPoint.y) / this.radius);//[-1,1]
        let theta = Math.abs(Math.asin(sinTheta) * (180 / Math.PI)); 
        this.angle = this.verifyAngleOfQuadrant(this.xAxis, this.yAxis, theta);//[0, 360)
        // console.log("joystick :: offset = " + this.offset + "  xAxis = " + this.xAxis + "  yAxis = " + this.yAxis + "  angle = " + this.angle);
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
        // this.up = true;//向外输出一个手柄触摸抬起的信号，使用后记得重置
        this.touchEnd();
    }

    /** 当触摸结束时的处理工作 */
    private touchEnd()
    {
        //重置手柄的一些属性
        this.active = false;
        this.alpha = this.defaultAlpha;
        this.touchEnabled = false;
        this.x = this.defaultPoint.x;
        this.y = this.defaultPoint.y;
        this.joystick.x = this.joyDefaultPoint.x;
        this.joystick.y = this.joyDefaultPoint.y;

        //重置向外输出的数据信息
        if(this.resetON)
        {
            this.angle = 0;
            this.xAxis = 0;
            this.yAxis = 0;
            this.offset = 0;
        }

        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }


    private verifyAngleOfQuadrant(xAxis: number, yAxis: number, theta: number): number
    {
        if(xAxis > 0 && yAxis > 0)//第一象限
        {
            return theta;
        }
        else if(xAxis < 0 && yAxis > 0)//第二象限
        {
            return 360 - theta;
        }
        else if(xAxis < 0 && yAxis < 0)//第三象限
        {
            return 180 + theta;
        }
        else if(xAxis > 0 && yAxis < 0)//第四象限
        {
            return 180 - theta;
        }
        else if(xAxis == 0 && yAxis > 0)//y轴正方向
        {
            return 0;
        }
        else if(xAxis == 0 && xAxis < 0)//y轴负方向
        {
            return 180;
        }
        else if(xAxis > 0 && yAxis == 0)//x轴正方向
        {
            return 90;
        }
        else if(xAxis < 0 && yAxis == 0)//x轴负方向
        {
            return 270;
        }
        return this.angle;
    }


    public destructor()
    {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }


//class end
}

window["Joystick"] = Joystick;