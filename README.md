# Balance of creation

## Introduction

> A serie of interactive generative art prototype made to be used in realising an interactive installation for the Playgrounds Festival in the Netherlands. 

## Code Samples

> All prototypes are made using P5.js and have the same formatting to get a similar look and feel for every prototype. The standard format that is being used:

    let canW = 450;
    let canH = 450;

    function setup() {
      createCanvas(canW, canH);
      noStroke();                 //remove the stroke of items
      blendMode(MULTIPLY);        //combine colors of overlapping items
      noLoop();                   //stop looping of drawing
      rectMode(CENTER);           //center the canvas in the window
      angleMode(RADIANS);         //use degrees for angels
    } 

## Installation

> To make it easy to export each prototype every folder with an prototype has all needed files within it to get an working prototype. Simply download a single prototype and run the index.html file and you're done. 
