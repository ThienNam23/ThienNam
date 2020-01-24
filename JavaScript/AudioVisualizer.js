var audio, canvas, context, audioctx, analyser, freqArr, barHeight, source;
var WIDTH = 1024,
    HEIGHT = 400,
    INTERVAL = 128, //256;
    SAMPLES = 2048; //4096;//1024;//512;//2048; //this is the main thing to change right now


//plays the user's uploaded audio file when it is uploaded
audioFile.onchange = function(){ 
    //audio = document.getElementById("audio");
    var reader = new FileReader();
    reader.onload = function(e){
        audio.src = this.result;
        audio.controls = true;
        audio.crossOrigin = "anonymous";
        audio.play();
    }
    reader.readAsDataURL(this.files[0]);
    window.requestAnimationFrame(draw);
    let b = document.getElementById("msg1");
    b.style.display = "inline";
    b = document.getElementById("msg2");
    b.style.display = "none";
};

function initialize(){
    // drawing the canvas
    canvas = document.getElementById("cnv1");
    context = canvas.getContext("2d");
    canvas.style.marginLeft = (window.innerWidth - canvas.innerWidth)/2 + "px";

    // getting audio file
    audio = document.getElementById("audio");
    audio.volume = .5;

    //setting up audio analyzer to get frequency info
    audioctx = new AudioContext(); 
    analyser = audioctx.createAnalyser();
    analyser.fftSize = SAMPLES;
    source = audioctx.createMediaElementSource(audio);    
    source.connect(analyser);
    source.connect(audioctx.destination);

    // getting array of frequency index
    freqArr = new Uint8Array(analyser.frequencyBinCount);

    // setting up bar's height
    barHeight = HEIGHT;

    // requesting window animation
    window.requestAnimationFrame(draw);
};

function changeMusic(){
    let musicSelected = document.getElementById("musicSelect");
    switch (musicSelected.selectedIndex){
        case 1: audio.src = "../Audio/Kirara Magic & Yirokos - Chrono [Diversity Release].mp3"; break;
        case 2: audio.src = "../Audio/Panda Eyes - Euphoria [Diversity Release].mp3"; break;
        case 3: audio.src = "../Audio/Sansa Lala - Kayaz.mp3"; break;
        case 4: audio.src = "../Audio/Feint - Vagrant (ft. Veela) [Diversity Release].mp3"; break;
        case 5: audio.src = "../Audio/PIKASONIC - Lost.mp3"; break;
        case 6: audio.src = "../Audio/Feint - Words (ft. Laura Brehm) [Diversity Release].mp3"; break;
        default: {};
    }
    let b = document.getElementById("msg2");
    b.style.display = "inline";
    b = document.getElementById("msg1");
    b.style.display = "none";
};

function draw(){
    if(!audio.paused){
        let r = 0, g = 0, b = 255, x = 0;
        context.clearRect(0,0,WIDTH, HEIGHT);
        analyser.getByteFrequencyData(freqArr);
        for (let i = 0; i < 32; i++){
            context.fillRect(i, HEIGHT, (WIDTH/INTERVAL) - 1 , 1);
            x = x + (WIDTH/INTERVAL);
        }
        for(var i = 0; i < INTERVAL/2 - 1; i++){
            
            var i = i;
            barHeight = freqArr[i*2] + freqArr[i*2 + 1] - 254;
            if(barHeight <= 1){
                barHeight = 2;
            }
            
            // color spectrum index
            if (r == 0) g += 16;
            if (r == 255) g -= 16;
            if (g > 255) g = 255;
            if (g < 0) g = 0;

            if (g == 255) b -= 16;
            if(g == 0) b += 16;
            if (b > 255) b = 255;
            if (b < 0) b = 0;

            if (b == 0) r += 16;
            if (b == 255) r -= 16;
            if (r > 255) r = 255;
            if (r < 0) r = 0;

            // setting up color for bar
            context.fillStyle = "rgb(" + r + "," + g + "," + b + ")"; 
            
            // drawing a bar's element
            context.fillRect(x, HEIGHT - barHeight, (WIDTH/INTERVAL) - 1 , barHeight);
            x = x + (WIDTH/INTERVAL);
        }
    }
    window.requestAnimationFrame(draw);
};
