//////////////////////////////////////////////////////////////////////////
//                       //                                             //
//  -~=Niels MAnders=~-  //            Balance of Creation              //
//                       //                                             //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Controls:                                                            //
//                                                                      //
//    keyboard                                                          //
//       's': save image                                                //
//       '1': modeFn - dualHalfCircle                                   //
//       '2': modeFn - cornerQuaterCircle                               //
//       '3': modeFn - leftHalfCircle                                   //
//       '4': modeFn - allQuaterCircle                                  //
//       '5': modeFn - rotateHalfCircle                                 //
//       '6': modeFn - organicLine                                      //
//       '7': modeFn - organicAndCircle                                 //
//       '8': reset the artwork                                         //          
//                                                                      //
//////////////////////////////////////////////////////////////////////////


var blockSize = 50;   //size of one square in px
var countBorder = 9;  //number of squares in the artwork
var wdt = blockSize * countBorder;  //total width of artwork
var hgt = blockSize * countBorder;  //total height of artwork
var modes = [dualHalfCircle, cornerQuaterCircle, leftHalfCircle, allQuaterCircle, rotateHalfCircle, organicLine, organicAndCircle, nothing];  //different styles
var currModeFn = dualHalfCircle;  //current style, dualHalfCircle is default
var colorSchemes = [    //different color combinations of 5 colors
  [ '#fac901', '#225095', '#dd0100', '#ffffff', '#000000' ],      //modrian based colors
  [ '#abc4ff', '#cbfdff', '#ffffff', '#ffce94', '#ff6e49' ],      //winter to summer colors
  [ '#e3e3e3', '#767676', '#9f9f9f	', '#c8c8c8', '#f1f1f1' ],    //5 shade of neutral grays
  [ '#3b5998', '#8b9dc3', '#dfe3ee', '#f7f7f7', '#ffffff' ],      //facebook colors
  [ '#a7adea', '#ca97df', '#eea9ca', '#fcbe8e', '#feecba' ],      //instagram colors (toned down)
  [ '#000000', '#101010', '#202020', '#303030', '#404040' ]       //blacks   
];
var queueNum = [ 0, 1, 2, 3, 4 ];   //value to pick colorscheme
var clrs = colorSchemes[0];   //current colorscheme
var togglePaper = true;   //keeps track is paper effect is activated

//defines the canvas and art size
function setup() {
  var cnv = createCanvas(wdt, hgt);   //create full screen canvas
  var x = (windowWidth - wdt) / 2;    //calculate margin-left (1/4 of width)
  var y = (windowHeight - hgt) / 2;   //calcukate margin-top (1/4 of height)
  cnv.position(x, y);   //position artwork with margins
  rectMode(CENTER);     //draw a square
  noStroke();           //remove square stroke
  noLoop();     //stop constant looping of draw function

}

//draws the artwork
function draw() {
  background(25);   //set background color
  for (var y = blockSize / 2; y < height; y+=blockSize) {   //for every vertical row
    for (var x = blockSize / 2; x < width; x+=blockSize) {  //for every square in that row
      queueNum = shuffleArray([ 0, 1, 2, 3, 4 ]);   //pick a random color scheme
      fill(clrs[queueNum[0]]);    //pick a random color from color array
      rect(x, y, blockSize, blockSize);   //draw the square

      push();   //start new drawing state
      translate(x, y);    //translate to the top corner of artwork
      currModeFn(0, 0, clrs);   //define current style and colorscheme
      pop();    //restore original drawing state
    }
  }

  if(togglePaper == true){    //checking if texture needs to be used
    paper();    //add "paper" effect to the drawing
  }
}

//draws two circles opposite of each other 
//turned with straight sides horizontal or vertical
//using colors from the choosen color-array
function dualHalfCircle(x, y, clrs) {
	rotate(radians(90 * Math.round(random(1, 5))));
  if (random() > .005) {
    fill(clrs[queueNum[1]]);
    arc(x - blockSize / 2, y, blockSize, blockSize, radians(270), radians(450));
    fill(clrs[queueNum[2]]);
    arc(x + blockSize / 2, y, blockSize, blockSize, radians(90),  radians(270));
  }
}

//draws a circle in the bottom right corner of the square
//using a color from the choosen color-array
function cornerQuaterCircle(x, y, clrs) {
  if (random(1) > .4) {
    fill(clrs[queueNum[Math.floor(random(queueNum.length))]]);
    arc(x, y + blockSize / 2, blockSize, blockSize, radians(270), radians(450));
  }
}

