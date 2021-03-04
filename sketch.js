/******************************
Boy or Girl? 
By Dana Capistrano

p5.timer.js created by Scott Kildall
https://github.com/scottkildall/p5.timer

p5.clickable.js is created by Lartu
https://github.com/Lartu/p5.clickable

***********************************/

//global variables
//simple countdown timer
var simpleTimer;
//window dimensions
var w = 1500;
var h = 1080;
//function variable
var drawFunction;
//music and sound loop
var music;
var musicIsLooping = true;
//font
var myFont;
//Text offset measurements
var gTextOffset = 90;
var L_wTextOffset = 280;
var T_hTextOffset = 500;
var B_hTextOffset = 1000;
var R_wTextOffset = 1270;
//image offset measurements
var hBodyOffset = 40;
//colors
var greyCol = '#868686';
var greenCol = '#22E67E';
var blueCol = '#0000FF';
var darkgreyCol = '#E6E6E6';
var pinkCol = '#fc72ce';
var a;
//camera capture
let capture
var wCamDimension = 1500;
var hCamDimension = 1080;
//image
var spectrum;
var body;
//Verticies Array List for morphing from square to circle
let circle = [];
let square = [];
let morph = [];
let state = false;
//l to r opacity circle variables
var circX = 800;
var circSpeedX = 7;
//sine wave variables
let xspacing = 30;
let waveWidth;
let theta = 0.0;
let amplitude = 130.0;
let period = 500.0;
let dx;
let yvalues;
//growing circle array
var growCirc = [];


//preload of music, image and font
function preload() {
    myFont = loadFont('assets/DotGothic16-Regular.ttf');
    music = loadSound('assets/FullPanther.mp3');
    body = loadImage('assets/bodyoutline.png');
    spectrum = loadImage('assets/GenderExistsOnASpectrum.gif');
}

function setup() {
    createCanvas(w, h);
    //item alignments
    imageMode(CENTER);
    rectMode(CENTER);
    //simple timer time in ms
    simpleTimer = new Timer(10000);
    //font and text setups
    textSize(25);
    textFont(myFont);
    //music autoplaying
    music = createAudio('assets/FullPanther.mp3');
    music.autoplay(true);
    //load camera capture
    capture = createCapture(VIDEO);
    capture.size(w, h);
    // capture.hide();
    //two cubes with moving triangle variables
      s = 150;
  r = PI;
  k = 2;
  j= 2;
    //Merging shape for drawGenderQueerTransformation
    //creating a circle with vectors
    for (let angle = 0; angle < 360; angle += 9) {
        let v = p5.Vector.fromAngle(radians(angle - 135));
        v.mult(200);
        circle.push(v);
        morph.push(createVector());
        circX = width / 2 - 700;
    }
    //creating a square with vertices
    //top of square
    for (let x = -400; x < 400; x += 80) {
        square.push(createVector(x, -400));
    }
    // Right side
    for (let y = -400; y < 400; y += 80) {
        square.push(createVector(400, y));
    }
    // Bottom
    for (let x = 400; x > -400; x -= 80) {
        square.push(createVector(x, 400));
    }
    // Left side
    for (let y = 400; y > -400; y -= 80) {
        square.push(createVector(-400, y));
    }
    //defining variables for sine wave
    waveWidth = width + 16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(waveWidth / xspacing));
    //load splash screen
    drawFunction = drawLanding;

}

function draw() {
    background('#1e1c1a');
    image(capture, width / 2, height / 2, wCamDimension, hCamDimension);
    image(body, width / 2, height / 2 + hBodyOffset);
    drawFunction();
}

//Landing Screen
drawLanding = function() {
    capture.hide();
    background(darkgreyCol);
    textSize(25);
    fill(greenCol);
    textAlign(CENTER);
    text("please allow your webcam for this experience", width / 2, gTextOffset);
    fill(pinkCol);
    text("Back in the day, most people understood the world in terms of just boys and girls. But did you know that gender is more complex than that?", width / 2, height / 2 + 80, 900, 90);
    textSize(100);
    fill(greenCol);
    text("Is it a boy or girl ?", width / 2, height / 2);
    fill(blueCol);
    text("Is it a boy or girl  ", width / 2, height / 2);
}

