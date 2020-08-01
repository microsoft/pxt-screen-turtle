enum TurtlePenMode {
    //% block="down"
    Down,
    //% block="up"
    Up,
    //% block="erase"
    Erase
}
/**
 * Turtle graphics blocks
 */
//% weight=100 color=#0f9c11 icon="\uf188"
namespace turtle {
    const DATA_KEY = "turtle"
    const DEG_TO_RAD =  Math.PI / 180;

    export let turtleImage = img`
    . . . a . . .            
    . . a a a . .            
    . a . a . a .            
    . . . a . . .            
    . . . a . . .            
    `;       
    export let backgroundColor = 0xf;

    class TurtleData {
        x: number;
        y: number;
        color: number = 1;
        direction: number = 90; // degrees
        penMode: TurtlePenMode = TurtlePenMode.Down;
        delay = 10;

        constructor() {}
    }

    let _sprite: Sprite;
    let _bkg: Image;
    function init() {
        if (!_sprite) {
            _bkg = scene.backgroundImage();
            _bkg.fill(turtle.backgroundColor);
            _sprite = sprites.create(turtle.turtleImage.clone());
            const data: TurtleData = _sprite.data[DATA_KEY] = new TurtleData()
            data.x = _sprite.x;
            data.y = _sprite.y;
            home()
        }
    }

    /**
     * Moves the turtle for the given amount of pixels
     * @param steps number of steps, eg: 1
     */
    //% blockId=turtleForward block="forward %steps steps"
    //% weight=99 blockGap=8
    export function forward(steps: number): void {
        init();
        if (!steps) return;

        const data: TurtleData = _sprite.data[DATA_KEY]
        const drad = data.direction * DEG_TO_RAD;
        const sn = Math.sign(steps)
        const dx = Math.cos(drad) * sn
        const dy = - Math.sin(drad) * sn
        const n = Math.abs(steps);
        const c = data.penMode == TurtlePenMode.Down ? data.color : 0;

        const firstX = data.x;
        const firstY = data.y;

        if (data.delay > 1) {
            // animating move...
            let oldX = data.x;
            let oldY = data.y;
            for (let i = 0; i < n; ++i) {
                // paint if pen down
                if (data.penMode == TurtlePenMode.Down || data.penMode == TurtlePenMode.Erase)
                    _bkg.drawLine(oldX, oldY, data.x, data.y, c)
                // paint and update
                setPosition(data.x + dx, data.y + dy);
                // and wait
                pause(data.delay);

                oldX = data.x;
                oldY = data.y;
            }
        }

        // adjust final position
        data.x = firstX + dx * n;
        data.y = firstY + dy * n;
        _sprite.x = data.x
        _sprite.y = data.y
        // paint if pen down
        if (data.penMode == TurtlePenMode.Down || data.penMode == TurtlePenMode.Erase)
            _bkg.drawLine(firstX, firstY, data.x, data.y, c)
        // and wait
        pause(data.delay);
    }

    /**
     * Moves back by the given number of steps
     * @param steps number of steps to move, eg: 1
     */
    //% blockId=turtleBack block="back %steps steps"
    //% weight=98 blockGap=8
    export function back(steps: number): void {
        forward(-steps);
    }

    /**
     * Turns the turtle
     */
    //% blockId=turtleturn block="turn %degrees"
    //% degrees.min=-180 degrees.max=180
    export function turn(degrees: number): void {
        init();
        const data: TurtleData = _sprite.data[DATA_KEY]
        data.direction = (data.direction + degrees) % 360;
    }

    //% blockId=turtlerightturn block="turn right %degrees"
    export function rt(degrees : number): void{
        turn(-degrees)
    }

    //% blockId=turtleleftturn block="turn left %degrees"
    export function lt(degrees : number): void{
        turn(degrees)
    }

    /**
     * Sets the turtle position
     * @param x the horizontal position from 0 (left) to 160 (right), eg: 2
     * @param y the vertical position from 0 (top) to 120 (bottom), eg: 2
     */
    //% x.min=0 x.max=160
    //% y.min=0 y.max=120
    //% blockId=turtleSetPosition block="set position x %x y %y"
    //% weight=87
    export function setPosition(x: number, y: number): void {
        init();
        const data: TurtleData = _sprite.data[DATA_KEY]
        data.x = x % screen.width; if (data.x < 0) data.x += screen.width;
        data.y = y % screen.height; if (data.y < 0) data.y += screen.height;
        _sprite.x = data.x;
        _sprite.y = data.y;
    }

    /**
     * Puts the pen down or up
     */
    //% blockGap=8
    //% blockId=turtlePen block="pen %mode"
    //% weight=65
    export function pen(mode: TurtlePenMode): void {
        init();
        const data: TurtleData = _sprite.data[DATA_KEY]
        data.penMode = mode;
    }

    /**
     * Moves the turtle to the center of the screen 
     */
    //% blockGap=8
    //% blockId=turtleHome block="home"
    export function home(): void {
        setPosition(80, 60);
        const data: TurtleData = _sprite.data[DATA_KEY]
        data.direction = 90;
    }

    /**
     * Sets the pen color
     */
    //% blockGap=8
    //% blockId=turtlesetpencolor block="set pen color to %color=colorindexpicker"
    export function setPenColor(color: number) {
        init();
        const data: TurtleData = _sprite.data[DATA_KEY]
        data.color = color;
    }

    /**
     * Define the steps per second
     * @param speed eg: 50
     */
    //% blockGap=8
    //% blockId=turtleSetSpeed block="set speed %speed"
    //% speed.min=1 speed.max=100
    //% weight=10
    export function setSpeed(speed: number): void {
        init();
        const data: TurtleData = _sprite.data[DATA_KEY]
        data.delay = 100 - Math.clamp(1, 100, speed);
    }

    /**
     * Stamps the image at the current turtle position
     * @param image 
     */
    //% _blockId=turtlestamp block="stamp %image=screen_image_picker"
    export function stamp(image: Image) {
        init();      
        const data: TurtleData = _sprite.data[DATA_KEY]
        _bkg.drawImage(image, _sprite.left + ((_sprite.width - image.width) >> 1), _sprite.top + ((_sprite.height - image.height) >> 1));
        pause(data.delay);
    }

    /**
     * Clears the drawings created by the turtle
     */
    //% _blockId=turtleClearScreen block="clear screen"
    export function clearScreen() {
        _bkg.fill(turtle.backgroundColor);
        home()
    }

    /**
     * Display a speech bubble with the text, for the given time
     * @param text the text to say, eg: ":)"
     * @param time time to keep text on
     */
    //% weight=60
    //% blockId=turtlesay block="say %text||for %millis ms"
    //% millis.shadow=timePicker
    //% text.shadow=text
    //% inlineInputMode=inline
    export function say(text: any, timeOnScreen?: number, textColor = 15, textBoxColor = 1) {
        init()
        _sprite.say(text, timeOnScreen || 500, textColor, textBoxColor);
    }
}
