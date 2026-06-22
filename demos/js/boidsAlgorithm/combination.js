//boid system
let boids = [];
boidNum = 170; //number of agents, more agents will cause slower performance
tails = 0.3; //smaller value cause longer tail of boids

//sound
let sound, fft;

function preload() {
    sound = loadSound('../music/01.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    background(249,30,10);

    //sound
    fft = new p5.FFT();

    //boid system
    createSliders();

    //create a button to play music
    button = createButton('play');
    button.position(10, 70);
    button.style('background-color', 'gray');
    button.mousePressed(() => {
        if (sound.isPlaying()) {
            sound.pause();  // Pause the sound if it's playing
        } else {
            //clear all boids at the beginning
            boids = [];
            sound.loop();   // Start the sound again if it's paused
        }
    });

    //initialize some boids
    for (let i = 0; i < boidNum; i++) {
        //create a new boid
        let b = new Boid();

        //assign position to the boid
        // b.position = createVector(random(width), random(height));

        //assign velocity to the boid
        // b.velocity = createVector(random(-1,1), random(-1,1)); 

        //assign different HSB colors to the boid
        b.hue = random(150,240); //cyan to blue
        // b.hue = random(280,350);//purple to blue
        // b.hue = random(80,170);//green
        // b.hue = random(360);//random color

        b.saturation = random(50,100);
        b.brightness = random(30,100);
        
        boids.push(b);
    }
    
}

function draw(){
    background(249,30,10,tails);//use the transparent background to create the tail effect
    //reset
    tails = 0.3;
    

    //sound analysis
    // Analyze the full spectrum of frequencies
    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass"); // Low frequencies (bass)
    let mid = fft.getEnergy("mid");   // Mid frequencies
    let treble = fft.getEnergy("treble"); // High frequencies


    //if the music is playing, the agents will respond to the music
    if(sound.isPlaying()){
        boidRespond(bass, treble);
        
    }

    updateBoids();
    createNewBoidsByMouse();
} 

function updateBoids(){
    for(let i =0; i < boids.length;i++)
    {
        boids[i].edges();
        boids[i].computeAcceleration(alignSlider.value(),cohesionSlider.value(),separationSlider.value());
        boids[i].update();
        boids[i].show();
    }
}

function boidRespond(bass, treble) {
    
    //create some blue agents at the beginning
    if(bass > 50 && bass < 190){
        let b = new Boid();
        b.position = createVector(random(width), random(height));
        b.velocity = createVector(random(-1,1), random(-1,1)); 
        b.hue = random(150,240);
        b.saturation = random(50,100);
        b.brightness = random(30,100);
        boids.push(b);
    }
    //create some red agents when the bass is high
    if(bass > 200){
        let b = new Boid();
        b.position = createVector(random(width), random(height));
        b.velocity = createVector(random(-1,1), random(-1,1)); 
        b.size = 16;
        b.hue  = random(280,350);
        b.saturation = random(50,100);
        b.brightness = random(30,100);
        boids.push(b);
    }
    //if there are too many agents, remove some of them
    if(boids.length > boidNum){
        boids.splice(0,2);
    }
    //drumbeat respond
    // if the bass energy is high, the agents will move faster
    if(treble > 90){
        tails = 0.05;
        updateBoids();
        
        //make all boids move far away from each other
        separationSlider.value(2);
        alignSlider.value(0);
        cohesionSlider.value(0);
    }else if(treble < 80)
    {
        //reset the sliders
        separationSlider.value(1);
        alignSlider.value(1);
        cohesionSlider.value(1);
    }
}


//create sliders to control the behaviors of the agents
function createSliders() {
    //create three sliders to control the behaviors
    alignSlider = createSlider(0, 2, 1, 0.1);
    alignSlider.position(10, 10);
    alignSlider.style('width', '80px');
    alignSlider.style('opacity', '0.5');
    //display the text to show the meaning of the slider
    alignText = createP('Alignment');
    alignText.position(100, 6);
    alignText.style('color', 'gray');
    alignText.style('font-size', '8px');

    cohesionSlider = createSlider(0, 2, 1, 0.1);
    cohesionSlider.position(10, 30);
    cohesionSlider.style('width', '80px');
    cohesionSlider.style('opacity', '0.5');
    cohesionText = createP('Cohesion');
    cohesionText.position(100, 24);
    cohesionText.style('color', 'gray');
    cohesionText.style('font-size', '8px');

    separationSlider = createSlider(0, 2, 1, 0.1);
    separationSlider.position(10, 50);
    separationSlider.style('width', '80px');
    separationSlider.style('opacity', '0.5');
    separationText = createP('Separation');
    separationText.position(100, 44);
    separationText.style('color', 'gray');
    separationText.style('font-size', '8px');
}

function createNewBoidsByMouse(){
    if(mouseIsPressed && mouseX >= 100 && mouseX <= width && mouseY >= 50 && mouseY <= height){
        let b = new Boid();
        b.position = createVector(mouseX,mouseY);
        b.velocity = createVector(0,0);
        b.hue = random(150,240);
        b.saturation = random(50,100);
        b.brightness = random(30,100);
        boids.push(b);
    }

    //if there are too many agents, remove some of them
    if(boids.length > boidNum){
        boids.splice(0,2);
    }
}

//default function to resize the canvas
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