//outline align
drawOutlineAlign = function() {
    fill(greenCol);
    textSize(25);
    text("please align your body with the outline", width / 2, gTextOffset);
}

drawFamiliar = function() {
    textSize(100);
    fill(greenCol);
    text("look familiar ?", width / 2, height / 2 - 110);
    fill(blueCol);
    text("look familiar  ", width / 2, height / 2 - 110);
    text("this is you !", width / 2, height / 2);
}

drawTopicSelect = function() {
        //blue text title
        fill(blueCol);
        textSize(100);
        text("select a topic", width / 2, gTextOffset);
        //green text buttons
        fill(greenCol);
        textSize(37);
        text("range of gender identities", L_wTextOffset, T_hTextOffset - 200, 400, 100);
        text("sex assigned at birth vs. gender identity", L_wTextOffset, B_hTextOffset - 200, 400, 100);
        text("puberty and trans youth", R_wTextOffset, height / 2, 280, 200);
    }
    /********************** PATH 1: RANGE OF GENDER IDENTITIES **********************************/
drawGenderIdentities = function() {
        //blue text title;
        fill(blueCol);
        textSize(100);
        text("range of gender identity", width / 2, gTextOffset);
        //body text
        fill(darkgreyCol);
        textSize(25);
        text("When you're born, your sex is assigned in a medical way. But the sex listed on your birth certificate may not necessarily match your gender identity.", L_wTextOffset, T_hTextOffset, 400, 600);
        text("Gender identity is a person's inner experience of who they are in terms of gender.", L_wTextOffset, B_hTextOffset, 400, 600);
        text("Their deep personal sense of being male, female, a blend of both or neither.", R_wTextOffset, T_hTextOffset, 400, 600);
        text("While many people have a gender identity that's the same as their assigned birth sex, a female or male, that's not always the case because...", R_wTextOffset, B_hTextOffset, 400, 600);

    }
    //text stating gender is on a spectrum 
drawSpectrum = function() {
        image(spectrum, width / 2, height / 2);
    }
    //Non Binary definition and visualization
drawTransgenderTransformation = function() {
    //distance from vertices
    let totalDistance = 0;
    for (let i = 0; i < circle.length; i++) {
        let v1;
        //conditional statement for shifiting shapes
        if (state) {
            v1 = circle[i];
        } else {
            v1 = square[i];
        }
        let v2 = morph[i];
        v2.lerp(v1, 0.1);
        totalDistance += p5.Vector.dist(v1, v2);
    }
    //shifting shapes if verticies are close
    if (totalDistance < 0.1) {
        state = !state;
    }
    //shape properties
    translate(width / 2, height / 2);
    strokeWeight(4);
    beginShape();
    noFill();
    stroke(greenCol);

    morph.forEach(v => {
        vertex(v.x, v.y);
    });
    endShape(CLOSE);
    //text
    fill(darkgreyCol);
    textSize(25);
    noStroke();
    text("Some examples include, transgender, which means a person whos gender identity is not consistent with their assigned birth sex.", L_wTextOffset, T_hTextOffset, 400, 600);
}

//non binary definition and transformation example
drawNonBinaryTransformation = function() {
        //i forgot what the example was going to be
        fill(darkgreyCol);
        textSize(25);
        text("Non-Binary, which means a person whos identity does not fall in the category of either male or female.", L_wTextOffset, T_hTextOffset, 400, 300);
    }
    //Genderqueer definition and visualization
drawGenderQueerTransformation = function() {
    //moving the circle
    circX += circSpeedX;
    // circle features
    noStroke();
    ellipse(circX, height / 2, 500, 500);
    //mapping function for the alpha value of the cicle
    a = map(circX, width, width, 0, 255);
    fill(253,114,204);
    // moving conditions for the circle - bounce back
    if (circX >= width - 150 || circX <= 50) {
        circSpeedX = circSpeedX * -1;
    }
    fill(darkgreyCol);
    textSize(25);
    text("And genderqueer or genderfluid, which means a person who does not identify themselves as having a specific gender at all.", L_wTextOffset, T_hTextOffset, 400, 300);

}

