const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImage;
var ballon,hotAirBallonImage;
var dataBase,position;

function preload(){
  backgroundImage = loadImage("Hot Air Ballon-01.png");
  hotAirBallonImage = loadImage("Hot Air Ballon-02.png");
}

function setup() {
  dataBase=firebase.database();
  createCanvas(500,500);
  engine = Engine.create();
  world = engine.world;
  ballon = createSprite(250, 250, 50, 50);
  ballon.addImage(hotAirBallonImage);
  ballon.scale=0.3;
  var ballonPosition=dataBase.ref('ballon/position');
  ballonPosition.on("value",readposition,showerror)
}

function draw() {
  background(backgroundImage);
  text("use arrow keys to move",100,50);
  if (position!==undefined){
     
    
    if(keyDown(LEFT_ARROW)){
       ballon.x = ballon.x -10;
    }
    else if(keyDown(RIGHT_ARROW)){
       ballon.x = ballon.x +10;
    }
    else if(keyDown(UP_ARROW)){
       ballon.y = ballon.y -10;
    } 
    else if(keyDown(DOWN_ARROW)){
       ballon.y = ballon.y +10;
    }
    drawSprites();
 }
}
function changePosition(x,y){
  ballon.x = ballon.x + x;
  ballon.y = ballon.y + y;
}
function readposition(data){
position=data.val();
ballon.x=position.x
ballon.y=position.y
}
function showerror(){
console.log("error in writing to the database");
}
function writePosition(x,y){
  dataBase.ref('ballon/position').set({ x: position.x + x , y: position.y + y })
}