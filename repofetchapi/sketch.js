let canvas;
let datAPI="";
let arAPI=[];
function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    background(0, 50);
    newCursor();
}

function mouseClicked(){
    arAPI=[];
    //Put here your fetch functions
    //fetch("https://dog.ceo/api/breeds/image/random").then(response=> response.json()).then(data=> {perro=data console.log(perro)})
    getData("https://dog.ceo/api/breeds/image/random")
    getData("https://datausa.io/api/data?drilldowns=Nation&measures=Population")  
    getData("https://api.coindesk.com/v1/bpi/currentprice.json")  
    getData("https://randomuser.me/api/")
    getData("https://catfact.ninja/fact")
    
    console.log(arAPI)
    setTimeout(() => {
        showany();
    }, 400);
}
async function getData(URL){
    const response= await fetch(URL);
    const data = await response.json();
    if (data.data) {
        datAPI=data.data[0].Nation;  
        arAPI.push(datAPI);
    } else if(data.results) {
        datAPI=data.results[0].name.first;  
        arAPI.push(datAPI);
    } else if(data.disclaimer) {
        datAPI=data.bpi.EUR.symbol;  
        arAPI.push(datAPI);
    } else if (data.fact) {
        datAPI=data.fact;  
        arAPI.push(datAPI);
    } else if (data.message) {
        datAPI=data.message;  
        arAPI.push(datAPI);
    }
}


function showany(){
    let x = Math.floor(Math.random()*5);
    let aprint = arAPI[x];
    let h2 = document.createElement("h2")

    h2.innerHTML="Información seleccionada al azar de alguna de las 5 API: " + aprint ;
    document.body.appendChild(h2);
        
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}