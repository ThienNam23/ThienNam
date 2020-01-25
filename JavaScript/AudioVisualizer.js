var audio, canvas, context, audioctx, analyser, freqArr, barHeight, source;
var WIDTH = 512,
    HEIGHT = 300,
    INTERVAL = 64, //256;
    SAMPLES = 2048; //4096;//1024;//512;//2048; //this is the main thing to change right now


//plays the user's uploaded audio file when it is uploaded
audioFile.onchange = function(){ 
    //audio = document.getElementById("audio");
    var reader = new FileReader(); 
    reader.onload = function(e){
        audio.src = this.result;
        audio.controls = true;
        audio.play();
    };
    reader.readAsDataURL(this.files[0]);
    window.requestAnimationFrame(draw);
    // Notify that song is playing
    let b = document.getElementById("msg1");
    b.style.display = "inline";
    b = document.getElementById("msg2");
    b.style.display = "none";
    // clear cache
    document.getElementById("musicSelect").selectedIndex = 0;
};

function initialize(){
    // drawing the canvas
    canvas = document.getElementById("cnv1");
    context = canvas.getContext("2d");

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
        case 1: audio.src = "https://thiennam23.github.io/ThienNam/Audio/Kirara%20Magic%20%26%20Yirokos%20-%20Chrono%20%5BDiversity%20Release%5D.mp3"; break;
        case 2: audio.src = "https://thiennam23.github.io/ThienNam/Audio/Panda%20Eyes%20-%20Euphoria%20%5BDiversity%20Release%5D.mp3"; break;
        case 3: audio.src = "https://thiennam23.github.io/ThienNam/Audio/Sansa%20Lala%20-%20Kayaz.mp3"; break;
        case 4: audio.src = "https://thiennam23.github.io/ThienNam/Audio/Feint%20-%20Vagrant%20(ft.%20Veela)%20%5BDiversity%20Release%5D.mp3"; break;
        case 5: audio.src = "https://thiennam23.github.io/ThienNam/Audio/PIKASONIC%20-%20Lost.mp3"; break;
        case 6: audio.src = "https://thiennam23.github.io/ThienNam/Audio/Feint%20-%20Words%20(ft.%20Laura%20Brehm)%20%5BDiversity%20Release%5D.mp3"; break;
        default: {};
    }
    // Notify that song is playing
    let b = document.getElementById("msg2");
    b.style.display = "inline";
    b = document.getElementById("msg1");
    b.style.display = "none";
    // clear cache
    document.getElementById("audioFile").value = "";
};

function draw(){
    if(!audio.paused){
        let r = 0, g = 0, b = 255, x = 0;
        context.clearRect(0,0,WIDTH, HEIGHT);
        analyser.getByteFrequencyData(freqArr);
        for(var i = 0; i < INTERVAL - 1; i++){
            
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
