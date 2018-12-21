let optionNum = 1;
// let colorPicker = ['green', 'yellow', 'red', 'blue', 'pink', 'aqua', 'brown', 'orange'];
let colorPicker = ['#EB6E80','#008F95','#E24E42','#49274A','#F19F4D']
let colorPicked = [];
const getRandomColor = () => {
    return colorPicker[Math.floor(Math.random() * colorPicker.length)];
  }
let firstColor = getRandomColor();
colorPicked.push(firstColor);
console.log(colorPicked);
$('#option1').css('background-color', firstColor);
  $("#btn_add").on("click", () => {
    if (theWheel.numSegments === 5) {
        alert('Limit 5 Options');   
    } else {
        optionNum++;
        let newColor = getRandomColor();
        if (!colorPicked.includes(newColor) && !colorPickedQuest.includes(newColor)) {
            $('#options').append(`<input class="questions" id="option${optionNum}" style="background-color: ${newColor}" type="text" placeholder="Add an option" name = "option${optionNum}">`);
            addSegments(newColor);
            colorPicked.push(newColor);
            console.log("PUSH" + colorPicked);
        } else {
            optionNum--;
            $('#btn_add').click();
            // console.log("ahihi");
                    
        }
    }
});


let theWheel = new Winwheel({
    'numSegments' : 1,
    'lineWidth'   : 2,
    'segments': [
        {'fillStyle' : `${firstColor}`, 'text' : ''}
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

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16)
    return `rgb(${r}, ${g}, ${b})`
}

// alert( hexToRgb("#0033ff").g ); // "51";

function alertPrize(){
    let winningSegment = theWheel.getIndicatedSegment();
    let colorSegment = hexToRgb(winningSegment.fillStyle);
    let optionLength = $('#options')[0].children.length;
    let textWon = '';
    for (let index = 1; index <= optionLength; index++) {
        let colorOption = $(`#option${index}`)[0].style.backgroundColor;
        if (colorOption === colorSegment) {
            textWon = $(`#option${index}`)[0].value;
            break;
        }
        //  $(`#option${index}`)
    }
    $('#myModal').modal('toggle');
    $("#winner").text("You have won " + textWon + "!");
}

var wheelSpinning = false;

function startSpin(){
    if(wheelSpinning == false){
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


