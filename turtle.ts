enum TurtlePenMode {
    //% block="down"
    Down,
    //% block="up"
    Up,
    //% block="erase"
    Erase
}

/**
 * A turtle that can move a sprite
 */
class Turtle {
    color: number = 1;
    direction: number = 90; // degrees
    penMode: TurtlePenMode = TurtlePenMode.Down;
    delay = 10;
    sprite: Sprite;
    bkg: Image;

    constructor(sprite: Sprite, bkg: Image) {
        this.sprite = sprite;
        this.bkg = bkg;
        this.sprite.data[turtle.DATA_KEY] = this;
    }

    /**
     * Gets the horizontal coordinate of the center of the turtle
     */
    get x() {
        return this.sprite.x;
    }

    set x(value: number) {
        this.sprite.x = value;
    }

    /**
     * Gets the vertical coordinate of the center of the turtle
     */
    get y() {
        return this.sprite.y;
    }

    set y(value: number) {
        this.sprite.y = value;
    }

    /**
     * Moves the turtle for the given amount of pixels
     * @param steps number of steps, eg: 1
     */
    //% blockId=turtleSpriteForward block="$this(myTurtle) forward %steps steps"
    //% weight=99 blockGap=8
    //% group="Sprites"
    //% blockNamespace="turtle"
    forward(steps: number): void {
        if (!steps) return;

        const drad = this.direction * turtle.DEG_TO_RAD;
        const sn = Math.sign(steps)
        const dx = Math.cos(drad) * sn
        const dy = - Math.sin(drad) * sn
        const n = Math.abs(steps);
        const c = this.penMode == TurtlePenMode.Down ? this.color : 0;

        const firstX = this.x;
        const firstY = this.y;
        let oldX = firstX;
        let oldY = firstY;

        if (this.delay > 1) {
            // animating move...
            for (let i = 0; i < n; ++i) {
                // paint if pen down
                if (this.penMode == TurtlePenMode.Down || this.penMode == TurtlePenMode.Erase)
                    this.bkg.drawLine(oldX, oldY, this.x, this.y, c)
                // paint and update
                this.setPosition(this.x + dx, this.y + dy);
                // and wait
                pause(this.delay);

                oldX = this.x;
                oldY = this.y;
            }
        }

        // adjust final position
        this.setPosition(Math.round(firstX + dx * n), Math.round(firstY + dy * n))
        // paint if pen down
        if (this.penMode == TurtlePenMode.Down || this.penMode == TurtlePenMode.Erase)
            this.bkg.drawLine(oldX, oldY, this.x, this.y, c)
        // and wait
        pause(this.delay);
    }

    /**
     * Moves back by the given number of steps
     * @param steps number of steps to move, eg: 1
     */
    //% blockId=turtleSpriteBack block="$this(myTurtle) back %steps steps"
    //% weight=98 blockGap=8
    //% group="Sprites"
    //% blockNamespace="turtle"
    back(steps: number): void {
        this.forward(-steps);
    }

    /**
     * Turns the turtle
     */
    //% blockId=turtleSpriteturn block="$this(myTurtle) turn %degrees"
    //% degrees.min=-180 degrees.max=180
    //% group="Sprites"
    //% blockNamespace="turtle"
    turn(degrees: number): void {
        this.direction = (this.direction + degrees) % 360;
    }

    /**
     * Sets the turtle position
     * @param x the horizontal position from 0 (left) to 160 (right), eg: 2
     * @param y the vertical position from 0 (top) to 120 (bottom), eg: 2
     */
    //% x.min=0 x.max=160
    //% y.min=0 y.max=120
    //% blockId=turtleSpriteSetPosition block="$this(myTurtle) set position x %x y %y"
    //% weight=87
    //% group="Sprites"
    //% blockNamespace="turtle"
    setPosition(x: number, y: number): void {
        this.x = x % screen.width; 
        if (this.x < 0) 
            this.x += screen.width;
        this.y = y % screen.height; 
        if (this.y < 0) 
            this.y += screen.height;
    }

    /**
     * Puts the pen down or up
     */
    //% blockGap=8
    //% blockId=turtleSpritePen block="$this(myTurtle) pen %mode"
    //% weight=65
    //% group="Sprites"
    //% blockNamespace="turtle"
    pen(mode: TurtlePenMode): void {
        this.penMode = mode;
    }

    /**
     * Moves the turtle to the center of the screen 
     */
    //% blockGap=8
    //% blockId=turtleSpriteHome block="$this(myTurtle) home"
    //% group="Sprites"
    //% blockNamespace="turtle"
    home(): void {
        this.setPosition(80, 60);
        this.direction = 90;
    }

    /**
     * Sets the pen color
     */
    //% blockGap=8
    //% blockId=turtlespritesetpencolor block="$this(myTurtle) set pen color to %color=colorindexpicker"
    //% group="Sprites"
    //% blockNamespace="turtle"
    setPenColor(color: number) {
        this.color = color & 0xf;
    }

    /**
     * Define the steps per second
     * @param speed eg: 50
     */
    //% blockGap=8
    //% blockId=turtleSpriteSetSpeed block="$this(myTurtle) set speed %speed"
    //% speed.min=1 speed.max=100
    //% weight=10
    //% group="Sprites"
    //% blockNamespace="turtle"
    setSpeed(speed: number): void {
        this.delay = 100 - Math.clamp(1, 100, speed | 0);
    }

