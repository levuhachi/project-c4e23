let optionNum = 1;
const colorPicker = ['aqua', 'yellow', 'blue', 'green', 'pink'];

$("#btn_add").on("click", () => {
    optionNum++;
    if (optionNum <= 5) {
        let input_option = `<input style="background-color: ${colorPicker[optionNum-1]}" type="text" placeholder="Add an option" name = "option${optionNum}"> <br>`;
        $('#options').append(input_option);
        addSegments(colorPicker[optionNum-1]);
    } else {

    }
});


let theWheel = new Winwheel({
    'canvasId'    : 'canvas',
    'numSegments' : 1,
    'lineWidth'   : 3,
    'segments': [
        {'fillStyle' : 'aqua', 'text' : ''}    
    ],
    'animation': {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8
    },
    'callbackAfter' : 'drawTriangle()'
});


const changeColors = () => {
    let temp = theWheel.segments[4].fillStyle;
    theWheel.segments[4].fillStyle = theWheel.segments[3].fillStyle;
    theWheel.segments[3].fillStyle = theWheel.segments[2].fillStyle;
    theWheel.segments[2].fillStyle = theWheel.segments[1].fillStyle;
    theWheel.segments[1].fillStyle = temp;
    theWheel.draw();
}


const addSegments = (color) => {
    theWheel.addSegment ({
        'text': '',
        'fillStyle': color
    });
    theWheel.draw();
};


function drawTriangle()
    {
        // Get the canvas context the wheel uses.
        var ctx = theWheel.ctx;
 
        ctx.strokeStyle = 'navy';     // Set line colour.
        ctx.fillStyle   = 'aqua';     // Set fill colour.
        ctx.lineWidth   = 2;
        ctx.beginPath();              // Begin path.
        ctx.moveTo(170, 5);           // Move to initial position.
        ctx.lineTo(230, 5);           // Draw lines to make the shape.
        ctx.lineTo(200, 40);
        ctx.lineTo(171, 5);
        ctx.stroke();                 // Complete the path by stroking (draw lines).
        ctx.fill();                   // Then fill.
    }

$('#btn_spin').on('click', () => {
    changeColors();
    theWheel.startAnimation();
});