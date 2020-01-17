var canW = 450;
var canH = 450;

let colors = ["#ED6A5A", "#F4F1BB", "#9BC1BC", "#5CA4A9", "#E6EBE0"];

// array of posible colors
let listOfColors = [
  ('#152A3B'), ('#158ca7'), ('#F5C03E'), ('#D63826'), ('#F5F5EB'), 
  ('#0F4155'), ('#288791'), ('#7ec873'), ('#F04132'), ('#fcf068'),
  ('#263056'), ('#FFABC2'), ('#FCFAF1'), ('#FCE8CE'), ('#AD7C59'),
  ('#5BC2EF'), ('#6980C5'), ('#70DFDF'), ('#F7F6EE'), ('#385466'),
  ('#E8614F'), ('#F3F2DB'), ('#79C3A7'), ('#668065'), ('#4B3331') ];

function setup() {
  createCanvas(canW, canH);
  // let bgNum = int(random(colors.length));
  // let bg = colors[bgNum];
  // background(bg);
  // colors.splice(bgNum, 1);

  for (let i = 0; i < 100; i = i + 1) {
    let d = random(50);
    let x = random(d, width - d);
    let y = random(d, height - d);
    let c = random(colors);
    let n = random(100);
    if (n > 50) {
      fill(0, 10);
      noStroke();
      circle(x + d / 10, y + d / 10, d);
      fill(randomColor(listOfColors));
      noStroke();
      circle(x, y, d);
    } else {
      fill(0, 10);
      noStroke();
      square(x + d / 10, y + d / 10, d);
      fill(randomColor(listOfColors));
      noStroke();
      rectMode(CENTER);
      square(x, y, d);
    }
  }
  for (let i = 0; i < 100000; i = i + 1) {
    stroke(255, 15);
    let px = random(600);
    let py = random(600);
    point(px, py);
  }
}

// function to pick a random color
function randomColor(listOfColors){
  //pick form all 25 colors
  //return listOfColors[Math.floor(Math.random()*25)];
  //pick from the first 5 coilros
  return listOfColors[Math.floor(Math.random()*5)];
}

//function to recognize keypresses
function keyPressed(e){
  switch(e.key.toLowerCase()){ 
    case 's': save('img_' + ~~random(100, 900) + '.jpg'); break;    //press 's' to save jpg of artwork
    case 'r': redraw(); break;    //press 'r' to reset artwork
    default: break;     //for every other keypress
  }
}