    /**
     * Stamps the image at the current turtle position
     * @param image 
     */
    //% _blockId=turtlespritestamp block="$this(myTurtle) stamp %image=screen_image_picker"
    //% group="Sprites"
    //% blockNamespace="turtle"
    stamp(image: Image) {
        this.bkg.drawImage(image, this.sprite.left + ((this.sprite.width - image.width) >> 1), this.sprite.top + ((this.sprite.height - image.height) >> 1));
        pause(this.delay);
    }

    /**
     * Display a speech bubble with the text, for the given time
     * @param text the text to say, eg: ":)"
     * @param time time to keep text on
     */
    //% weight=60
    //% blockId=turtlespritesay block="$this(myTurtle) say %text||for %millis ms"
    //% millis.shadow=timePicker
    //% text.shadow=text
    //% inlineInputMode=inline
    //% group="Sprites"
    //% blockNamespace="turtle"
    say(text: any, timeOnScreen?: number, textColor = 15, textBoxColor = 1) {
        this.sprite.say(text, timeOnScreen || 500, textColor, textBoxColor);
    }
}

/**
 * Turtle graphics blocks
 */
//% weight=100 color=#0f9c11 icon="\uf188"
//% groups='["Default", "Sprites"]'
namespace turtle {
    export const DATA_KEY = "turtle"
    export const DEG_TO_RAD =  Math.PI / 180;

    export let turtleImage = img`
    . . . a . . .            
    . . a a a . .            
    . a . a . a .            
    . . . a . . .            
    . . . a . . .            
    `;       
    export let backgroundColor = 0xf;

    let _bkg: Image;
    function bkg() {
        if (!_bkg) {
            _bkg = scene.backgroundImage();
            _bkg.fill(turtle.backgroundColor);
        }
        return _bkg;
    }

    let _turtle: Turtle;
    function init() {
        if (!_turtle) {
            _turtle = fromSprite(sprites.create(turtle.turtleImage.clone()))
            home()
        }
    }

    /**
     * Moves the turtle for the given amount of pixels
     * @param steps number of steps, eg: 1
     */
    //% blockId=turtleForward block="forward %steps steps"
    //% weight=99 blockGap=8
    //% group="Default"
    export function forward(steps: number): void {
        init();
        _turtle.forward(steps);
    }

    /**
     * Moves back by the given number of steps
     * @param steps number of steps to move, eg: 1
     */
    //% blockId=turtleBack block="back %steps steps"
    //% weight=98 blockGap=8
    //% group="Default"
    export function back(steps: number): void {
        forward(-steps);
    }

    /**
     * Turns the turtle
     */
    //% blockId=turtleturn block="turn %degrees"
    //% degrees.min=-180 degrees.max=180
    //% group="Default"
    export function turn(degrees: number): void {
        init();
        _turtle.turn(degrees);
    }

    //% blockId=turtlerightturn block="turn right %degrees"
    //% group="Default"
    export function rt(degrees : number): void{
        turn(-degrees)
    }

    //% blockId=turtleleftturn block="turn left %degrees"
    //% group="Default"
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
    //% group="Default"
    export function setPosition(x: number, y: number): void {
        init();
        _turtle.setPosition(x, y)
    }

    /**
     * Puts the pen down or up
     */
    //% blockGap=8
    //% blockId=turtlePen block="pen %mode"
    //% weight=65
    //% group="Default"
    export function pen(mode: TurtlePenMode): void {
        init();
        _turtle.pen(mode)
    }

    /**
     * Moves the turtle to the center of the screen 
     */
    //% blockGap=8
    //% blockId=turtleHome block="home"
    //% group="Default"
    export function home(): void {
        init()
        _turtle.home()
    }

    /**
     * Sets the pen color
     */
    //% blockGap=8
    //% blockId=turtlesetpencolor block="set pen color to %color=colorindexpicker"
    //% group="Default"
    export function setPenColor(color: number) {
        init();
        _turtle.setPenColor(color)
    }

    /**
     * Define the steps per second
     * @param speed eg: 50
     */
    //% blockGap=8
    //% blockId=turtleSetSpeed block="set speed %speed"
    //% speed.min=1 speed.max=100
    //% weight=10
    //% group="Default"
    export function setSpeed(speed: number): void {
        init();
        _turtle.setSpeed(speed)
    }

    /**
     * Stamps the image at the current turtle position
     * @param image 
     */
    //% _blockId=turtlestamp block="stamp %image=screen_image_picker"
    //% group="Default"
    export function stamp(image: Image) {
        init();      
        _turtle.stamp(image)
    }

    /**
     * Clears the drawings created by the turtle
     */
    //% _blockId=turtleClearScreen block="clear screen"
    //% group="Default"
    export function clearScreen() {
        init()
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
    //% group="Default"
    export function say(text: any, timeOnScreen?: number, textColor = 15, textBoxColor = 1) {
        init()
        _turtle.say(text, timeOnScreen, textColor, textBoxColor)
    }

    /**
     * Creates a turtle that moves the given sprite
     */
    //% blockId=turtleFromSprite block="from sprite $sprite=variables_get"
    //% blockSetVariable=myTurtle
    //% group="Sprites"
    //% weight=100
    export function fromSprite(sprite: Sprite): Turtle {
        let turtle: Turtle = sprite.data[DATA_KEY];
        if (!turtle)
            turtle = new Turtle(sprite, bkg())
        return turtle;
    }
}
