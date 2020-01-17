var canW = 450;
var canH = 450;

function setup() {
  createCanvas(canW, canH);
  //noStroke();     //remove the stroke of items
  noLoop();     //stop looping of drawing
  rectMode(CENTER);   //center the canvas in the window
  angleMode(RADIANS);   //use degrees for angels
}


function draw() {
  background(255,255,255);
  fill(255,255,255);
  separateGrid(0, 0, width);
  frameRate(1);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
				rect(i,j,w,w);
      }
    }
  }
}

function keyPressed(e){
  switch(e.key.toLowerCase()){ 
    case 's': save('img_' + ~~random(100, 900) + '.jpg'); break;    //press 's' to save jpg of artwork
    case 'r': clear(); redraw(); break;    //redraw the artwork
    default: clear(); redraw(); break;     //for every other keypress
  }
}