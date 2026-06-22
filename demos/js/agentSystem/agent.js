class Agent{
    //constructor
    constructor(x,y,size = 10, speed =1,color = [0,0,0]){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
        

    }

    //Random move
    randomMove(xMin = -1, xMax =1, yMin = -1, yMax = 1){
        this.x += this.speed*random(xMin,xMax);
        this.y += this.speed*random(yMin,yMax);
    }
    //Move towards a point
    moveTowards(x,y){
        let dx = x - this.x;
        let dy = y - this.y;
        let angle = atan2(dy,dx);
        this.x += this.speed*cos(angle);
        this.y += this.speed*sin(angle);
    }
    //Random move towards a point
    randomMoveTowards(x,y)
    {
        this.randomMove();
        this.moveTowards(x,y);
    }

    //gradient color change
    changeColor(R = 1.0,G = 1.0,B = 1.0,A = 1.0){
        this.color[0] += random(-1.0,R);
        this.color[1] += random(-1.0,G);
        this.color[2] += random(-1.0,B);
        this.color[3] += random(-1.0,A);
    }
    //Reset color
    resetColor(){
        this.color = [random(125),random(125),random(125),random(125)];
    }

    //Display
    display(){
        fill(this.color);
        noStroke();
        rect(this.x,this.y,this.size,this.size);
        // //draw a dot
        // point(this.x,this.y,this.size,this.size);
    }

}