typer
=====

a bare-bones tool for practicing typing with code.

paste the code into the box. click submit. you're practicing!

typer has been designed to the minimum level to allow it be functional. any additional contributions are more than welcome!

=====================================================================
typer consists of 5 modules, which expose the following public methods:

typer: the shell, runs upon document load
-init: runs init method of other modules

typer.input: controls input sample to be typed
-init: initializes module

typer.pad: displays the text to be typed
-init: initializes module
-load: loads text sample
-start: turns on typer.listeners, restarts data variables
-update: updates color of character based on whether it was typed correctly
-end: turns off typer.listeners, sends finished data variables to typer.stats

typer.listeners: event listeners which monitor keyboard input
-init: initalizes module
-on: binds event listeners
-off: unbinds event listeners

typer.stats: displays stats after finished typing
-init: initalizes module
-update: unhides states and prints stats
-hide: hides stats if new typing excercise begins


