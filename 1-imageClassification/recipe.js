// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
const classifier = ml5.imageClassifier('MobileNet', modelReady);

// A variable to hold the image we want to classify
let img;

function setup() {
  noCanvas();
   // Load the image
  img = createImg('images/dog.jpg', imageReady);
  img.size(400, 400);
}

// Change the status when the model loads.
function modelReady(){
  select('#status').html('Model Loaded')
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
  classifier.predict(img, 10, gotResult);
  // You can also specify the amount of classes you want
  // classifier.predict(img, 5, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {

  if (err) {
    console.error(err);
  }

  // Create header for results
  let resultDisplay = createDiv('MobileNet predictions');
  resultDisplay.class("results");
  createSpan('Class -> ');
  createSpan('Probability');

  // Show all results as a list
  results.forEach(function(result){
    console.log(result.className);
    createDiv(`${result.className}, -> ${Math.round(result.probability * 100)}%`)
  })

}
