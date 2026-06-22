// 🎵 Mouse Model
let canvas, synth, audioStarted = false, useGestureMode = false;
let particles = [], curves = [], currentCurve = null, recordingStartTime = null;
let showGuidance = false;
let palette = [];
let selectedColor;
let h = 8;

// 🎼 Musical Notes
const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
const noteLabels = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];

// 🤚 Hand Pose Model
let video, hands = [], painting;
let handPose;
let px, py = 0;

function preload() {
    // Load the handPose model
    handPose = ml5.handPose();
    
}


// 🎨 Setup Canvas & UI Elements
function setup() {
    
    // 初始化颜色 (示例使用HSB模式)
    colorMode(HSB);
    colors = [
        color(197, 82, 95), // 食指 - 青色
        color(283, 69, 63), // 中指 - 紫色
        color(344, 100, 93), // 无名指 - 粉色
        color(32, 68, 97)  // 小指 - 橙色
    ];
    selectedColor = colors[0]; // 默认颜色


    //console.log("ml5 version:", ml5); // Debugging: Ensure ml5 is loaded

    canvas = createCanvas(windowWidth * 0.9, windowHeight * 0.7);
    canvas.parent('canvas-container');
    window.addEventListener("resize", handleResize);
    background(255); 

    //attach event listeners
    document.getElementById('clear-button').addEventListener('click', clearCanvas);
    document.getElementById('play-button').addEventListener('click', playAllCurves);
    document.getElementById('guidance-button').addEventListener('click', () => {
        showGuidance = !showGuidance;
        drawGuidelines();
    });
    document.getElementById('mode-toggle').addEventListener('change', toggleMode);


    // Gesture Drawing Setup
    painting = createGraphics(width, height);
    painting.colorMode(HSB); // 确保绘画层使用相同模式





    video = createCapture(VIDEO);
    video.size(height*4/3, height);//how to remap the video size to the canvas size?
    video.hide();

    //debugging
    // console.log("video", video);
    // console.log("video", video.elt);

    // start detecting hands from the webcam video
    handPose.detectStart(video, gotHands);


}

// Callback function for when handPose outputs data
function gotHands(results) {
    // save the output to the hands variable
    hands = results;
}

// Toggle Between Mouse & Gesture Mode
function toggleMode() {
    useGestureMode = document.getElementById('mode-toggle').checked;
    document.getElementById('mode-label').textContent = useGestureMode ? "✋ Gesture Mode" : "🖱 Mouse Mode";
    clearCanvas(); // Ensure a clean switch
}

// Main Drawing Loop
function draw() {
    background(255); // Ensure visibility in dark mode
    if (useGestureMode) {
        drawVideoFeed();
        image(painting, 0, 0);
    }
    drawGuidelines();
    drawCurves();
    drawPlaybackPoints();

    if (useGestureMode) drawWithGesture(); // Only draw gestures when enabled
    particles.forEach(p => (p.update(), p.display()));
}

function drawVideoFeed() {
    if (!useGestureMode) return;
    
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
}

