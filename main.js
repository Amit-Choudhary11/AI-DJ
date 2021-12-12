song="";
leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";
lWScore="";
rWScore="";
volume=1;

function preload(){
song = loadSound('music.mp3');
}


function setup(){
canvas=createCanvas(550,430);
canvas.position(480,250);
video=createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotResults);
}


function draw(){
image(video,0,0,550,430);

if(lWScore > 0.2){
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX,leftWristY,20);
numberLWY= Number(leftWristY);
removeDecimals= floor(numberLWY);
    volume= removeDecimals/430;
    roundedDecimalValue= volume.toFixed(1);
    song.setVolume(roundedDecimalValue);
    document.getElementById("volumeLabel").innerHTML= "Volume: " + roundedDecimalValue;
}

if(rWScore > 0.2){
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightWristX,rightWristY,20);
}


}

function playMusic(){
    song.play();
    song.setVolume(volume);
    song.rate(1);
}

function modelLoaded(){
    console.log("model loaded");
}

function gotResults(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        lWScore= results[0].pose.keypoints[9].score * 100;
        rWScore= results[0].pose.keypoints[10].score * 100;

        console.log("left wrist x" + leftWristX, "left wrist y" + leftWristY);
        console.log("right wrist x" + rightWristX, "right wrist y" + rightWristY);
    }
}