var rocket, rocketImage;
var comet, cometImage;
var space, spaceImage;
var gameState = "play"

function preload(){
    rocketImage = loadImage("rocket.png");
    cometImage = loadImage("planet.png");
    spaceImage = loadImage("space.png");
}

function setup() {
    createCanvas(600,600);
  
    cometGroup = new Group();

    invisibleBlockGroup = new Group();
    rocket = createSprite( 300,300,5,5);
    rocket.addImage("rocket",rocketImage);
    rocket.scale = 0.06; 
}

function draw() {
    background(0);
    if (gameState === "play") {
        if(keyDown("left_arrow")){
            rocket.x = rocket.x - 3;
        }
        
        if(keyDown("right_arrow")){
            rocket.x = rocket.x + 3;
        }
        
        if(keyDown("space")){
            rocket.velocityY = -10;
        }
        
        rocket.velocityY = rocket.velocityY + 0.8
        
        if(spaceImage.y > 400){
            spaceImage.y = 300
        }
        spawncomet();
    
        if(cometGroup.isTouching(rocket)){
            rocket.velocityY = 0;
        }
        if(invisibleBlockGroup.isTouching(rocket) || rocket.y > 600){
            rocket.destroy();
            gameState = "end"
        }
        
        drawSprites();
      }
      if (gameState === "end"){
            stroke("yellow");
            fill("yellow");
            textSize(30);
            text("Game Over", 230,250)
      }
}

function spawncomet() {

    if (frameCount % 240 === 0) {
      var comet = createSprite(200, -50);
      var invisibleBlock = createSprite(200,15);
      invisibleBlock.width = comet.width;
      invisibleBlock.height = 2;
      
      comet.x = Math.round(random(120,400));
      comet.scale = 0.4;
      
      invisibleBlock.x = comet.x;
      
      comet.addImage(cometImage);
      
      
      comet.velocityY = 1;
     
      invisibleBlock.velocityY = 1;
      
      rocket.depth = comet.depth;
      rocket.depth +=1;
     
      comet.lifetime = 800;
      
      invisibleBlock.lifetime = 800;
      cometGroup.add(comet);
      invisibleBlock.debug = true;
      
      invisibleBlockGroup.add(invisibleBlock);
    }
  }