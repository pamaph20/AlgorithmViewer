function node(x, y, number){
    this.x = x;
    this.y = y;
    this.number = number;
    const edges = new Map();
    this.edges = edges;
    
}

const nodeDict = new Map();
var count = 0;

var c = document.getElementById("myCanvas");
var ctx= c.getContext("2d");

//add listeners
document.addEventListener('mousemove', move, false);
document.addEventListener('mousedown', setDraggable, false);
document.addEventListener('mouseup', setDraggable, false);


//key track of circle focus and focused index
var focused = {
    key: 0,
    state: false
}


function move(e) {
    if (!isMouseDown) {
        return;
    }
    getMousePosition(e);
    //if any circle is focused
    if (focused.state) {
        [focused.key].x = mousePosition.x;
        nodeDict[focused.key].y = mousePosition.y;
        draw();
        return;
    }
    //no circle currently focused check if circle is hovered
    for (var i = 0; i < circles.length; i++) {
        if (intersects(nodeDict[i])) {
            nodeDict.move(i, 0);
            focused.state = true;
            break;
        }
    }
    draw();
}

//set mousedown state
function setDraggable(e) {
    var t = e.type;
    if (t === "mousedown") {
        isMouseDown = true;
    } else if (t === "mouseup") {
        isMouseDown = false;
        releaseFocus();
    }
}

function releaseFocus() {
    focused.state = false;
}


function getMousePosition(e) {
    var rect = c.getBoundingClientRect();
    mousePosition = {
        x: Math.round(e.x - rect.left),
        y: Math.round(e.y - rect.top)
    }
}

//detects whether the mouse cursor is between x and y relative to the radius specified
function intersects(node) {
    // subtract the x, y coordinates from the mouse position to get coordinates 
    // for the hotspot location and check against the area of the radius
    var areaX = mousePosition.x - node.x;
    var areaY = mousePosition.y - node.y;
    //return true if x^2 + y^2 <= radius squared.
    return areaX * areaX + areaY * areaY <= 10 * 10;
}



jQuery(document).ready(function(){
     $("#special").click(function(e){ 
        

        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;


        

        count += 1;
        const newNode = new node(x, y, count);
        nodeDict.set(count, newNode);
          
        var ctx= this.getContext("2d"); 
        ctx.beginPath();
        ctx.arc(x, y, 10,0, 2*Math.PI);
        ctx.fill();

        $('#status2').html(count);
   }); 
})  

function showNodeDict(){
    let text = "";
    nodeDict.forEach (function(value, key) {
        text += key + ' = ' + value + ', ';
        }) 
    document.getElementById("demp").innerHTML = text;
    }

function newEdge(node1, node2, weight){  
    node1.edges.set(node2.number, weight);
    node2.edges.set(node1.number, weight);
    drawEdge(node1, node2);         
}       
           
function makeCompleteGraph(){
    for(const i of nodeDict.keys()){
        for (const j of nodeDict.keys()){
            newEdge(nodeDict.get(i), nodeDict.get(j), 5);
        }
    }
    document.getElementById("complete").innerHTML = 'worked';
    }


function drawEdge(node1, node2){
    var c = document.getElementById("special");
    var ctx= c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.stroke();
}

function select_Nodes(){
    /*
    Select two nodes to be ran with the drawEdge Function
    */
}

function dragNode(){
    /*
    Select a pre-existing node and drag it around the canvas
    */
}

function deleteNode(){
    /*
    Select a pre-existing node and delete it from the canvas
    */
}

function clearCanvas(){
    nodeDict.clear();
    count = 0;
    $('#status2').html(count);
    var c = document.getElementById("special");
    var ctx= c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height)
}

