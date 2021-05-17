

class Particle{
constructor(x, y, r) {
    var options = {
      restitution: 0.5,
      friction: 1,
      airFriction :0.5,
      density: 1
    }
    x += random(-300, 600);
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
   // this.image = loadImage("images/rock.png");

    this.body.label = "particle";

    World.add(world, this.body);
  }
  
  isOffScreen() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    x < -50 ;
    x > width + 50;
    y > height
  }
  
  
  display() {
      
    fill("grey");
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipseMode(RADIUS)
    ellipse(0, 0, this.r);
    //imageMode(CENTER);
    //image(this.image, pos.x, pos.y, this.width, this.height);
    pop();
  }
}