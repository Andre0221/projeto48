var backgroundImg, backgroound;
var shooter, shooterImg, shooterImg_2;
var zumbi, zumbi_img;
var coracao1, coracao1_img, coracao2, coracao2_img, coracao3, coracao3_img;
var zumbis;
var balas = 70;
var bala;
var municoes;
var gameState = "luta";
var score = 0;
var vida = 3;
var win, lose, explosion;

function preload(){
  backgroundImg = loadImage("assets/bg.jpeg");
  shooterImg = loadImage("assets/shooter_2.png");
  shooterImg_2 = loadImage("assets/shooter_3.png");
  zumbi_img = loadImage("assets/zombie.png");
  coracao1_img = loadImage("assets/heart_1.png");
  coracao2_img = loadImage("assets/heart_2.png");
  coracao3_img = loadImage("assets/heart_3.png");
  win = loadSound("assets/win.mp3");
  lose = loadSound("assets/lose.mp3");
  explosion = loadSound("assets/explosion.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  backgroound = createSprite(displayWidth / 2 +160, displayHeight / 2 +75, 20,20);
  backgroound.addImage(backgroundImg);
  backgroound.scale = 1.25;

  shooter = createSprite(displayWidth -1150, displayHeight -300, 50, 50);
  shooter.addImage(shooterImg);
  shooter.scale = 0.6;
  shooter.setCollider("rectangle",0 ,0 ,250,400);
  shooter.debug = false;

  coracao1 = createSprite(displayWidth +270, 40, 20, 20);
  coracao1.addImage("coracao1",coracao1_img);
  coracao1.scale = 0.5;
  coracao1.visible = false;

  coracao2 = createSprite(displayWidth +220, 40, 20, 20);
  coracao2.addImage("coracao2",coracao2_img);
  coracao2.scale = 0.5;
  coracao2.visible = false;

  coracao3 = createSprite(displayWidth +170, 40, 20, 20);
  coracao3.addImage("coracao3",coracao3_img);
  coracao3.scale = 0.5;
  
  zumbis = new Group();
  municoes = new Group();
  
  
  edges = createEdgeSprites();
}

function draw() {
  background(0); 

  if (gameState === "luta"){

  if (keyDown(UP_ARROW) || touches.length > 0){
    shooter.y = shooter.y -10;
  }

  if (keyDown(DOWN_ARROW) || touches.length > 0){
    shooter.y = shooter.y +10;
  }

  if (vida === 3){
    coracao3.visible = true;
    coracao2.visible = false;
    coracao1.visible = false;
  }

  if (vida === 2){
    coracao3.visible = false;
    coracao2.visible = true;
    coracao1.visible = false;
  }

  if (vida === 1){
    coracao3.visible = false;
    coracao2.visible = false;
    coracao1.visible = true;
  }


  if (vida === 0){
    gameState = "fim";
    lose.play();
    lose.setVolume(0.5);
  }

  if (score === 300){
    gameState = "vitoria";
    win.play();
  }


  if (keyWentDown("space") || touches.length > 0){

    bala = createSprite(displayWidth -1150, shooter.y -50, 20, 10 );
    explosion.play();
    bala.velocityX = 20;
    municoes.add(bala);
    shooter.depth = bala.depth;
    shooter.depth += 2;

    balas -= 1;

    shooter.addImage(shooterImg_2);

  }
  else if (keyWentUp("space") || touches.length > 0){
    shooter.addImage(shooterImg);

  }

  if (balas === 0){

    gameState = "semMunicoes";
    lose.play();
    lose.setVolume(0.5);
  }

  if (zumbis.isTouching(municoes)){
 for (var i = 0; i <zumbis.length; i += 1){
  if(zumbis[i].isTouching(municoes)){

    zumbis[i].destroy();
    municoes.destroyEach();
    score += 5;
  }
 }
  }
  if (zumbis.isTouching(shooter)){
    lose.play();
    lose.setVolume(0.5);
    for (var i = 0; i <zumbis.length; i += 1){

      if(zumbis[i].isTouching(shooter)){

        zumbis[i].destroy();
        vida -=1;
        
      }


    }
  }

  shooter.collide(edges[3]);
  shooter.collide(edges[2]);

  criacao_zumbi();
  }
  
drawSprites();
fill("red");
textSize(30);
text("Balas:"+balas, displayWidth -210, displayHeight /2 -450);
text("Score:"+score, displayWidth -210, displayHeight /2 -400);

if (gameState === "fim"){

  textSize(100);
  fill("red");
  text("Você Perdeu", 400, 400);

  shooter.destroy();
  zumbis.destroyEach();
  
}
else if (gameState === "semMunicoes"){

  textSize(100);
  fill("red");
  text("Acabou a Munição", 400, 400);

  shooter.destroy();
  zumbis.destroyEach();
  municoes.destroyEach();
}
else if (gameState === "vitoria"){

  textSize(100);
  fill("green");
  text("Vitoria", 400, 400);

  shooter.destroy();
  zumbis.destroyEach();
}

}

function criacao_zumbi(){

  if (frameCount % 50 === 0){
    zumbi = createSprite(random(500, 1100), random(100, 500), 40, 40);
    zumbi.addImage(zumbi_img);
    zumbi.scale = 0.25;
    zumbi.velocityX = -3;
    zumbi.setCollider("rectangle", 0, 0, 400, 800);
    zumbi.debug = false;
    zumbi.lifetime = 400 ;
    zumbis.add(zumbi);
  }


}
