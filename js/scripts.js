const wrapper = document.getElementsByClassName("wrapper");
const buttonText = document.getElementsByClassName("footer_button");
const checkList = document.getElementsByClassName("checkList");
const checkText = document.getElementsByClassName("checkList_text");
const checkI = document.getElementsByClassName("checkList_element");
const checkII = document.getElementsByClassName("list_caller");
const paramCheck = document.getElementsByClassName("item_box");
const charCheck = document.getElementsByClassName("item_check");
const numMin = document.getElementsByClassName("number");
const numMax = document.getElementsByClassName("numberII");

var lengthArray;
const checkCase = document.getElementsByClassName("item_check");
var switchCase = 0;



const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SPECIAL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)


function arrayFromLowToHigh(low, high) {
    const array = [];
    for(let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}


window.onload = startFunc();


function changeButtonText(btnText) {
    console.log(buttonText[0].dataset.step)
    buttonText[0].innerHTML = btnText;
}


function startFunc() {
    // wrapper[0].style.backgroundImage = "url("+window.location.href+"/resources/background.gif)";
    changeButtonText("Start Generator");
    checkList[0].style.opacity = "0";
    for (let i = 0; i<checkII.length; i++) {
        checkII[i].style.display = "none";
        console.log(i);
    }
}
// buttonText[0].addEventListener("click", step(switchCase));
function buttonClick() {
    step(switchCase);
}
function randInt(min, max) {
    var length = Math.floor(Math.random()*(max-min+1)+min);
    var lengthT = typeof length;
    var minT = typeof min;
    console.log(`TypeOf:\n\tlength:\t${lengthT}\n\tMin:   \t${minT}`);
    if (typeof min === "string") {
        return parseInt(min) + length;
    } else {
        return min + length
    }
    
}
function lowToHigh (min, max) {
    const array = [];
    for (let i=min; i <= max; i++) {
        array.push(i)
    }
    return array
}
function step(situation) {
    // console.log("why");
    switch (situation) {
        case 0:
            
            checkList[0].style.opacity = "1";
            // checkList[0].style.width = "0%"
            checkList[0].style.animation = "initialStep 1000ms ease-out forwards";
            checkText[0].style.opacity = "1";
            checkText[0].innerHTML = "Please slect your password requirements";
            checkII[0].style.display = "flex";
            changeButtonText("Confirm Requirements");
            switchCase = 1;
        break;
        case 1:
            console.log(paramCheck[0].checked);
            if ((!paramCheck[0].checked) && (!paramCheck[1].checked)) {
                alert("You must chose one of the parameters");
                switchCase = 1;
            } else {
                if (paramCheck[0].checked) {
                    checkII[1].style.display = "flex";
                    // switchCase = 2;
                } else if (!paramCheck[0].checked) {
                    checkII[1].style.display = "none";
                    
                }
                if (paramCheck[1].checked) {
                    checkII[2].style.display = "flex";
                    // switchCase = 2;
                } else if (!paramCheck[1].checked) {
                    checkII[2].style.display = "none";
                }
                checkII[0].style.display = "none";
            }
            if ((paramCheck[0].checked) && (!paramCheck[1].checked)) {
                switchCase = 2;
            }
            if ((!paramCheck[0].checked) && (paramCheck[1].checked)) {
                switchCase = 3;
            }
            if ((paramCheck[0].checked) && (paramCheck[1].checked)) {
                switchCase = 4;
            }
        break;
        case 2:
            if ((numMin[0].value=="") || numMax[0].value=="") {
                alert("You must input both a min and max password length");
            } else {
                if (numMin[0].value < 8) {
                    numMin[0].value = 8;
                }
                if (numMax[0].value > 128) {
                    numMax[0].value = 128;
                }
                lengthArray = randInt(numMin[0].value, numMax[0].value);
                passGenLength(lengthArray);
            }
        break;
        case 3:
            lengthArray = 15;
            var checks = [charCheck[0].checked, charCheck[1].checked, charCheck[2].checked];
            // console.log(`charCheck:\n\t1:\t${charCheck[0].checked}`);
            // console.log(checks);
            if (checks[0] || checks[1] || checks[2]) {
                passGenChars(checks[0], checks[1], checks[2]);
            } else {
                alert("You must choose at least one type of charecter")
            }
        break;
        case 4:
            var checks = [charCheck[0].checked, charCheck[1].checked, charCheck[2].checked];
            console.log(`Values:\n\tMin:\t${numMin[0].value}\n\tMax:\t${numMax[0].value}\n\tLower:\t${checks[0]}\n\tUpper:\t${checks[1]}\n\tSpecial:\t${checks[2]}`)
            if (numMin[0].value=="" || numMax[0].value=="") {
                alert("You must input both a min and max password length");
            } else if (!checks[0] && !checks[1] && !checks[2]) {
                alert("You must choose at least one type of charecter")
            } else if (numMin[0].value=="" && numMax[0].value=="" && !checks[0] && !checks[1] && !checks[2]) {
                alert("You must input a min and max value, and at least one type of charecter");
            } else if ((numMin[0].value!="" && numMax[0].value!="") && (checks[0] || checks[1] || checks[2])) {
                if (numMin[0].value < 8) {
                    numMin[0].value = 8;
                }
                if (numMax[0].value > 128) {
                    numMax[0].value = 128;
                }
                lengthArray = randInt(numMin[0].value, numMax[0].value);
                passGenLengthChars(lengthArray, checks[0], checks[1], checks[2]);
            }
        break;
    }
    // console.log(switchCase);
}

function passGenLength(lengthReq) {
    let charCodes = LOWERCASE_CHAR_CODES;
    var passwordChars = [];
    for (let i=0; i<lengthReq; i++) {
        const charCode = charCodes[Math.floor(Math.random()*lengthReq)];
        passwordChars.push(String.fromCharCode(charCode));
    }
    const finalPass = passwordChars.join("");
    navigator.clipboard.writeText(finalPass);
    alert("Password copied to clipboard.")
}
function passGenChars(lower, upper, special) {
    var charCodes = [];
    var passwordChars = [];
    if (lower) {
        charCodes = charCodes.concat(LOWERCASE_CHAR_CODES)
    } if (upper) {
        charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
    } if (special) {
        charCodes = charCodes.concat(SPECIAL_CHAR_CODES)
    }
    console.log(charCodes);
    for (let i=0; i<lengthArray; i++) {
        var charCode = charCodes[Math.floor(Math.random()*lengthArray)];
        passwordChars.push(String.fromCharCode(charCode));
    }
    const finalPass = passwordChars.join("");
    navigator.clipboard.writeText(finalPass);
    alert("Password copied to clipboard.")
}
function passGenLengthChars(lengthReq, lower, upper, special) {
    var charCodes = [];
    var passwordChars = [];
    if (lower) {
        charCodes = charCodes.concat(LOWERCASE_CHAR_CODES)
        console.log(charCodes)
    } if (upper) {
        charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
        console.log(charCodes)
    } if (special) {
        charCodes = charCodes.concat(SPECIAL_CHAR_CODES)
        console.log(charCodes)
    }
    console.log(charCodes)
    for (let i=0; i<lengthReq; i++) {
        let randValue = randInt(0, charCodes.length);
        const charCode = charCodes[randValue];
        passwordChars.push(String.fromCharCode(charCode));
    }
    const finalPass = passwordChars.join("");
    navigator.clipboard.writeText(finalPass);
    alert("Password copied to clipboard.")
}