// 🤚 Draw Video Feed & Gesture Drawing
let isDrawing = false;
function drawWithGesture() {
    let videoRatio = video.width / video.height;
    let canvasRatio = width / height;

    let sx, sy, sWidth, sHeight; // Cropping coordinates
    let dx = 0, dy = 0, dWidth = width, dHeight = height; // Destination on canvas

    // Crop video feed to match canvas aspect ratio
    if (canvasRatio > videoRatio) {
        sWidth = video.width;
        sHeight = video.width / canvasRatio;
        sx = 0;
        sy = (video.height - sHeight) / 2; 
    } else {
        sHeight = video.height;
        sWidth = video.height * canvasRatio;
        sx = (video.width - sWidth) / 2;
        sy = 0;
    }

    // MIRROR VIDEO FEED
    push();  
    translate(width, 0);
    scale(-1, 1);
    image(video, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
    pop();  

    // Gesture Drawing & Saving
    if (hands.length > 0) {
        let leftHand, rightHand;

        // Find left & right hands
        hands.forEach(hand => {
            if (hand.handedness === "Left"){
                leftHand = hand;
            } 
            if (hand.handedness === "Right"){
                rightHand = hand;
            }
        });

        // 🎨 左手颜色选择逻辑
        if (rightHand) {
            let thumb = rightHand.thumb_tip;
            let fingers = [
                rightHand.index_finger_tip,
                rightHand.middle_finger_tip,
                rightHand.ring_finger_tip,
                rightHand.pinky_finger_tip
            ];

            fingers.forEach((finger, i) => {
                // 镜像坐标转换
                let fx = width - map(finger.x, 0, video.width, 0, width);
                let fy = map(finger.y, 0, video.height, 0, height);
                let tx = width - map(thumb.x, 0, video.width, 0, width);
                let ty = map(thumb.y, 0, video.height, 0, height);

                if (dist(fx, fy, tx, ty) < 30) {
                    selectedColor = colors[i];
                }
            });
        }

        // 🎨 右手绘画逻辑
        if (leftHand) {
            let index = leftHand.index_finger_tip;  // Get index finger tip
            let thumb = leftHand.thumb_tip; // Get thumb tip

            //mirror and map the hand position
            let mirroredIndexX = width - map(index.x, 0, video.width, 0, width);
            let mirroredIndexY = map(index.y, 0, video.height, 0, height);
            let mirroredThumbX = width - map(thumb.x, 0, video.width, 0, width);
            let mirroredThumbY = map(thumb.y, 0, video.height, 0, height);

            let d = dist(mirroredIndexX, mirroredIndexY, mirroredThumbX, mirroredThumbY);
            let x = (mirroredIndexX + mirroredThumbX) / 2;
            let y = (mirroredIndexY + mirroredThumbY) / 2;

            // 🎇 新增散射效果代码（手指张开时触发）
            if (d > 80) {
                leftHand.keypoints.forEach(keypoint => {
                    const x = width - map(keypoint.x, 0, video.width, 0, width);
                    const y = map(keypoint.y, 0, video.height, 0, height);
                    for (let i = 0; i < 3; i++) {
                        particles.push(new ScatterParticle(x, y, selectedColor));                    }
                });
            }

            else if (d < 50) {

            
                let x = (mirroredIndexX + mirroredThumbX) / 2;
                let y = (mirroredIndexY + mirroredThumbY) / 2;

                painting.stroke(selectedColor); 
                painting.strokeWeight(h);   
                painting.strokeCap(ROUND);  
            

                if (!isDrawing) {
                    isDrawing = true;
                    currentCurve = [];
                    
                    if (!audioStarted) {
                        Tone.start().then(() => {
                            synth = new Tone.AMSynth().toDestination();
                            audioStarted = true;
                        });
                    }
                }
                let note = getNoteFromPosition(y);
                currentCurve.push({
                    x: x,
                    y: y,
                    note: note,
                    time: millis() 
                });

                if (audioStarted) {
                    synth.triggerAttackRelease(note, "8n");
                    particles.push(new Particle(x, y, 10, synth, note, selectedColor));
                }
                painting.line(px, py, x, y);
                
            } else if (isDrawing) {
                curves.push(currentCurve);
                currentCurve = null;
                isDrawing = false;
            }
            px = x;
            py = y;
        }
        image(painting, 0, 0);
    }
}

function playAllCurves() {
    if (!curves.length) return;

    let now = Tone.now();
    let allTimes = curves.flat().map(p => p.time);
    let globalStartTime = Math.min(...allTimes);

    curves.forEach(curve => {
        curve.forEach(point => {
            let delay = (point.time - globalStartTime) / 1000;
            synth.triggerAttackRelease(point.note, "8n", now + delay);           
        });
    });
}

// 🖌 Canvas Resizing Handler
function handleResize() {
    resizeCanvas(windowWidth * 0.9, windowHeight * 0.7);
    background(255);
    drawGuidelines();
}

// 🎶 Mouse Interaction for Drawing & Sound
function mousePressed() {
    if (!audioStarted) {
        Tone.start().then(() => {
            synth = new Tone.AMSynth().toDestination();
            audioStarted = true;
        }).catch(err => console.error("Audio start failed:", err));
    }

    if (recordingStartTime === null) recordingStartTime = millis();
    currentCurve = [];
}

function mouseDragged() {
    if (!audioStarted || useGestureMode) return;

    let note = getNoteFromPosition(mouseY);
    let time = millis() - recordingStartTime;
    if (currentCurve) currentCurve.push({ x: mouseX, y: mouseY, note, time });

    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    synth.triggerAttackRelease(note, "8n");
    particles.push(new Particle(mouseX, mouseY, speed, synth, note));
}

function mouseReleased() {
    if (currentCurve?.length) {
        curves.push([...currentCurve]); // Store both mouse & gesture curves???? Maybe not working as expected
        currentCurve = null;
    }
}


// 🎼 Play All Stored Curves
function playAllCurves() {
    if (!curves.length) return;

    let now = Tone.now();
    let globalStartTime = Math.min(...curves.flat().map(p => p.time));

    curves.forEach(curve => {
        curve.forEach(point => {
            let delay = (point.time - globalStartTime) / 1000;
            synth.triggerAttackRelease(point.note, "8n", now + delay);
            setTimeout(() => (point.isPlaying = true), delay * 1000);
            setTimeout(() => (point.isPlaying = false), (delay * 1000) + 200);
        });
    });
}



// 🖌 Helpers
function drawCurves() {
    stroke('rgba(36, 45, 112, 0.2)');
    strokeWeight(1);
    noFill();
    curves.forEach(curve => {
        beginShape();
        curve.forEach(point => vertex(point.x, point.y));
        endShape();
    });
}

function drawPlaybackPoints() {
    fill(255, 0, 0);
    noStroke();
    curves.forEach(curve => {
        curve.forEach(point => {
            if (point.isPlaying) ellipse(point.x, point.y, 8, 8);
        });
    });
}

function drawGuidelines() {
    if (!showGuidance) return;
    let spacing = height / notes.length;
    for (let i = 0; i < notes.length; i++) {
        let yStart = i * spacing;
        fill(i % 2 === 0 ? 'rgba(205, 233, 255, 0.08)' : 'rgba(0,0,0,0)');
        rect(0, yStart, width, spacing);
        fill(50);
        textSize(14);
        textAlign(LEFT, CENTER);
        text(noteLabels[i], 10, yStart + spacing / 2);
        stroke('rgba(176, 209, 250, 0.46)');
        line(0, yStart, width, yStart);
    }
}

// 🎼 Convert Y Position to Musical Note
function getNoteFromPosition(y) {
    if (!canvas) return "C4";
    let noteIndex = constrain(floor((height - constrain(y, 0, height)) / (height / notes.length)), 0, notes.length - 1);
    return notes[noteIndex];
}

// 🧹 Clear Canvas
function clearCanvas() {
    painting.clear();  // ✅ Also clear the gesture drawing layer
    particles = [];
    curves = [];
    currentCurve = null;
    recordingStartTime = null;
}


// 🎇 Particle System for Drawing Effect
class Particle {
    constructor(x, y, speed, instrument, pitch, col) {
        this.x = x;
        this.y = y;
        this.instrument = instrument;
        this.pitch = pitch;
        this.size = map(speed, 0, 20, 5, 30);
        this.color = color('rgba(145, 218, 252, 0.57)');
    }

    update() { this.size *= 0.98; }
    display() { noStroke(); fill(this.color); ellipse(this.x, this.y, this.size); }
}

class ScatterParticle {
    constructor(x, y, col) {
      this.pos = createVector(x, y);
      this.vel = p5.Vector.random2D().mult(random(1, 3));
      this.lifespan = 255;
      this.size = random(5, 15);
      this.color = col ? color(hue(col), saturation(col), brightness(col)) 
      : color(255, 100, 100);
    }
  
    update() {
      this.pos.add(this.vel);
      this.lifespan -= 4;
      this.size *= 0.97;
    }
  
    display() {
      noStroke();
      fill(this.color.levels[0], this.color.levels[1], 
        this.color.levels[2], this.lifespan);
      ellipse(this.pos.x, this.pos.y, this.size);
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  