drawStraightorGay = function() {
    fill(blueCol);
    textSize(37);
    text("does gender identity have to do with being straight or gay?", width / 2, gTextOffset, 500, 200);

    textSize(25);
    text("YES", L_wTextOffset, height / 2, 90, 75);
    text("NO", R_wTextOffset, height / 2, 90, 75);
}
drawUnderstanding = function() {
    textSize(25);
    fill(darkgreyCol);
    text("NO! Gender identity has to do with the way you feel about yourself.", L_wTextOffset, T_hTextOffset, 400, 200);
    text("Sexual orientation is based on the way you feel towards people you may or may not be attracted to", L_wTextOffset, B_hTextOffset, 400, 200);
    text("You do not have to fully understand someone to respect them.", R_wTextOffset, T_hTextOffset, 400, 200);
    text("But you can take some steps to respect them...", R_wTextOffset, B_hTextOffset, 400, 200);
}

drawRespect = function() {
    fill(blueCol);
    textSize(25);
    text("To start, try not to make assumptions about a person's gender", L_wTextOffset, T_hTextOffset, 400, 159);
    text("Use the name and pronouns that they ask you to.", L_wTextOffset, B_hTextOffset, 400,159);
    text("Above all, be a friend or ally for people", R_wTextOffset, T_hTextOffset, 400,159);

    //to go back button
        fill(greenCol);
        text("go back", 100, 100);
}

/********************** PATH 2: SEX ASSIGNED AT BIRTH VS GENDER IDENTITY ********************/
//Sex Assigned at birth vs. gender identity
drawVersusIntro = function() {
    fill(blueCol);
    textSize(100);
    text("sex assigned at birth vs. gender identity", width / 2, gTextOffset, 1354, 246);
    textSize (25);
    fill (darkgreyCol);
    text("'Is it a boy or a girl ? is often the first question people ask when a baby is born'", L_wTextOffset, T_hTextOffset, 384, 200)
    text("The response to this question is most often determined by the external genitals of the baby", L_wTextOffset, B_hTextOffset, 400,200);
    text("Most people, including many in the medical community, see only two possibilities", R_wTextOffset, T_hTextOffset, 337,200);
    fill(greenCol);
    text("Girl or Boy?", R_wTextOffset, B_hTextOffset, 169,169);
}

drawSexDefinition = function() {
    fill(darkgreyCol);
    textSize(25);
    text("This determination of a baby's gender is called", L_wTextOffset, 230, 384,200);
    text("Our sex assigned at birth is based on how someone else sees our bodies, and does not take into consideration how we see ourselves as a whole person.", L_wTextOffset, B_hTextOffset - 300, 400,200);
    text("For some people, their sex assigned at birth may be distinctly different from their gender identity.", R_wTextOffset, height / 2, 337, 200);
    fill(blueCol);
    text("sex assigned at birth", L_wTextOffset, 240);
}
drawGenderIndentity = function() {
    textSize(25);
    fill(darkgreyCol);
    text("Gender identity is how a person identifies, or how they see themselves.", L_wTextOffset, T_hTextOffset, 384,200);
    fill(blueCol);
    text("One's internal sense of being male, female, both of these, neither of these, or another gender altogether is called gender identity", R_wTextOffset, T_hTextOffset, 400,200);

}
drawCisgender = function() {
        textSize(25);
        fill(darkgreyCol);
        text("Most people whose sex assigned at birth is female grow up to identity as female", L_wTextOffset, T_hTextOffset-200, 384,300);
        text("and most people whose sex assigned at birth is male, grow up to identify as male.", L_wTextOffset, B_hTextOffset-200, 400,300);
        text("these people are", R_wTextOffset, 230, 400,200);
        text("CISGENDER", R_wTextOffset, 261, 400,200);
        fill(blueCol);
        text("cisgender is a gender identity used for a person whose sex assigned at birth matches their internal sense of who they are.", R_wTextOffset, B_hTextOffset, 400,300);
        //funky shape drawing
        noStroke();
        //start drawing cube
        push();
        //positioning of right cube
        translate(width / 2 + 400, height / 2);
        if (j === 0) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
        }
        if (j === 1) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(0, 0, s, -s, s, s);
        }
        if (j === 2) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(s, -s, s, s, -s, s);
        }
        if (j === 3) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(greyCol);
            triangle(0, 0, s, -s, s, s);
            triangle(0, 0, -s, -s, -s, s);
        }
        if (j === 4) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(s, -s, s, s, -s, s);
            triangle(s, s, -s, s, -s, -s);
        }
        if (j === 5) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            rect(0, 0, s * 2, s * 2);
        }

        pop();

        noStroke();
        //start drawing cube
        push();
        //positioning of left cube
        translate(width / 2 - 400, height / 2);
        if (j === 0) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
        }
        if (j === 1) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(0, 0, s, -s, s, s);
        }
        if (j === 2) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(s, -s, s, s, -s, s);
        }
        if (j === 3) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(0, 0, s, -s, s, s);
            triangle(0, 0, -s, -s, -s, s);
        }
        if (j === 4) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(s, -s, s, s, -s, s);
            triangle(s, s, -s, s, -s, -s);
        }
        if (j === 5) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            rect(0, 0, s * 2, s * 2);
        }

        pop();

    }
    //click function to move triangles in the square for this page only
