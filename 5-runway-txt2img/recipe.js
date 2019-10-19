let inputBox, button, canvas;
let transferBtn;
let heading;
let myImg;

let url = 'http://localhost:8001/query';

function setup() {
  canvas = createCanvas(500,500);
  canvas.parent("#wrapper");

  fill(255,0,0);
  rect(0,0, 500,500);

  heading = createDiv("");
  heading.class("title");
  heading.parent("#wrapper");

  inputBox = createInput();
  inputBox.value("Enter your text here...");

  button = createButton("Transfer");
  button.mousePressed(txt2img);
}

function draw(){
  if (myImg) image(myImg, 0,0, 500, 500);
  if(inputBox.value()) heading.html(inputBox.value());
}

function txt2img() {
  if (inputBox && inputBox.value) {

    let postData = {
      "caption": inputBox.value()
    };

    // console.log(inputBox.value());

    fetch(url, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(output => {

        // console.log(output);
        let outputImage = output.result
        // console.log(outputImage);

        myImg = loadImage(outputImage);
      })

  }
}
