const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var gameState = "onSling";

function preload()
{
  treeIMG = loadImage("tree.png");	
  boyIMG = loadImage("boy.png");
}

function setup() {
	createCanvas(1200, 700);

  engine = Engine.create();
	world = engine.world;

  stone = new Stone(230,550)

  mango = new Mango(900,400)
  mango2 = new Mango(930,400)
  mango3 = new Mango(950,380)
  mango4 = new Mango(910,420)

  slingShot = new SlingShot(stone.body,{x:230,y:550});

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  mango.display();
  mango2.display();
  mango3.display();
  mango4.display();

  image(treeIMG,800,300,200,400);
  image(boyIMG,200,525,200,200);

  stone.display();

  detectcollision();
  
  drawSprites();
 
}

function mouseDragged(){
  if (gameState!=="launched"){
      Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
  }
}

function mouseReleased(){
  slingShot.fly();
  gameState = "launched";
}

function keyPressed(){
  if(keyCode === 32){
   slingShot.attach(stone.body);
   gameState = "returned";

  }
}

function detectcollision(stone, mango){
mangoBodyPosition = mango.body.position
stoneBodyPosition = stone.body.position

var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
  if(distance <= mango.r + stone.r){
    Matter.Body.setStatic(mango.body,false);
  }
}