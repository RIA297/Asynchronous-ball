var sharon, database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);

    sharon = createSprite(250,250,10,10);
    sharon.shapeColor = "red";

    var sharonPosition = database.ref('Ball/Position');
    sharonPosition.on("value",read,showError);
}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }

        drawSprites();
    }
   
    
}

function writePosition(x,y){
    database.ref('Ball/Position').set({
        'x': position.x + x,
        'y': position.y + y
    })
    
}

function read(data){
    position = data.val();
    console.log(position.x)
    sharon.x = position.x;
    sharon.y = position.y;
}

function showError(){
    console.log("this is an error");
}
