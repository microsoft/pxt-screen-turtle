# screen-turtle

A LOGO-like turtle for https://arcade.makecode.com

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/microsoft/pxt-screen-turtle** and import

## Edit this project ![Build status badge](https://github.com/microsoft/pxt-screen-turtle/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/microsoft/pxt-screen-turtle** and click import

## Turtle functions

The turtle has a position, a direction and a pen. All units are in pixels.

### Moves: forward and back

Move the turtle forward and backward by some pixels; in the current direction

```blocks
turtle.forward(30)
turtle.back(30)
```

There is also a shortcut ``home`` to reset the turtle position

```blocks
turtle.home()
```

### Turns: turn

```blocks
turtle.turn(90)
```

### Painting

Lift and lower the pen

```blocks
turtle.pen(TurtlePenMode.Down)
turtle.pen(TurtlePenMode.Up)
turtle.pen(TurtlePenMode.Erase)
```

And change the pen color

```blocks
turtle.setPenColor(4)
```

## License

MIT

## Supported targets

* for PXT/arcade
(The metadata above is needed for package search.)

# Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
