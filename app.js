const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
var dict = {}
var nodes = [];
var edges = [];
var selection = undefined;
window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;
function resize() {
    canvas.width = 1500;
    canvas.height = 700;
}
window.onresize = resize;
resize();



function within(x, y) {
    return nodes.find(n => {
        return x > (n.x - n.radius) && 
            y > (n.y - n.radius) &&
            x < (n.x + n.radius) &&
            y < (n.y + n.radius);
    });
}

function down(e) {
    /*
    find the node target, 
    if there is a selection clear the selected state, 
    then assign the selection to the target and set its selected state and draw
    mousedown when the selection changes to a new node and 
    we have something already selected we can create an edge
    */
  let target = within(e.x , e.y );
  if (selection && selection.selected) {
      selection.selected = false;
  }
  if (target) {
      if (selection && selection !== target) {
            if(!edgesExists(JSON.stringify(selection), JSON.stringify(target))){
                edges.push({ from: selection, to: target });
            }   
      }
      selection = target;
      selection.selected = true;
      draw();
  }
}


function edgesExists(S,T){ //S and T are just two variables for two different nodes
    for(let i = 0; i < edges.length; i++){
        sPrime = JSON.stringify(edges[i].from);
        tPrime = JSON.stringify(edges[i].to);
        if((S == sPrime && T == tPrime) || (T == sPrime && S == tPrime)){
            return true; // edge already exists
        }
    }
    return false;
}

//Draw the nodes, the clear rect is so it doesnt repeat drawing the nodes on a moues click 


function move(e) {
/*
if there is a selection and the mouse is currently down 
➡️ update selection x and y
*/
  if (selection && e.buttons) {
      selection.x = e.x;
      selection.y = e.y;
      draw();
  }
}

function up(e) {
    /*
    if there is no selection then create a new node and draw, 
    otherwise if the current selection is not selected (because of mouse down) 
    then clear the selection and draw after
    */
  if (!selection) {
      let node = {
          x: e.x  * (canvas.width / canvas.clientWidth),
          y: e.y * (canvas.height / canvas.clientHeight),
          radius: 10,
          fillStyle: '#22cccc',
          strokeStyle: '#009999',
          selectedFill: '#88aaaa',
          selected: false
      };
      dict[node] = 
      nodes.push(node);
      draw();
  }
  if (selection && !selection.selected) {
      selection = undefined;
  }
  draw();
}

function deleteNodes(e){

}

function draw() {
    console.log(nodes);
    console.log(edges);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < edges.length; i++) {
        //connecting existing nodes
        let fromNode = edges[i].from;
        let toNode = edges[i].to;
        context.beginPath();
        context.strokeStyle = fromNode.strokeStyle;
        context.moveTo(fromNode.x, fromNode.y);
        context.lineTo(toNode.x, toNode.y);
        context.stroke();
    }

    for (let i = 0; i < nodes.length; i++) {
        //drawing nodes
        let node = nodes[i];
        context.beginPath();
        context.fillStyle = node.selected ? node.selectedFill : node.fillStyle;
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
        context.strokeStyle = node.strokeStyle;
        context.fill();
        context.stroke();
    }
}