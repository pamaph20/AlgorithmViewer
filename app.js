const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

var nodes = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onresize = resize;
resize();



function drawNode(node) {
  context.beginPath();
  context.fillStyle = node.fillStyle;
  context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
  context.strokeStyle = node.strokeStyle;
  context.stroke();
  context.fill();
}


function click(e) {
  let node = {
      x: e.x,
      y: e.y,
      radius: 10,
      fillStyle: '#22cccc',
      strokeStyle: '#009999'
  };
  nodes.push(node);
  drawNode(node);
}

var selection = undefined;

function within(x, y) {
    return nodes.find(n => {
        return x > (n.x - n.radius) && 
            y > (n.y - n.radius) &&
            x < (n.x + n.radius) &&
            y < (n.y + n.radius);
    });
}

function down(e) {
  let target = within(e.x, e.y);
  if (selection && selection.selected) {
      selection.selected = false;
  }
  if (target) {
      if (selection && selection !== target) {
          edges.push({ from: selection, to: target });
      }
      selection = target;
      selection.selected = true;
      draw();
  }
}


window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;

function draw() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      context.beginPath();
      context.fillStyle = node.fillStyle;
      context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
      context.strokeStyle = node.strokeStyle;
      context.fill();
      context.stroke();
  }
}

/** remove the onclick code and update move and up code */
function move(e) {
  if (selection && e.buttons) {
      selection.x = e.x;
      selection.y = e.y;
      draw();
  }
}

function up(e) {
  if (!selection) {
      let node = {
          x: e.x,
          y: e.y,
          radius: 10,
          fillStyle: '#22cccc',
          strokeStyle: '#009999',
          selectedFill: '#88aaaa',
          selected: false
      };
      nodes.push(node);
      draw();
  }
  if (selection && !selection.selected) {
      selection = undefined;
  }
  draw();
}


var edges = [];

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < edges.length; i++) {
        let fromNode = edges[i].from;
        let toNode = edges[i].to;
        context.beginPath();
        context.strokeStyle = fromNode.strokeStyle;
        context.moveTo(fromNode.x, fromNode.y);
        context.lineTo(toNode.x, toNode.y);
        context.stroke();
    }

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        context.beginPath();
        context.fillStyle = node.selected ? node.selectedFill : node.fillStyle;
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
        context.strokeStyle = node.strokeStyle;
        context.fill();
        context.stroke();
    }
}