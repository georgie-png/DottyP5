let X =[];
let Y =[];


let boxSize = 100;
let xoff = 0;


function setup() {
    createCanvas(600, 200, SVG);
    
    let xP=0;
    
    while(xP<width){
        yP=0;
        while(yP< height){
            
            append(X, xP+(boxSize/2));
            append(Y, yP+(boxSize/2));
            
            yP+=boxSize;
        }
        xP+=boxSize;
    }
    xoff = random(-1000,1000);
    
    mouseX = -1000;
    mouseY = -1000;
    
}

function draw() {
    colorMode(HSB);
    background(0);
    fill(color(255,0,255))
    strokeWeight(0);
    
    xoff += 0.01;
    
    let i = 0;
    let xP=0;
    
    
    
    while(xP<width){
        yP=0;
        while(yP< height){
            
            let dist2Mouse = dist(mouseX,mouseY, xP+(boxSize/2),yP+(boxSize/2));
            let dist2Cntr = dist(X[i],Y[i], xP+(boxSize/2),yP+(boxSize/2));
            let distGate = boxSize*1.1;
            
            
            
            if(dist2Mouse<distGate && dist2Cntr<distGate*0.5){
                let xMove = mouseX-X[i];
                let yMove = mouseY-Y[i];
                xMove*=0.1;
                yMove*=0.1;
                X[i]+=xMove;
                Y[i]+=yMove;
                
            }
            else if ( dist2Cntr!=0 && (dist2Cntr>distGate*0.52 || dist2Mouse>distGate) ){
                let xMove = (xP + (boxSize/2))-X[i];
                let yMove = (yP + (boxSize/2))-Y[i];
                xMove*=0.05;
                yMove*=0.05;
                X[i]+=xMove;
                Y[i]+=yMove;
            }
            let scl = dist2Mouse/distGate;
            
            scl*=0.5;
            
            let saturation =  (dist2Cntr/(boxSize/2));
            let noiseScale = 0.0025;
            let hue = noise(X[i]*noiseScale, Y[i]*noiseScale,xoff );
            
            fill(color(hue*360,saturation*255,255))
            
            ellipse(X[i],Y[i], boxSize*scl, boxSize*scl);
            
            
            i+=1;
            yP+=boxSize;
        }
        xP+=boxSize;
    }
    
    
    
}

function keyPressed() {
    print("Saved")
    save("mySVG.svg");
  
}

