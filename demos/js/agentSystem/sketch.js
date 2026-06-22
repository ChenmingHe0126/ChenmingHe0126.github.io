//persistent variables
let agents = [];

function setup(){
    //create a full screen canvas
    createCanvas(windowWidth,windowHeight);
    //create an array of agents
    for(let i =0; i < 100;i++)
    {
        //colorful agents
        agents.push(new Agent(random(width),random(height),10,10,[random(125),random(125),random(125),random(125)]));

        //all black agents with different transparency
        // agents.push(new Agent(random(width),random(height),10,10,[0,0,0,random(120)]));
    }
    
}

function draw()
{
    //change the drawing rate to 10 frames per second
    frameRate(30);
    //draw the background with transparency, so that each pixel will fade out gradually
    background(255,255,255,10);
    
    //iterate over the array of agents
    for(let i =0; i < agents.length;i++)
    {
        //agent behaviros
        agents[i].randomMove();
        agents[i].changeColor();

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





