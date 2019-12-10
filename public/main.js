let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 150.0; // Height of wave
let period = 650.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let windowHeight = 200; //sets height of sine wave to 200px

let auth0 = null;

const fetchAuthConfig = () => fetch('/auth_config.json');

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.client_id
  });
}

window.onload = async () => {

  document.getElementById('greeting').hidden = true;

  await configureClient();

  updateUI();

  const isAuthenticated = await auth0.isAuthenticated();

  if(isAuthenticated) {

    let user = await auth0.getUser();

    let name = user.name;

    document.getElementById('greeting').innerHTML = 'Hello, ' + name;
    document.getElementById('greeting').hidden = false; 

    return
  }

  const query = window.location.search
  if(query.includes('code=') && query.includes('state=')) {
    await auth0.handleRedirectCallback();

    updateUI();

    window.history.replaceState({}, document.title, '/');
  }

}

const logout = async () => {
  auth0.logout({
    returnTo: window.location.origin
  });
}

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
}

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById('bt-login').disabled = isAuthenticated;
  document.getElementById('bt-logout').disabled = !isAuthenticated;

  if(isAuthenticated) {

    let user = await auth0.getUser();

    let name = user.name;

    document.getElementById('greeting').innerHTML = 'Hello, ' + name;
    document.getElementById('greeting').hidden = false; 
  }
}

$('document').ready(() => {
  
  $("#callButton").hide();
  $("#printButton").hide();


  $('#printButton').click(() => {
    window.print();
  });
});

function placeCall() {
  let password = document.getElementById('newpwdlist').getElementsByTagName("p")[0].innerHTML;
  let number = document.getElementById('phoneNumber').value;

  $.get(
    "https://password123cs326.herokuapp.com/api/makecall",
    {password : password, number : number},
    function(data) {
       console.log(data);
    }
  );
}



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
