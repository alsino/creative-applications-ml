let video;
let yolo;

let objects = [];
let status;
let modelIsLoaded;
let result;
let width = 320;
let height = 240;



function setup(){
  canvas = createCanvas(width,height);
  // canvas.elt.style.transform = "scaleX(-1)";

  video = createCapture(VIDEO);
  video.size(width,height);
  video.hide();

  yolo = ml5.YOLO(video, onModelLoaded);
  status = select('#status');
  result = select('#result');
}


function onModelLoaded() {
  status.html('Model loaded!');
  modelIsLoaded = true;
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    if(err){
      console.log(err);
    }
    else {
      objects = results;
      detect();
    }
  });
}

function draw(){

  if(modelIsLoaded){

    image(video, 0,0);

    objects.forEach(function(object){
      let h = object.h;
      let w = object.w;
      let x = object.x;
      let y = object.y;
      let name = object.className;
      let prob = object.classProb;

      strokeWeight(1);
      fill(0,255,0);
      let label = `${name}, ${prob}`
      text(label,x * width, y * height - 10);

      stroke(0,255,0);
      strokeWeight(4);
      noFill();
      rect(x * width, y * height, w * width, h * height);
    })
  
  }
}

