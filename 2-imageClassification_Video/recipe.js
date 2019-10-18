let classifier, video;

function setup(){
  noCanvas();
  video = createCapture(VIDEO);
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}

function modelReady(){
  classifyVideo();
}

function classifyVideo(){
    classifier.predict(gotResult);
}

function gotResult(err, results){
  if(err){
    console.log(err)
  } else {
    console.log(results);
  }

  // classifyVideo();
  setTimeout(() => {
    classifyVideo();
  }, 2000);

  select('#result').html(results[0].className);
}