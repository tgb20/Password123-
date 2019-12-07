let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 150.0; // Height of wave
let period = 650.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let windowHeight = 200; //sets height of sine wave to 200px

$('document').ready(() => {
  $("#callButton").hide();
  $("#printButton").hide();


  $('#printButton').click(() => {
    window.print();
  });

});

function getNewPassword(e) {
  e.preventDefault();
  let keyWord = document.getElementById('inputpwd').value
  getSecurePassword(keyWord).then(password => {
    document.getElementById('newpwdlist').getElementsByTagName("p")[0].innerHTML = password;
    $("#callButton").show();
    $("#printButton").show();
  });
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  w = width + 20;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  //windowResize();
  //window.addEventListener("resize", windowResize);
  canvas.parent('sketchHolder');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background(255);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = (sin(x)) / 3 * amplitude;
    x += dx;
  }
}

function renderWave() {
  stroke(40, 6, 128);
  noFill();
  strokeWeight(7);
  // A simple way to draw the wave with an ellipse at each location
  beginShape();
  for (let x = 0; x < yvalues.length; x++) {
    curveVertex(x * xspacing, height / 2 + yvalues[x]);
  }
  endShape();
}
