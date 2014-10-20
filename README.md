typer
=====

A bare-bones tool for practising typing code.

Paste the code into the box. Click submit. You're practicing!

[Here's the working version!](https://rawgit.com/bnjmnhndrsn/typer/master/index.html) 

Typer has been designed to the minimum level to allow it be functional, so there's plenty of room for improvement. Any additional contributions are more than welcome!

=====================================================================
Typer consists of 5 modules, which expose the following public methods:

typer: the shell, runs upon document load
* init: runs init method of other modules

typer.input: controls input sample to be typed
* init: initializes module

typer.pad: displays the text to be typed
* init: initializes module
* load: loads text sample
* update: updates color of character based on whether it was typed correctly

typer.listeners: event listeners which monitor keyboard input
* init: initalizes module
* on: binds event listeners
* off: unbinds event listeners

typer.stats: displays stats after finished typing
* init: initalizes module
* update: unhides states and prints stats
* hide: hides stats if new typing excercise begins


