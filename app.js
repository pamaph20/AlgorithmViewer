//Dijkstra algorithm is used to find the shortest distance between two nodes inside a valid weighted graph. Often used in Google Maps, Network Router etc.

//helper class for PriorityQueue
class Node {
    constructor(val, priority) {
      this.val = val;
      this.priority = priority;
    }
  }
  
  class PriorityQueue {
    constructor() {
      this.values = [];
    }
    enqueue(val, priority) {
      let newNode = new Node(val, priority);
      this.values.push(newNode);
      this.bubbleUp();
    }
    bubbleUp() {
      let idx = this.values.length - 1;
      const element = this.values[idx];
      while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        let parent = this.values[parentIdx];
        if (element.priority >= parent.priority) break;
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      }
    }
    dequeue() {
      const min = this.values[0];
      const end = this.values.pop();
      if (this.values.length > 0) {
        this.values[0] = end;
        this.sinkDown();
      }
      return min;
    }
    sinkDown() {
      let idx = 0;
      const length = this.values.length;
      const element = this.values[0];
      while (true) {
        let leftChildIdx = 2 * idx + 1;
        let rightChildIdx = 2 * idx + 2;
        let leftChild, rightChild;
        let swap = null;
  
        if (leftChildIdx < length) {
          leftChild = this.values[leftChildIdx];
          if (leftChild.priority < element.priority) {
            swap = leftChildIdx;
          }
        }
        if (rightChildIdx < length) {
          rightChild = this.values[rightChildIdx];
          if (
            (swap === null && rightChild.priority < element.priority) ||
            (swap !== null && rightChild.priority < leftChild.priority)
          ) {
            swap = rightChildIdx;
          }
        }
        if (swap === null) break;
        this.values[idx] = this.values[swap];
        this.values[swap] = element;
        idx = swap;
      }
    }
  }
  
  //Dijkstra's algorithm only works on a weighted graph.
  
  class WeightedGraph {
    constructor() {
      this.adjacencyList = {};
    }
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight });
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    Dijkstra(start, finish) {
      const nodes = new PriorityQueue();
      const distances = {};
      const previous = {};
      let path = []; //to return at end
      let smallest;
      //build up initial state
      for (let vertex in this.adjacencyList) {
        if (vertex === start) {
          distances[vertex] = 0;
          nodes.enqueue(vertex, 0);
        } else {
          distances[vertex] = Infinity;
          nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
      }
      // as long as there is something to visit
      while (nodes.values.length) {
        smallest = nodes.dequeue().val;
        if (smallest === finish) {
          //WE ARE DONE
          //BUILD UP PATH TO RETURN AT END
          while (previous[smallest]) {
            path.push(smallest);
            smallest = previous[smallest];
          }
          break;
        }
        if (smallest || distances[smallest] !== Infinity) {
          for (let neighbor in this.adjacencyList[smallest]) {
            //find neighboring node
            let nextNode = this.adjacencyList[smallest][neighbor];
            //calculate new distance to neighboring node
            let candidate = distances[smallest] + nextNode.weight;
            let nextNeighbor = nextNode.node;
            if (candidate < distances[nextNeighbor]) {
              //updating new smallest distance to neighbor
              distances[nextNeighbor] = candidate;
              //updating previous - How we got to neighbor
              previous[nextNeighbor] = smallest;
              //enqueue in priority queue with new priority
              nodes.enqueue(nextNeighbor, candidate);
            }
          }
        }
      }
      return (path.concat(smallest).reverse());
    }
  }
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
var g = new WeightedGraph();
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

function final(){
    console.log(g.Dijkstra('1','5'));

}

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
                let weight = prompt("Enter a weight");
                console.log(weight)
                edges.push({ from: selection, to: target, weight}); 
                g.addEdge(selection.id, target.id, weight);            
                
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
          id : nodes.length + 1,
          x: e.x,
          y: e.y,
          radius: 60,
          fillStyle: '#22cccc',
          strokeStyle: '#009999',
          selectedFill: '#88aaaa',
          selected: false
      };
      g.addVertex(node.id);
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