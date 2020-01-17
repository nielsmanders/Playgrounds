//Create some vertical and then offset control points with a circular motion controlled by perlin noise.

//declaration of slider variables.
let sizeSlider;
let colorPicker;
let backgroundColorPicker;
let speedSlider;
let animationButton;
let radiusSlider;
let saveButton;
let animate = true;

function setup() {
  
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
	background(255);
  strokeWeight(1);
  colorMode(HSB, 360, 100, 100);
  pixelDensity(1);  //increase for better resolution images.
  label();  //Create labels for the sliders.

  //Setup sliders.
  //slider for size control.
  sizeSlider = createSlider(0, 1000, 200, 1);
  sizeSlider.position(10, 25);

  //slider for animation speed control.
  speedSlider = createSlider(0, 100, 5, 1);
  speedSlider.position(10, 120);

  //slider for controling rotation radius.
  radiusSlider = createSlider(0, 100, 10, 1);
  radiusSlider.position(10, 70);

  //Setup colot pickers.
  //create a color Picker Element.
  colorPicker = createColorPicker('#172e3b');
  colorPicker.style('width', '50px');
  colorPicker.style('height', '50px');
  colorPicker.style('background', 'black');
  colorPicker.style('border-radius', '2px');
  colorPicker.style('border', '#234557');
  colorPicker.position(10, 170);

  //create background color picker.
  backgroundColorPicker = createColorPicker('#ffffff');
  backgroundColorPicker.style('width', '50px');
  backgroundColorPicker.style('height', '50px');
  backgroundColorPicker.style('background', 'black');
  backgroundColorPicker.style('border-radius', '2px');
  backgroundColorPicker.style('border', '#f7f7f7');
  backgroundColorPicker.position(85, 170);

  //setup buttons.
  //create animation button.
  animationButton = createButton('ANIMATE');
  animationButton.style('width', '130px')
  animationButton.style('height', '50px')
  animationButton.style('background-color', 'black')
  animationButton.style('border', 'black')
  animationButton.style('border-radius', '10px')
  animationButton.style('color', 'white')
  animationButton.position(10, 235);
  
  //create a button to save a frame.
  saveButton=createButton('SAVE');
  saveButton.style('width', '130px')
  saveButton.style('height', '50px')
  saveButton.style('background-color', 'black')
  saveButton.style('border', 'black')
  saveButton.style('border-radius', '10px')
  saveButton.style('color', 'white')
  saveButton.position(10, 295);
}

let zoff = 0;
let angle = 0;

function draw() {

  //Get the values from DOM elements.
  let size = sizeSlider.value();
  let animationSpeed = speedSlider.value()/100;
  let backgroundColor = backgroundColorPicker.value();
  let mainColor = colorPicker.value();
	let radius = radiusSlider.value();
  
	//connect buttons to functions.
  animationButton.mousePressed(function toogleAnimation() {animate = !animate;});
  saveButton.mousePressed(function saveImg(){save('img_' + ~~random(100, 900) + '.jpg');})
  

  background(backgroundColor);
  stroke(mainColor);
  noFill();

  //Create a grid of points.
	//max value of i will affect the density of vertical lines.
  for (i = width / 4; i <= width - (width / 4); i += 5) {
    beginShape();
    for (j = height / 6; j <= height - (height / 6); j += 20) {
      let x =i;
      let y =j;
      let scale = 0.005;//using a scale vaiable because steps between i and j counters are too large steps for noise function.
      
      //check if points are inside the slider size value.
      if (dist(i, j, width / 2, height / 2) < size) {
        //Create a 3D noise value for each point .
        //this noise value is used to change the relative angle for the cos() and sin() values 
        //for each point so they dont have tha same angle at every time.
        //The same value is used to define the radius of rotation for each point.
        n = map(noise(i * scale, j * scale, zoff), 0, 1, -1, 1);
        x = i +  n*radius * sin(angle + n * 10);
        y = j +  n*radius * cos(angle + n * 10);
      }
      //connect points.
      curveVertex(x, y);
      // point(x,y);
    }
    endShape();
  }

  //Toogle animation with button.
  if (animate === true) {
    zoff += 0.01;
    angle += animationSpeed;
  }

}

//Funciton for labeling the sliders,buttons etc.
function label() {
  let sizeLabel = createDiv('SIZE');
  sizeLabel.position(10, 10);
  sizeLabel.style('font-family', 'Roboto');
  sizeLabel.style('font-weight', 'medium');
  sizeLabel.style('font-size', '14px');

  let radiusLabel = createDiv('RADIUS');
  radiusLabel.position(10, 50);
  radiusLabel.style('font-family', 'Roboto');
  radiusLabel.style('font-weight', 'medium');
  radiusLabel.style('font-size', '14px');


  let speedLabel = createDiv('SPEED');
  speedLabel.position(10, 100);
  speedLabel.style('font-family', 'Roboto');
  speedLabel.style('font-weight', 'medium');
  speedLabel.style('font-size', '14px');

  let colorLabel = createDiv('COLORS');
  colorLabel.position(10, 150);
  colorLabel.style('font-family', 'Roboto');
  colorLabel.style('font-weight', 'medium');
  colorLabel.style('font-size', '14px');
}

function keyPressed(e){
  switch(e.key.toLowerCase()){ 
    case 's': save('img_' + ~~random(100, 900) + '.jpg'); break;    //press 's' to save jpg of artwork
  }
}