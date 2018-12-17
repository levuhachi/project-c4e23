let optionNum = 1;
const colorPicker = ['aqua', 'yellow', 'blue', 'green', 'pink'];

$("#btn_add").on("click", () => {
    optionNum++;
    textOption = 'option ' + optionNum;
    if (optionNum <= 5) {
        let input_option = `<input style="background-color: ${colorPicker[optionNum-1]}" type="text" placeholder="Add an option" name = "option${optionNum}"> <br>`;
        $('#options').append(input_option);
        addSegments(colorPicker[optionNum-1], textOption);
    } else {
        alert('limit 5 option');
    }
});


let theWheel = new Winwheel({
    'numSegments' : 1,
    'lineWidth'   : 2,
    'segments': [
        {'fillStyle' : 'aqua', 'text' : 'option 1'}
    ],
    'animation': {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8,
        'callbackFinished' : 'alertPrize()',
    },
});

const addSegments = (color, text) => {
    theWheel.addSegment ({
        'text': text,
        'fillStyle': color
    });
    theWheel.draw();
};

function alertPrize(){
    var winningSegment = theWheel.getIndicatedSegment();
    $('#myModal').modal('toggle');
    $("#winner").text("You have won " + winningSegment.text + "!");
}

var wheelSpinning = false;

function startSpin(){
    if(wheelSpinning == false){
        document.getElementById('spin_button').src = "../static/images/spin_off.png";
        theWheel.startAnimation();
        wheelSpinning = true;
    }
}

function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.
    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
    document.getElementById('spin_button').src = "../static/images/spin_on.png";
}


