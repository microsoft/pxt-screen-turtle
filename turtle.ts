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
    export let turtleImage = img`
    . . . a . . .            
    . . a a a . .            
    . a . a . a .            
    . . . a . . .            
    . . . a . . .            
    `;       
    export let backgroundColor = 0xf;

    let _bkg: Image;
    let _sprite: Sprite;
    let _x: number;
    let _y: number;
    let _color: number = 1;
    let _direction: number = 90; // degrees
    let _penMode: TurtlePenMode = TurtlePenMode.Down;
    let _delay = 10;
    function init() {
        if (!_sprite) {
            _bkg = scene.backgroundImage();
            _bkg.fill(turtle.backgroundColor);
            _sprite = sprites.create(turtle.turtleImage.clone());
            _x = _sprite.x;
            _y = _sprite.y;
            home()
        }
    }

    const degToRad =  Math.PI / 180;
    /**
     * Moves the turtle for the given amount of pixels
     * @param steps number of steps, eg: 1
     */
    //% blockId=turtleForward block="forward %steps steps"
    //% weight=99 blockGap=8
    export function forward(steps: number): void {
        init();
        if (!steps) return;

        const drad = _direction * degToRad;
        const sn = Math.sign(steps)
        const dx = Math.cos(drad) * sn
        const dy = - Math.sin(drad) * sn
        const n = Math.abs(steps);
        const c = _penMode == TurtlePenMode.Down ? _color : 0;

        const firstX = _x;
        const firstY = _y;

        if (_delay > 1) {
            // animating move...
            let oldX = _x;
            let oldY = _y;
            for (let i = 0; i < n; ++i) {
                // paint if pen down
                if (_penMode == TurtlePenMode.Down || _penMode == TurtlePenMode.Erase)
                    _bkg.drawLine(oldX, oldY, _x, _y, c)
                // paint and update
                setPosition(_x + dx, _y + dy);
                // and wait
                pause(_delay);

                oldX = _x;
                oldY = _y;
            }
        }

        // adjust final position
        _x = firstX + dx * n;
        _y = firstY + dy * n;
        _sprite.x = _x
        _sprite.y = _y
        // paint if pen down
        if (_penMode == TurtlePenMode.Down || _penMode == TurtlePenMode.Erase)
            _bkg.drawLine(firstX, firstY, _x, _y, c)
        // and wait
        pause(_delay);
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
        _direction = (_direction + degrees) % 360;
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
        _x = x % screen.width; if (_x < 0) _x += screen.width;
        _y = y % screen.height; if (_y < 0) _y += screen.height;
        _sprite.x = _x;
        _sprite.y = _y;
    }

    /**
     * Puts the pen down or up
     */
    //% blockGap=8
    //% blockId=turtlePen block="pen %mode"
    //% weight=65
    export function pen(mode: TurtlePenMode): void {
        init();
        _penMode = mode;
    }

    /**
     * Moves the turtle to the center of the screen 
     */
    //% blockGap=8
    //% blockId=turtleHome block="home"
    export function home(): void {
        setPosition(80, 60);
        _direction = 90;
    }

    /**
     * Sets the pen color
     */
    //% blockGap=8
    //% blockId=turtlesetpencolor block="set pen color to %color=colorindexpicker"
    export function setPenColor(color: number) {
        init();
        _color = color;
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
        _delay = 100 - Math.clamp(1, 100, speed);
    }

    /**
     * Stamps the image at the current turtle position
     * @param image 
     */
    //% _blockId=turtlestamp block="stamp %image=screen_image_picker"
    export function stamp(image: Image) {
        init();        
        _bkg.drawImage(image, _sprite.left + ((_sprite.width - image.width) >> 1), _sprite.top + ((_sprite.height - image.height) >> 1));
        pause(_delay);
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
