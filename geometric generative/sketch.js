let colours=['#BD52FF', '#F95EE0', '#F9F25E', '#FFA7F1', '#ACEBFF'];
let canW=450;
let canH=450;
var togglePaper = true;   //keeps track is paper effect is activated

function setup() {
  createCanvas(canW, canH);
  noStroke();     //remove the stroke of items
  blendMode(MULTIPLY);    //combine colors of overlapping items
  noLoop();     //stop looping of drawing
  rectMode(CENTER);   //center the canvas in the window
  angleMode(RADIANS);   //use degrees for angels
}


function draw() {
  shuffle(colours, true);   //shuffle the color array

  fill(colours[0]);     //get first color in the random color array
  for(let i=1; i<5; i++){     //run this code for 5 times
    drawEll(i*random(0,canW),   //draw random elipse
            i*random(-canH/12,canH),    //randomize heigth position
            i*random(200,canW/2));      //randomize width position
  }

  if(togglePaper == true){    //checking if texture needs to be used
    paper();    //add "paper" effect to the drawing
  }
  
  fill(colours[1]);    //get the second color in the random color array
  for(let i=1; i<random(1,6); i++){     //run this code for 1-5 times
  drawArc(                        //draw random arc
    i*random(canW/12,canW/2),     //randomize width position
    i*random(1,canH/2),           //randomize height postition
    i*random(200,canW/6));        //randomize width position
  }

  fill(colours[2]);   //get third color in the random color array
  for(let i=1; i<random(5,10); i++)     //run this code for 5-9 times
  { drawRect(                   //draw random rect
    i*random(canW/12,canW/6),   //randomize width position
    i*random(1,canH/2),     //randomize height position
    i*random(1,canH/2),     //radomize height position
    i*random(1,canH/2));    //radomize height position
  }
}

function drawEll(x,y,size){
  ellipse(x,y,size);    //draw cirlce with random position and size
}

function drawRect(x,y,w,h){
  rect(x,y,w,h);       //draw rectangle with random position and size
}

function drawArc(x,y,size){
  let start = int(random(0,5))*HALF_PI;   //get random start position
  arc(x, y, size, size, start, start+int(random(1,3))*HALF_PI);   //draw fully random arc
}


function windowResized() {
  resizeCanvas(canW, canH);   //rezize the canvas to windowsize
}

function keyPressed(e){
  switch(e.key.toLowerCase()){ 
    case 's': save('img_' + ~~random(100, 900) + '.jpg'); break;    //press 's' to save jpg of artwork
    case 'p': if (togglePaper) {togglePaper = false;} else {togglePaper = true;};   //press 'p' to toggle paper look
    case 'r': clear(); redraw(); break;    //redraw the artwork
    default: clear(); redraw(); break;     //for every other keypress
  }
}

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