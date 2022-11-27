jQuery(document).ready(function(){
    var savedx = null;
    var savedy = null;
    var count = 0;
    
     $("#special").click(function(e){ 


        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop; 

        
        
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
        count += 1;

        $('#status2').html(count); 
   }); 
})  
