---
title: LOGO Manual
---

# screen-turtle

A LOGO-like turtle for https://arcade.makecode.com

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/microsoft/pxt-screen-turtle** and import

## Turtle functions

The turtle has a position, a direction and a pen. All units are in pixels.
You can also turn any sprite into a turtle by using ``from sprite``.

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

## Edit this project ![MakeCode Arcade Release](https://github.com/microsoft/pxt-screen-turtle/workflows/MakeCode%20Arcade%20Release/badge.svg)

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/microsoft/pxt-screen-turtle** and click import

## License

MIT

## Supported targets

* for PXT/arcade
(The metadata above is needed for package search.)

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
