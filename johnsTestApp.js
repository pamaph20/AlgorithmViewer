//track mouse position on mousemove
var mousePosition;
//track state of mousedown and up
var isMouseDown;

//reference to the canvas element
var c = document.getElementById("myCanvas");
var ctx= c.getContext("2d");

//add listeners
document.addEventListener('mousemove', move, false);
document.addEventListener('mousedown', setDraggable, false);
document.addEventListener('mouseup', setDraggable, false);

//make some circles
var c1 = new Circle(50, 50, 50, "red", "black");
var c2 = new Circle(200, 50, 50, "green", "black");
var c3 = new Circle(350, 50, 50, "blue", "black");
//initialise our circles
var circles = [c1, c2, c3];

//main draw method
function draw() {
    //clear canvas
    ctx.clearRect(0, 0, c.width, c.height);
    drawCircles();
}

//draw circles
function drawCircles() {
    for (var i = circles.length - 1; i >= 0; i--) {
        circles[i].draw();
    }
}

//key track of circle focus and focused index
var focused = {
    key: 0,
    state: false
}

//circle Object
    function Circle(x, y, r, fill, stroke) {
        this.startingAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.x = x;
        this.y = y;
        this.r = r;

        this.fill = fill;
        this.stroke = stroke;

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, this.startingAngle, this.endAngle);
            ctx.fillStyle = this.fill;
            ctx.lineWidth = 3;
            ctx.fill();
            ctx.strokeStyle = this.stroke;
            ctx.stroke();
        }
    }

    function move(e) {
        if (!isMouseDown) {
            return;
        }
        getMousePosition(e);
        //if any circle is focused
        if (focused.state) {
            circles[focused.key].x = mousePosition.x;
            circles[focused.key].y = mousePosition.y;
            draw();
            return;
        }
        //no circle currently focused check if circle is hovered
        for (var i = 0; i < circles.length; i++) {
            if (intersects(circles[i])) {
                circles.move(i, 0);
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
    function intersects(circle) {
        // subtract the x, y coordinates from the mouse position to get coordinates 
        // for the hotspot location and check against the area of the radius
        var areaX = mousePosition.x - circle.x;
        var areaY = mousePosition.y - circle.y;
        //return true if x^2 + y^2 <= radius squared.
        return areaX * areaX + areaY * areaY <= circle.r * circle.r;
    }

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
};
draw();

