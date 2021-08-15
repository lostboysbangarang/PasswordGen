const wrapper=document.getElementsByClassName("wrapper");
const buttonText=document.getElementsByClassName("footer_button");
const checkList=document.getElementsByClassName("checkList");
const checkText=document.getElementsByClassName("checkList_text");
const checkI=document.getElementsByClassName("checkList_element");
const checkII=document.getElementsByClassName("list_caller");
const paramCheck=document.getElementsByClassName("item_box");
const numMin=document.getElementsByClassName("number");
const numMax=document.getElementsByClassName("numberII");

const lengthArray;
const checkCase=document.getElementsByClassName("item_check");
var switchCase=0;

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)


window.onload=startFunc();

function startFunc() {
    // wrapper[0].style.backgroundImage="url("+window.location.href+"/resources/background.gif)";
    // console.log("\nWhy\n")
    buttonText[0].innerHTML=buttonText[0].dataset.step;
    checkList[0].style.opacity="0";
    for (let i=0; i<checkII.length; i++) {
        checkII[i].style.display="none";
        console.log(i);
    }
}
// buttonText[0].addEventListener("click", step(switchCase));
function buttonClick() {
    step(switchCase);
}
function randInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
function lowToHigh (min, max) {
    const array=[];
    for (let i=min; i <= max; i++) {
        array.push(i)
    }
    return array
}
function step(situation) {
    // console.log("why");
    switch (situation) {
        case 0:
            
            checkList[0].style.opacity="1";
            // checkList[0].style.width="0%"
            checkList[0].style.animation="initialStep 1000ms ease-out forwards";
            checkText[0].style.opacity="1";
            checkText[0].innerHTML="Please slect your password requirements";
            checkII[0].style.display="flex";
            switchCase=1;
        break;
        case 1:
            console.log(paramCheck[0].checked);
            if ((!paramCheck[0].checked) && (!paramCheck[1].checked)) {
                alert("You must chose one of the parameters");
                switchCase=1;
            } else {
                if (paramCheck[0].checked) {
                    checkII[1].style.display="flex";
                    // switchCase=2;
                } else if (!paramCheck[0].checked) {
                    checkII[1].style.display="none";
                    
                }
                if (paramCheck[1].checked) {
                    checkII[2].style.display="flex";
                    // switchCase=2;
                } else if (!paramCheck[1].checked) {
                    checkII[2].style.display="none";
                }
                checkII[0].style.display="none";
            }
            if ((paramCheck[0].checked) && (!paramCheck[1].checked)) {
                switchCase=2;
            }
            if ((!paramCheck[0].checked) && (paramCheck[1].checked)) {
                switchCase=3;
            }
            if ((paramCheck[0].checked) && (paramCheck[1].checked)) {
                switchCase=4;
            }
        break;
        case 2:
            if ((numMin[0].value=="") || numMax[0].value=="") {
                alert("must imput both a min and max password length");
            } else {
                if (numMin[0].value < 8) {
                    numMin[0].value=8;
                }
                if (numMax[0].value > 128) {
                    numMax[0].value=128;
                }
                lengthArray=randInt(numMin[0].value, numMax[0].value);
                console.log(lengthArray)
            }
            
        break;
    }
    // console.log(switchCase);
}