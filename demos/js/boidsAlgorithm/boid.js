class Boid
{
    //constructor
    constructor ()
    {
      //position and size
      this.position = createVector(random(width),random(height));
      this.size = 8;

      //default color
      this.hue = random(150,240);
      this.saturation = random(50,100);
      this.brightness = random(30,100);

      //velocity and acceleration
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag(random(2.5, 5));
      this.acceleration = createVector();
      this.maxForce = 0.2;
      this.maxSpeed = 6;

    }

    //show
    show()
    {
      //use point for each boid
      // strokeWeight(this.size);
      // stroke(this.hue, this.saturation, this.brightness);
      // point(this.position.x, this.position.y);

      // //use rectangle for each boid
      fill(this.hue, this.saturation, this.brightness);
      noStroke();
      rect(this.position.x, this.position.y,this.size,this.size);
    }

    //Wrap around edges
    edges() {
      if(this.position.x > width + 10) {
        this.position.x = 0;
      } else if (this.position.x < 0 - 10) {
        this.position.x = width;
      }
      if (this.position.y > height + 10) {
        this.position.y = 0;
      } else if (this.position.y < - 10) {
        this.position.y = height;
      }
    }

    //compute the acceleration first, then use this to update the position and velocity
    //update
    update() {
      //update velocity and position 
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
	  }

    //compute all three forces in one function
    //totalforce = alignment + cohesion + separation
    computeAcceleration(alignWeight = 1.0, cohenWeight = 1.0, separWeight = 1.0) {
      let alignSteering = createVector();
      let cohesionSteering = createVector();
      let separationSteering = createVector();
    
      let alignTotal = 0;
      let cohesionTotal = 0;
      let separationTotal = 0;
    
      for (let other of boids) {
        if (other == this) continue;
        
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    
        // Alignment
        if (d < 50) {
          alignSteering.add(other.velocity);
          alignTotal++;
        }
    
        // Cohesion
        if (d < 100) {
          cohesionSteering.add(other.position);
          cohesionTotal++;
        }
    
        // Separation
        if (d < 50) {
          let diff = p5.Vector.sub(this.position, other.position);
          diff.div(d); // Weight by distance
          separationSteering.add(diff);
          separationTotal++;
        }
      }
    
      if (alignTotal > 0) {
        alignSteering.div(alignTotal);
        alignSteering.setMag(this.maxSpeed);
        alignSteering.sub(this.velocity);
        alignSteering.limit(this.maxForce);
      }
    
      if (cohesionTotal > 0) {
        cohesionSteering.div(cohesionTotal);
        cohesionSteering.sub(this.position);
        cohesionSteering.setMag(this.maxSpeed);
        cohesionSteering.sub(this.velocity);
        cohesionSteering.limit(this.maxForce);
      }
    
      if (separationTotal > 0) {
        separationSteering.div(separationTotal);
        separationSteering.setMag(this.maxSpeed);
        separationSteering.sub(this.velocity);
        separationSteering.limit(this.maxForce);
      }
    
      // Combine all weighted forces into acceleration
      this.acceleration = createVector();
      this.acceleration.add(alignSteering.mult(alignWeight));
      this.acceleration.add(cohesionSteering.mult(cohenWeight));
      this.acceleration.add(separationSteering.mult(separWeight));
    }

    //especially for ripples
    avoidRipples(drops) {
      for (let drop of drops) {
        let dropPos = createVector(drop.x, drop.y);
        let d = p5.Vector.dist(this.position, dropPos);
        let influenceRadius = drop.radius * 1.2; // Area of effect
    
        if (d < influenceRadius && d > 1) {
          let repulsion = p5.Vector.sub(this.position, dropPos);
          repulsion.normalize();
          repulsion.div(d * 0.5); // Closer = stronger
          this.velocity.add(repulsion.mult(50));
        }
      }
    }
    
}