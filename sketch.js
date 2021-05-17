const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

var engine, world;
var particles = [];
var playerLife = 0;
var backgroundImg;
var bgm,rocksound;
var gameState = "play";

function preload() {

  backgroundImg = loadImage("images/bg1.jpg");
  //rocksound=loadSound("sounds/rock.wav");


}

function setup() {

  createCanvas(1200, 400);
  engine = Engine.create();
  world = engine.world;
  player1 = new player(300, height - 30, 100, 100)
  ground = new Ground(600, height, 1200, 5);

}

function draw() {
  
  Engine.update(engine);
  background(0);
  imageMode(CENTER);
  image(backgroundImg, 600, 200, 1200, 400);

  if (gameState === "play") {

    playerLife = Math.round(frameCount / 10);
    Events.on(engine, 'collisionStart', collision);

    if (frameCount % 30 == 0) {
      newParticle();
    }

    textSize(30)
    fill("white")
    text("LifeTime  " + playerLife, width - 250, 50)

    for (var i = 0; i < particles.length; i++) {
      particles[i].display();
      if (particles[i].isOffScreen()) {
        World.remove(world, particles[i].body);
        i--;
      }

      if (player1.body.position.y > 450) {
        gameState = "end";
      }
    }
  }
  else if (gameState === "end") {
    console.log("gameover");
    textSize(35)
    fill("yellow");
    text("SURVIVED FOR:  " + playerLife, width - 800, 250);

    textSize(40)
    fill("red");
    text("GameOver", width - 700, 150);
    
    image(backgroundImg2, 600, 200, 1200, 400);

  }
  ground.display();
  player1.display();

}


function newParticle() {
  var p = new Particle(600, 0, random(5, 10));
  particles.push(p);
}

function collision(event) {
  var pairs = event.pairs;
  for (var i = 0; i < pairs.length; i++) {
    var labelA = pairs[i].bodyA.label;
    var labelB = pairs[i].bodyB.label;
    if (labelA == 'particle' && labelB == 'player') {
      //add audio file
     // rocksound.play();

    }
    if (labelB == 'particle' && labelA == 'particle') {
      //add audio
      //rocksound.play()
    }
    Matter.Body.setPosition(player1.body, { x: mouseX, y: player1.body.position.y + 0.01 });
  }
}