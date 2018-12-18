let optionNum = 1;
let colorPicker = ['green', 'yellow', 'red', 'blue', 'pink', 'aqua', 'brown', 'orange'];
let colorPicked = [];
const getRandomColor = () => {
    return colorPicker[Math.floor(Math.random() * colorPicker.length)];
  }
let firstColor = getRandomColor();
colorPicked.push(firstColor);
$('#option1').css('background-color', firstColor);
  $("#btn_add").on("click", () => {
    if (theWheel.numSegments === 5) {
        alert('limit 5 option');   
    } else {
        optionNum++;
        let newColor = getRandomColor();
        if (!colorPicked.includes(newColor) && !colorPickedQuest.includes(newColor)) {
            $('#options').append(`<input id="option${optionNum}" style="background-color: ${newColor}" type="text" placeholder="Add an option" name = "option${optionNum}"> <br>`);
            addSegments(newColor);
            colorPicked.push(newColor);
        } else {
            $('#btn_add').click();
            // console.log("ahihi");
                    
        }
    }
});


let theWheel = new Winwheel({
    'numSegments' : 1,
    'lineWidth'   : 2,
    'segments': [
        {'fillStyle' : `${firstColor}`, 'text' : 'option 1'}
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


