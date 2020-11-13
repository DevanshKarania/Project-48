var player, background, playerIMG;
var backgroundIMG;
var enemy, enemy2, enemy3, enemy4, enemy5;
var eI, eI2, eI3, eI4, eI5;
var meteor, meteor2;
var bullet, bulletIMG, bullet2IMG, bullet2;
var gamestate = "start";
var score = 0;
var gameoverIMG;
var hit = 3;
var health2IMG, health1IMG, health3IMG, health4IMG; 
var blinkTime1 = 0;

function preload(){
backgroundIMG = loadImage("Images/background.jpg");
eI = loadImage("Images/e1.png");
eI2 = loadImage("Images/e2.png");
eI3 = loadImage("Images/e3.png");
eI4 = loadImage("Images/e4.png");
eI5 = loadImage("Images/e5.png"); 
meteor = loadImage("Images/asteroid3.png");
meteor2 = loadImage("Images/Asteroid.png");
playerIMG = loadImage("Images/spaceship.png");
bulletIMG = loadImage("Images/bullet.gif");
bullet2i = loadImage("Images/bullet2.png");
gameoverIMG = loadImage("Images/gameover.png");
health1IMG = loadImage("Images/1health.png");
health2IMG = loadImage("Images/2health.png");
health3IMG = loadImage("Images/3health.png");
health4IMG = loadImage("Images/0health.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight-110);
  display = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  display.addImage(backgroundIMG);
  display.scale=2;
 // display.y = displayHeight/2-200;
 player = createSprite(displayWidth/2, displayHeight/2+190);
 player.addImage(playerIMG);
 player.scale = 0.5;

 var enemy = createSprite(displayWidth/2,displayHeight/2-200);
 enemy.addImage(eI);
 enemy.scale = 0.5;

 lives = createSprite(displayWidth/2+600, displayHeight/2-250);
 lives.addImage(health3IMG);

 bulletGroup = new Group();
 enemyGroup = new Group();
 bulletGroup2 = new Group();
 enemyGroup2 = new Group();
}


function draw() {
console.log(gamestate);

 if(gamestate == "play"){
/*  display.velocityY = 3;
 if(display.y>500){
 display.y = displayHeight/2-200;
 }*/

 spawnEnemy();
 //spawnEnemy2();
 

 if(World.frameCount % 600 == 0){
   gamestate = "enemy";
 }
 
 if(keyDown("RIGHT_ARROW")){
   player.x = player.x+5;
 }

 if(keyDown("LEFT_ARROW")){
   player.x = player.x-5;
 }
 
  if(bulletGroup.isTouching(enemyGroup)){
    score = score+1;
    enemyGroup.destroyEach();
  }
  if(keyDown ("UP_ARROW")){
    var temp = createBullet();
    temp.addImage(bulletIMG);
    temp.x = player.x;
    }
   
    if(enemyGroup.isTouching(player)){
      hit = hit - 1;
      enemyGroup.destroyEach();
      gamestate = "respawn";
    }
    for(var i = 0 ; i < 2 ; i = i + 1)
    {
      if(hit == 2)
      {
        lives.addImage(health2IMG);
      }
      
      if(hit == 1)
      {
        lives.addImage(health1IMG);
      }
      
      if(hit == 0)
      {
        gamestate = "end";
        lives.addImage(health4IMG);
      }
    
  }
}
  
 


 if(gamestate == "enemy"){
  

  

  if(keyDown("RIGHT_ARROW")){
   player.x =player.x+5;

  }
  
  if(keyDown("LEFT_ARROW")){
    player.x = player.x-5;
  }
  if(bulletGroup.isTouching(enemyGroup2)){
    score = score+1;
    enemyGroup.destroyEach();
  }
  if(keyDown ("UP_ARROW")){
    var temp = bullet2();
    temp.addImage(bullet2i);
    temp.x = player.x;
    }
   enemyBullet();
   if(bulletGroup2.isTouching(enemy)){
     score = score + 50;
     
     enemy.destroy();
     enemyGroup2.destroyEach();
   }
   enemyGroup.destroyEach();
   if(enemyGroup.isTouching(player)){
     gamestate = "end";
   }
   if(enemyGroup2.isTouching(player)){
    hit = hit - 1;
    enemyGroup2.destroyEach();
    gamestate = "respawn";
  }
  
  for(var i = 0 ; i < 2 ; i = i + 1)
  {
    if(hit == 2)
    {
      lives.addImage(health2IMG);
     // gamestate = "respawn";
    }
    
    if(hit == 1)
    {
      lives.addImage(health1IMG);
      //gamestate = "respwan";
    }
    
    if(hit == 0)
    {
      gamestate = "end";
      lives.addImage(health4IMG);
    }
  }  
 }
 if(gamestate == "respawn"){
   enemyGroup.destroyEach();
   enemyGroup2.destroyEach();
   bulletGroup.destroyEach();
   bulletGroup2.destroyEach();
   gamestate = "play";
 enemy.destroy();
}
 
  drawSprites();
  textSize(25);
  fill("white");
  text("Score:" + score, displayWidth/2-600, displayHeight/2-250);

  if(gamestate == "start"){
    textSize(32);
    fill("white");
    text("Press Space key to start.", displayWidth/2-200, displayHeight/2-50);
    if(keyDown("space")){
      gamestate = "play";
    }
  }

  if(gamestate == "end"){
    player.destroy();
    bulletGroup.destroyEach();
    enemyGroup.destroyEach();
    enemyGroup2.destroyEach();
    var gameover = createSprite(displayWidth/2, displayHeight/2+50);
    gameover.addImage(gameoverIMG);
  }   
}

function spawnEnemy(){
  if(World.frameCount%100 == 0){
  enemy = createSprite(random(displayWidth/2-500,displayWidth/2+500), 0);
  enemy.velocityY = 3;
  enemy.velocityX = 3;
  enemy.addImage(meteor);
  enemy.scale = 0.5;
  enemyGroup.add(enemy);
  enemy.debug = true;
  enemy.setCollider("circle", 0, 0, 5);
  }
}
function spawnEnemy2(){
  if(World.frameCount%300 == 0){
    enemy = createSprite(random(displayWidth/2-500,displayWidth/2+500), 0);
    enemy.velocityY = 3;
    enemy.addImage(meteors);
    enemy.scale = 0.5;
  }
    
}
function createBullet(){
var bullet = createSprite(displayWidth/2, displayHeight/2+190);

bullet.velocityY = -5;
bullet.lifetime = 100;
bulletGroup.add(bullet);
return bullet;

}
function enemyBullet(){
  if(World.frameCount % 100 == 0){
  enemy = createSprite(displayWidth/2,displayHeight/2-200);
  enemy.addImage(meteor2);
  enemy.velocityX = random(-5,5);
  enemy.velocityY = random(1,5);
  enemy.scale = 0.25;
 enemyGroup2.add(enemy);
  } 
}
function bullet2(){
 var bullet = createSprite(displayWidth/2, displayHeight/2+190);
 bullet.velocityY = -5;
bullet.lifetime = 100;
bulletGroup2.add(bullet);
bullet.scale = 0.05;
return bullet;
}