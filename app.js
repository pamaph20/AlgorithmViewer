function node(x, y, number){
    this.x = x;
    this.y = y;
    this.number = number;
    const edges = new Map();
}

/* May be Useless
 edge(node1, node2, weight){
    this.node1 = node1;
    this.node2 = node2;
    this.weight = weight;
}
*/


const nodeDict = new Map();


jQuery(document).ready(function(){
    var savedx = null;
    var savedy = null;
    var count = 0;
    
    
     $("#special").click(function(e){ 
        count += 1;

        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        
       
        
        const newNode = new node(x, y, count);
        

        nodeDict.set(count, newNode);
        
        
        /* var c=document.getElementById("special"); */
        var ctx= this.getContext("2d"); /*c.getContext("2d");*/

        ctx.beginPath();
        ctx.arc(x, y, 10,0, 2*Math.PI);
        ctx.fill();
        if(savedx != null){
            ctx.moveTo(x, y);
            ctx.lineTo(savedx, savedy);
        }           
        ctx.stroke();

        savedx = x;
        savedy = y;
        

        $('#status2').html(count);
        $('nodedict').html(Nodedict.values());

    

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
    
    /*node1.edges.set(node2.number, weight);
    node2.edges.set(node1.number, weight);*/

    $('#special').drawEdge()
            
}       
           
        
    



function makeCompleteGraph(){
    for(const x of fruits.keys()){
        for (const y of fruits.keys()){
            newEdge(x, y, 5);
        }
    }

    document.getElementById("complete").innerHTML = 'worked';
    }


function drawEdge(){
    var ctx= this.getContext("2d");
    ctx.beginPath();
    ctx.arc(400, 400, 10,0, 2*Math.PI);
    ctx.fill();
    
    
    /*ctx.moveTo(0,0);
    ctx.lineTo(400, 400);*/
    
    ctx.stroke();
}

/*function test()
var $myCanvas = $('#special');

// rectangle shape 
$myCanvas.drawRect({
  fillStyle: 'steelblue',
  strokeStyle: 'blue',
  strokeWidth: 4,
  x: 190,
  y: 50,
  fromCenter: false,
  width: 200,
  height: 100
});*/