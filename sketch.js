const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var bgImg1,bgImg2,bgImg3,platform;
var bird, slingShot;
var gamestate = "onsling"
var str;
var score = 0
//Examples on array

//an array holding single data type
var arr1=[5,7,3,6,2]
console.log(arr1[4]);
console.log(str)
//an array holding multiple data types
var arr2=["soumya",true,55]
console.log(arr2);
arr2.push("arav");
arr2.pop();
//array storing list of arrays
var arr3=[[5,3],[7,4,1],[9,2]]
console.log(arr3[1][2])

function preload() {

    get_bgImage();
    backupImg = loadImage("sprites/rground.png");
    
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    

    ground = new Ground(600,height,1200,20);
    //platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    platform = new Platform(150, 305, 180,80)

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:100});
}

function draw(){
    if(bgImg1)
        background(bgImg1); 
       else if(bgImg2)
        background(bgImg2); 
      else if(bgImg3)
        background(bgImg3);
        else 
        background(backupImg);

    Engine.update(engine);

    textSize(20);
    fill('white');
    text("Score = "+ score, 80,50);
    

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.Score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.Score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gamestate !== "launched"){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    gamestate = "launched"
    slingshot.fly();
}
function keyPressed(){
    if (keyCode === 32){
        gamestate = "onsling"
        Matter.Body.setPosition(bird.body, {x: 200 , y: 50});
        bird.trajectory= [];
        slingshot.attach(bird.body);
    }
}

async function get_bgImage(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Australia/Melbourne ");
    var responseJSON= await response.json();
    var datetime= responseJSON.datetime;
    var hour= datetime.slice(11,13)
    
    console.log(hour);
    if(hour >= 06 && hour <= 16 ){
        bgImg2 = loadImage("sprites/rground.png")
    } 
    if(hour >= 17 && hour < 19 ){
        bgImg2 = loadImage("sprites/eground.png")
    }  else {
        bgImg3 = loadImage("sprites/nground.png")
    }
     
}