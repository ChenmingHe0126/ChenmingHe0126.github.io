//persistent variables
let agents = [];

//create a variable to store mp3
let sound;
let fft; //fourier transform to process the sound

//preload the mp3 file
function preload(){
    sound = loadSound('music/01.mp3');
}

function setup(){
    //create a full screen canvas
    createCanvas(windowWidth,windowHeight);    
    //initialize the fft object
    fft = new p5.FFT();
    //start the sound looping automatically
    sound.loop();
}

//default mousePressed event handler
function mousePressed() {
    if (sound.isPlaying()) {
      sound.pause();  // Pause the sound if it's playing
    } else {
      sound.loop();   // Start the sound again if it's paused
    }
}

function draw()
{
    //change the drawing rate
    frameRate(60);
    //draw the background with transparency, so that each pixel will fade out gradually
    background(0,0,0,1);

    //get the spectrum of the sound
    let spectrum = fft.analyze();

    // Use different frequency bands to control visual elements
    let bass = fft.getEnergy("bass"); // Low frequencies (bass)
    let mid = fft.getEnergy("mid");   // Mid frequencies
    let treble = fft.getEnergy("treble"); // High frequencies

    console.log("bass: " + bass);
    // console.log("mid: " + mid);
    // console.log("treble: " + treble);

    //initialize some agents according to the spectrum
    if(treble > 90 ){
        agents.push(new Agent(random(0,0.5*width),random(height),size = 40,spped = 60,[0,0,255,random(125,255)]));
    }
    if(mid > 50 && mid < 120){
        agents.push(new Agent(random(0,0.5*width),random(height),size = 10,spped = 1*mid*0.02,[0,255,0,random(125,255)]));
    }
    if(bass > 200){
        agents.push(new Agent(random(0,0.5*width),random(height),size = 20,spped = 20,[255,0,0,random(125,255)]));
    }



    //initialize some agents
    // agents.push(new Agent(random(width),random(height),10,10,[255,255,255,random(125,255)]));
    
    

    //iterate over the array of agents
    for(let i =0; i < agents.length;i++)
    {
        //agent behaviros
        agents[i].randomMove(0,2,-1,1);
        
        //if press the mouse, the agents will move towards the mouse
        if(mouseIsPressed){
            //agents[i].moveTowards(mouseX,mouseY);
            agents[i].randomMoveTowards(mouseX,mouseY);
        }
        //if press the key R, the agents will turn red
        if(keyIsPressed && key === 'r'){
            agents[i].changeColor(5,1,1,1);
        }
        //if press the key G, the agents will turn green
        if(keyIsPressed && key === 'g'){
            agents[i].changeColor(1,5,1,1);
        }
        //if press the key B, the agents will turn blue
        if(keyIsPressed && key === 'b'){
            agents[i].changeColor(1,1,5,1);
        }
        //if press the jey z the agents will gradually turn black
        if(keyIsPressed && key === 'z'){
            agents[i].changeColor(0.1,0.1,0.1,0.1);
        }
        //if press the empty key, the agents will be reset to random color
        if(keyIsPressed && key === ' '){
            agents[i].resetColor();
        }

        agents[i].display();
    }
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}








