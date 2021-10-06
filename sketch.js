//Create The Var's and The Sprites
var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;
var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;
var pinkCG, yellowCG,redCG;
var END =0;
var PLAY =1;
var gameState = PLAY;
var distance=0, longestDistance=0;
var gameOver, restart;

function preload(){
  //Load The Images And The Animations
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}


function setup(){ 
  //create The Canvas, Path, GameOver Sign, Group's For The Diffrent Cyclists
  createCanvas(window.innerWidth,300);
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;
  mainCyclist  = createSprite(70,150);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;
  mainCyclist.setCollider("rectangle",0,0,40,40);
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;  
  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();  
}


function draw() {
  //Draw The Background And Reset The Screen
  background(0); 
  //Draw The Sprites
  drawSprites();


  //set The textSize, fill and The text To Display
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);

  // Count The Distance That the Player Has Traveled, Set The Path Velocity, Set The Y Cordinate For The Player According To The Mouse Y Cordinate, Create The Edge Sprites And Collide The Player With The Edges, And Reset The Paths Possition
  if(gameState===PLAY){
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
   mainCyclist.y = World.mouseY;
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  if(path.x < 0 ){
    path.x = width/2;
  }
    

  //Play The Bell Sound If You Press Space
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //Randomly Send Out One Of The Cyclists On To The Screen
  var select_oppPlayer = Math.round(random(1,3));
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
  //End the Game If Any Of the Cyclists Are Touching The Player
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }   
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

//Run This Code if the Game Has Ended
}else if (gameState === END) {
  //Set The Longest Distance Traveled TO Distance If Distance Is Higher
  if (distance >= longestDistance){
    longestDistance = distance;
  }


  //Set The Game Over To visable
  gameOver.visible = true;

  //set The textSize, fill and The text To Display
  textSize(20);
  fill(255);
  text("Press Up Arrow To Try Again", 500,200);


  //Set The Velocity Of The Path
  path.velocityX = 0;


  //Set The velocity Of The Main Player
  //Set The lifeTime Of The Main Player
  mainCyclist.velocityY = 0;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg2);


  //Set The velocity Of Each Of The Cyclists
  //Set The lifeTime Of Each Of The cyclists
  pinkCG.setVelocityXEach(0);
  pinkCG.setLifetimeEach(-1);
  
  yellowCG.setVelocityXEach(0);
  yellowCG.setLifetimeEach(-1);
  
  redCG.setVelocityXEach(0);
  redCG.setLifetimeEach(-1);

  
  //Run The reset Function If The Up Arrow Key Is Pressed
  if(keyDown("UP_ARROW")) {
    reset();
  }
  }
}


//Code for the diffrent Cyclists
function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}


//Run This When The Game Is Reset
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();  
  distance = 0;
}

//Credits
console.log("Credits");

//Code By Johaan
console.log("Code By Johaan");
//Images And Sounds By https://code.byjusfutureschool.com/
console.log("Images And Sounds By https://code.byjusfutureschool.com/");