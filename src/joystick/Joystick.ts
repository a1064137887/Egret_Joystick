// TypeScript file

/**
 * class name : JoyStick
 * description : 摇杆
 * time : 2018.12.11
 * @author : 杨浩然
 */
class Joystick extends eui.Component
{
    private defaultAlpha: number = 0.3;//默认透明度
    
    public constructor()
    {
        super();
    }

    protected createChildren()
    {
        this.skinName = "JoystickSkin";
    }

//class end
}