function mousePressed() {
    if (drawFunction === drawCisgender) {
        j = j + 1;
        if (j === 6) {
            j = 0;
        }
    }
}
drawTransgender = function() {
        fill(darkgreyCol);
        textSize(24);
        text("For some people, their sex assigned at birth, girl or boy, doesn't match their gender identity...", L_wTextOffset, T_hTextOffset-300, 384,200);
        text("or their internal sense of who they know themselves to be.", L_wTextOffset, B_hTextOffset-100, 300,200);
        fill(blueCol);
        text("Transgender is a gender identity that may be used by a man or woman who was not assigned their gender at birth", R_wTextOffset, T_hTextOffset-300, 400,200);
        //funky shape drawing
        noStroke();
        //start drawing cube
        push();
        //positioning of right cube
        translate(width / 2 + 400, height / 2);
        if (k === 0) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
        }
        if (k === 1) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(0, 0, s, -s, s, s);
        }
        if (k === 2) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(s, -s, s, s, -s, s);
        }
        if (k === 3) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(0, 0, s, -s, s, s);
            triangle(0, 0, -s, -s, -s, s);
        }
        if (k === 4) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(s, -s, s, s, -s, s);
            triangle(s, s, -s, s, -s, -s);
        }
        if (k === 5) {
            fill(greenCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            rect(0, 0, s * 2, s * 2);
        }

        pop();

        noStroke();
        //start drawing cube
        push();
        //positioning of left cube
        translate(width / 2 - 400, height / 2);
        if (k === 0) {
            fill(pinkCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            rect(0, 0, s * 2, s * 2);
        }
        if (k === 1) {
            fill(pinkCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(0, 0, s, -s, s, s);
        }
        if (k === 2) {
            fill(pinkCol);
            rect(0, 0, s * 2, s * 2);
        }
        if (k === 3) {
            fill(pinkCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(s, -s, s, s, -s, s);
            triangle(s, s, -s, s, -s, -s);
        }
        if (k === 4) {
            fill(pinkCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(0, 0, s, -s, s, s);
            triangle(0, 0, -s, -s, -s, s);
        }
        if (k === 5) {
            fill(pinkCol);
            rect(0, 0, s * 2, s * 2);
            fill(darkgreyCol);
            triangle(s, -s, s, s, -s, s);
        }

        pop();
    }
    //click function to move triangles in the square for this page only
function mousePressed() {
    if (drawFunction === drawTransgender) {
        k = k + 1;
        if (k === 6) {
            k = 0;
        }
    }
}
drawGenderQueerWave = function() {
    textSize(25);
    fill(darkgreyCol);
    text("Sometimes, a person's gender identity, or the way they feel or see themselves doesn't fall neatly into the binary of definitions our society has of female or male.", L_wTextOffset, T_hTextOffset, 384,200);
    text("People who feel this way may describe their gender identity as", L_wTextOffset, 505, 426,200);
    fill(blueCol);
    text("genderqueer, gender fluid, or gender non-binary", L_wTextOffset, 578, 426,200);
    text("People who identity as gender queer or gender non-binary may express a combination of masculinity and feminiity, or neither in their gender expression", R_wTextOffset, T_hTextOffset, 517,200);
    //sine wave
    theta += 0.02;
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * amplitude;
        x += dx;

        noStroke();
        fill(greenCol);
        for (let x = 0; x < yvalues.length; x++) {
            ellipse(x * xspacing, height / 2 + yvalues[x], 30, 30);
        }
    }
}

drawVersusEnd = function() {
        fill(blueCol);
        textSize(25);
        text("While there are many different labels used to describe gender identity, you don't need to label yourself or share your gender identity if you don't want to!", L_wTextOffset, T_hTextOffset, 384,200);
        text("You may feel unsure or be uncomfortable sharing this information bout yourself with others", L_wTextOffset, B_hTextOffset, 484,200);
        text("Trust yourself to know what words feel right for you and when to share that information with friends and family", R_wTextOffset, T_hTextOffset, 517,200);
        //to go back button
        fill(greenCol);
        text("go back", 1200, 1500);
    }
    /********************** PATH 3: PUBERTY RESOURCES FOR TRANS YOUTH ********************************/
    //puberty and trans youth resource
drawPuberty = function() {
    fill(pinkCol);
    textSize(100);
    text("puberty and transgender youth", width / 2, gTextOffset);
    fill(darkgreyCol);
    text("A person who is transgender is someone who's internal sense of their gender, being a boy, girl, or something else, does not match their physically body.", L_wTextOffset, T_hTextOffset, 424, 193);
    text("People who feel this way sometimes feel anxious when they being to reach puberty and their body starts to change in a way that doesn't match their internal sense of their gender.", L_wTextOffset, B_hTextOffset, 400, 225);
    text("The feeling of wanting to explore how you feel about your gender is totally normal", R_wTextOffset, T_hTextOffset, 369, 169);
    text("Before your body starts to change, it's important to talk with a parent, counselor, therapist or doctor about the feeling you have regarding you gender", R_wTextOffset, B_hTextOffset, 360, 220);
}

drawCouseling = function() {
    //forloop displaying a new circle at every draw loop
    for (var i = 0; i < growCirc.length; i++) {
        growCirc[i].update();
        growCirc[i].ellipse();
        console.log(growCirc.length);
        //lifespan of the circle
        if (growCirc[i].lifespan <= 0) {
            growCirc.splice(i, 1);
        }
    }
    //mouse click function, when mouse if clicked, add a new circle
    function mouseClicked() {
        if (drawFunction === drawCouseling) { //might need to delete if does not work
            growCirc.push(new Circle(mouseX, mouseY, random(7, 15)));
        }
    }
    //information text
        fill(darkgreyCol);
    textSize(25);
    text("After some discussion and counseling you may be referred to an endocrinologist", L_wTextOffset, T_hTextOffset, 400, 190);
    text("Puberty blockers are medication that will stop you body from changing . They are usually given as an injection or implants", R_wTextOffset, T_hTextOffset, 380, 193);
    text("They blocks the production of hormones to stop or delay the physical changes of puberty", R_wTextOffset, B_hTextOffset, 380, 223);
    fill(pinkCol);
    text("Endocrinologist specialize in hormones and their the most likely to prescribe puberty blockers for someone who wants them", L_wTextOffset, B_hTextOffset, 400, 255);
}

//class to make the circles
function Circle(x, y, s) {
    //   //set any properties
    this.x = width / 2; //x position
    this.y = height / 2; //y position
    this.s = s; //circle size
    //give each circle a lifespan
    this.lifespan = 300;
    //this draws the ellipse
    this.ellipse = function() {
            //define visual propoerties of the ellipse
            noFill();
            strokeWeight(5);
            stroke(pinkCol);
            //draw the ellipse
            ellipse(this.x, this.y, this.s);
        }
        //this makes it grow
    this.update = function() {
        this.s = this.s + 3;
        this.lifespan--;
    }
}
drawPubertyEnd = function() {
	fill (darkgreyCol);
	textSize (25);
	text ("The effects of the medication are only temporary", L_wTextOffset, T_hTextOffset, 424,100);
	text ("If a person stops using puberty blockers, the physical changes of puberty will begin again.", L_wTextOffset, B_hTextOffset, 400, 200);
	text ("whether you identify as a male, female, genderqueer or any other, there are lots of lots of ways to manage puberty so it can be a fun and exciting time rather than scary or stressful one", R_wTextOffset, height/2, 379, 275);
	//to go back button
        fill(greenCol);
        text("go back", 1200, 1500);

}
//nav
function keyTyped() {
    if (drawFunction === drawLanding) {
        if (key === 'q') {
            drawFunction = drawOutlineAlign;
        }
    }

    if (drawFunction === drawOutlineAlign) {
        if (key === 'w') {
            drawFunction = drawFamiliar;
        }
    }

    if (drawFunction === drawFamiliar) {
        if (key === 'e') {
            drawFunction = drawTopicSelect;
        }
    }
    if (drawFunction === drawTopicSelect) {
        if (key === 'r') {
            drawFunction = drawGenderIdentities;
        } else if (key === 't') {
            drawFunction = drawVersusIntro;
        }else if (key =='y'){
        	drawFunction = drawPuberty;
        }
    }
    //part 1
    if (drawFunction === drawGenderIdentities) {
        if (key === 'u') {
            drawFunction = drawSpectrum;
        }
    }

    if (drawFunction === drawSpectrum) {
        if (key === 'i') {
            drawFunction = drawTransgenderTransformation;
        }
    }
     if (drawFunction === drawTransgenderTransformation) {
        if (key === 'o') {
            drawFunction = drawNonBinaryTransformation;
        }
    }
    if (drawFunction === drawNonBinaryTransformation) {
    	if (key === 'p') {
    		drawFunction = drawGenderQueerTransformation;
    	}
    }
     if (drawFunction === drawGenderQueerTransformation) {
        if (key === 'a') {
            drawFunction = drawStraightorGay;
        }
    }
  
     if (drawFunction === drawUnderstanding) {
        if (key === 'd') {
            drawFunction = drawRespect;
        }
    }
    //go back button
    //part 2
     if (drawFunction === drawVersusIntro) {
        if (key === 'f') {
            drawFunction = drawSexDefinition;
        }
    }
     if (drawFunction === drawSexDefinition) {
        if (key === 'g') {
            drawFunction = drawGenderIndentity;
        }
    }
     if (drawFunction === drawGenderIndentity) {
        if (key === 'h') {
            drawFunction = drawCisgender;
        }
    }
     if (drawFunction === drawCisgender) {
        if (key === 'j') {
            drawFunction = drawTransgender;
        }
    }
     if (drawFunction === drawTransgender) {
        if (key === 'k') {
            drawFunction = drawGenderQueerWave;
        }
    }
     if (drawFunction === drawGenderQueerWave) {
        if (key === 'l') {
            drawFunction = drawVersusEnd;
        }
    }
    //part 3
     if (drawFunction === drawPuberty) {
        if (key === 'z') {
            drawFunction = drawCouseling;
        }
    }
     if (drawFunction === drawCouseling) {
        if (key === 'x') {
            drawFunction = drawPubertyEnd;
        }
    }
}
    
    
    
    
    
    
    








    function mouseClicked() {
        if (drawFunction === drawStraightorGay) {
            drawFunction = drawUnderstanding;
        }
    }

//navigation
/****************
 // in draw outlinealign

 //if timer is expired, go to new state
 if (simpleTimer.expired() ) {
	drawFunction = drawTopicSelect;
 }

 //simulate button pressed
 function keyPressed(){
	
	// if we are in landing screen, go to draw outline and start timer!
	if (drawFUnction === drawLanding ) {
	drawFUnction = drawOutlineAlign;
	simpleTimer.start();
	}
 }
 }
 *****************/