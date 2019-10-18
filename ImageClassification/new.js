
// A variable to hold the image we want to classify
// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let img;
let classifier = ml5.imageClassifier('MobileNet', modelReady);

// Load the image
function setup(){
  noCanvas();
  img = createImg('images/dog.jpg', imageReady);
  img.size(400,400);
}

// Change the status when the model loads.
function modelReady(){
  console.log("Model is ready");
  select('#status').html('Model Loaded');
}

// When the image has been loaded, get a prediction for that image
function imageReady(){
  classifier.predict(img, 10, gotResult);
}

function gotResult(error, results){
  if (error){ console.log(error) }
  else console.log(results);

  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
}