//draws a half circle on the left side of the square
//using a color from the choosen color-array
function leftHalfCircle(x, y, clrs) {
  if (random(1) > .2) {
    fill(clrs[queueNum[Math.floor(random(queueNum.length))]]);
    arc(x - blockSize / 2, y, blockSize, blockSize, radians(270), radians(450));
  }
}

//split the square in 4 even squares and draw a quater circle in it
//this quater circle can be in 4 directions
//using a color from the choosen color-array
function allQuaterCircle(x, y, clrs) {
  fill(clrs[queueNum[Math.floor(random(queueNum.length))]]);
  arc(-blockSize / 2, 0, blockSize, blockSize, radians(270), radians(450));
  for (var i = 0; i < 3; i++) {
    fill(clrs[queueNum[Math.floor(random(queueNum.length))]]);
    rotate(radians(90 * Math.round(random(1, 5))));
    arc(x, y + blockSize / 2, blockSize, blockSize, radians(270), radians(450));
  }
}

//draw a half circle with teh straight side on one of the sides of the square
//using a color from the choosen color-array
function rotateHalfCircle(x, y, clrs) {
  rotate(radians(90 * Math.round(random(1, 5))));
  fill(clrs[queueNum[1]]);
  arc(-blockSize / 2, 0, blockSize, blockSize, radians(270), radians(450));
}

//draws a line based of 2 quatercircle from one corner to the oposite while crossing the center
//unsing a color from the choosen color-array
function organicLine(x, y, clrs) {
  rotate(radians(90 * Math.round(random(1, 5))));

  fill(clrs[queueNum[1]]);
  arc(x - blockSize / 2, y, blockSize, blockSize, radians(270), radians(450));
  fill(clrs[queueNum[2]]);
  arc(x + blockSize / 2, y, blockSize, blockSize, radians(90),  radians(270));

  fill(clrs[queueNum[1]]);
  arc(x, y + blockSize / 2, blockSize, blockSize, radians(180), radians(360));
  fill(clrs[queueNum[2]]);
  arc(x, y - blockSize / 2, blockSize, blockSize, radians(0),   radians(180));
}

//draws a half circle or organic line orientated in one of the 4 ways
//using a color fron the choose color-array
function organicAndCircle(x, y, clrs) {
  rotate(radians(90 * Math.round(random(1, 5))));
  fill(clrs[queueNum[1]]);
  arc(x - blockSize / 2, y, blockSize, blockSize, radians(270), radians(450));
  fill(clrs[queueNum[2]]);
  arc(x + blockSize / 2, y, blockSize, blockSize, radians(90),  radians(270));

  rotate(radians(90 * Math.round(random(1, 5))));
  fill(clrs[queueNum[1]]);
  arc(x, y + blockSize / 2, blockSize, blockSize, radians(180), radians(360));
  fill(clrs[queueNum[2]]);
  arc(x, y - blockSize / 2, blockSize, blockSize, radians(0),   radians(180));
}

//draws nothing, so only the colored square are visible
//the squares uses colors for color-array
function nothing(){
  //nothing
}

//shuffles the colors in the choosen color-array
//and then returns the newly arranged color-array
function shuffleArray(array) {
  var j, temp;     //creates a temporary array for the new color-array
  for (var i = array.length - 1; i > 0; i--) {    //for every old array item
    j = Math.floor(Math.random() * (i + 1));    //a new random place in array
    temp = array[i];       //temp is the same as array[i]
    array[i] = array[j];   //old array is replaced by new array
    array[j] = temp;       //temp is the new array
  }
  return array;     //new color-array gets returned to be used
}

function resetArtwork(modeFn) {
  currModeFn = modeFn || modes[Math.floor(random(modes.length))];  //choose a style that is not the current one
  clrs = colorSchemes[Math.floor(random(colorSchemes.length))];   //choose a colorschema that is not the current one
  redraw();   //redo the draw function
}

//recognises keypresses to:
//change artwork style
//redraw the artwork
//toggle the paper effect


//draws small squares in different colors with an low opacity
//this to create the look of paper
function paper() {
  push();    //start new drawing state
  noStroke();       //no stroke for the squares
  for (var i = 0; i<width-1; i+=2) {         //for everyvertical row apply the paper effect
    for (var j = 0; j<height-1; j+=2) {      //for every square in that row apply the paper effect
      fill(random(205-40, 205+30), 25);      //fill with gray color and 0.25 opacity
      rect(i, j, 2, 2);                      //draw 2x2 square over artwork
      }
    }
  pop();    //restore original drawing state
}