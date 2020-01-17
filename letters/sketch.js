var canW = 450;
var canH = 450;

//let colors = ["#ED6A5A", "#F4F1BB", "#9BC1BC", "#5CA4A9", "#E6EBE0"];

// array of posible colors
let listOfColors = [
  ('#152A3B'), ('#158ca7'), ('#F5C03E'), ('#D63826'), ('#F5F5EB'), 
  ('#0F4155'), ('#288791'), ('#7ec873'), ('#F04132'), ('#fcf068'),
  ('#263056'), ('#FFABC2'), ('#FCFAF1'), ('#FCE8CE'), ('#AD7C59'),
  ('#5BC2EF'), ('#6980C5'), ('#70DFDF'), ('#F7F6EE'), ('#385466'),
  ('#E8614F'), ('#F3F2DB'), ('#79C3A7'), ('#668065'), ('#4B3331') ];

//array of letter combinations
let listOfLetters = [
    ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 
    ('1234567890'), 
    ('TEST'),
    ('吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番｜獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。この書生の掌の裏でしばらくはよい心持に坐っておったが、しばらくすると非常な速力で運転し始めた。書生が動くのか自分だけが動くのか分らないが無暗に眼が廻る。胸が悪くなる。到底助からないと思っていると、どさりと音がして眼から火が出た。それまでは記憶しているがあとは何の事やらいくら考え出そうとしても分らない。'),
  ];
  
  let bg;
  let counter = 0;
  
  //function for setting up the canvas
  function setup() {
    createCanvas(450, 450);
    colorMode(HSB, 360, 100, 100, 100);
    bg = createGraphics(width, height);
  }
  
  //function to draw the artwork
  function draw() {
    letters = randomLetter(listOfLetters);
    background(255);
    separateGrid(0, 0, width);
    //frameRate(1);
    noLoop();   //perform the drawing only once
  }
  
  //function to split the screen in grid squares
  function separateGrid(x, y, d) {
    let sepNum = int(random(1, 4));
    let w = d / sepNum;
    for (let i = x; i < x + d - 1; i += w) {
      for (let j = y; j < y + d - 1; j += w) {
        if (random(100) < 90 && d > width / 15) {
          separateGrid(i, j, w);
        } else {
          //rect(i, j, w, w);
          push();
          translate(i+w/2,j+w/2 + w * 0.1);
          textSize(w);
          textAlign(CENTER,CENTER);
          text(letters[counter],0,0);
          pop();
          counter++;
          if(counter > letters.length-1){
            counter = 0;
          }
        }
      }
    }
  }

//function to pick random letter combination
function randomLetter(listOfLetters){
  //pick form all 25 colors
  //return listOfColors[Math.floor(Math.random()*25)];
  //pick from the first 5 colors
  return listOfLetters[Math.floor(Math.random()*(listOfLetters.length))];
}

//function to recognize keypresses
function keyPressed(e){
  switch(e.key.toLowerCase()){ 
    case '1': redraw(); break;
    case 's': save('img_' + ~~random(100, 900) + '.jpg'); break;    //press 's' to save jpg of artwork
    case 'r': redraw(); break;    //press 'r' to reset artwork
    default: resetArtwork(); break;     //for every other keypress
  }
}