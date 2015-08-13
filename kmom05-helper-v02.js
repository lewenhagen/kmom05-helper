javascript:(function(){
Kmom05 = {};
Kmom05.keydown = function(k) {
    var oEvent = document.createEvent('KeyboardEvent');

    Object.defineProperty(oEvent, 'keyCode', {
        get : function() {
            return this.keyCodeVal;
        }
    });
    Object.defineProperty(oEvent, 'which', {
        get : function() {
            return this.keyCodeVal;
        }
    });
    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
    };
    oEvent.keyCodeVal = k;
    if (oEvent.keyCode !== k) {
        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    };
    document.dispatchEvent(oEvent);
};
var arr = [
    {"todo": "Toggle Circle", "key": 69, "letter": "E"},
    {"todo": "Toggle Circle back", "key": 69, "letter": "E"},
    {"todo": "Increase size", "key": 81, "letter": "Q"},
    {"todo": "Decrease size", "key": 87, "letter": "W"},
    {"todo": "Toggle color", "key": 82, "letter": "R"},
    {"todo": "Increased Z-index", "key": 84, "letter": "T"}
];
function setOk (c, info) {
    console.log('%c Letter: ' + c + ', ' + info + ' OK!', 'background: #00ff00; color: #000');
};

function setFail (c, info) {
    console.log('%c Letter: ' + c + ', ' + info + ' FAIL!', 'background: #ff0000; color: #000');
};

function getAllSelectedAndReturnOne() {
    var selAll = document.getElementsByClassName("selected");
    var one = "";
    for (var j = 0; j < selAll.length; j++) {
        one = selAll[j];
    }
    return one;
};

function getAllSelected () {
    var selAll = document.getElementsByClassName("selected");
    var ret = [];
    for (var j = 0; j < selAll.length; j++) {
        ret[j] = selAll[j];
    }
    return ret;
};

function getStyle(el,styleProp)
{
    if (el.currentStyle)
        return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle(el,null)[styleProp];
};

var i = 0, interval = 500, round = 1;

function testE (el) {
    if (round === 1) {
        if (el.classList.contains("circle")) {
            setOk("E", "circle");
            round++;
        } else {
            setFail("E", "circle");
        }
    } else if (round === 2) {
        if (!el.classList.contains("circle")) {
            setOk("E", "back to normal");
        } else {
            setFail("E", "back to normal");
        }
    }

};

function testQ (el) {
    var holderBefore, holderAfter;
    holderBefore = parseInt(el.offsetHeight);
    Kmom05.keydown(81);
    holderAfter = parseInt(getAllSelectedAndReturnOne().offsetHeight);

    if (holderAfter > holderBefore) {
        setOk("Q", "Increased size");
    } else {
        setFail("Q", "Increased size");
    }
};

function testZ (el) {
    var holderBefore, holderAfter;
    holderBefore = parseInt(el.offsetHeight);
    Kmom05.keydown(87);
    holderAfter = parseInt(getAllSelectedAndReturnOne().offsetHeight);

    if (holderAfter < holderBefore) {
        setOk("Z", "Decreased size");
    } else {
        setFail("Z", "Decreased size");
    }
};

function testR (el) {
    var startColor = getStyle(el, "backgroundColor");
    for (var j = 0; j < 3; j++) {
        Kmom05.keydown(82);
        var temp = getAllSelectedAndReturnOne();
        if (getStyle(temp, "backgroundColor") != startColor) {
            setOk("R", "Toggle color");
        } else {
            setFail("R", "Toggle color");
        }
    }
};

function testT (el) {
    Kmom05.keydown(84);
    Kmom05.keydown(84);
    var temp = getAllSelected();
    if (getStyle(temp[temp.length-1], "zIndex") > getStyle(temp[1], "zIndex")) {
        setOk("T", "Increased Z-index");
    } else {
        setFail("T", "Increased Z-index");
    }
};

var timer = window.setInterval(function(){
    if(i < arr.length){

        if (arr[i].letter === "E") {
            Kmom05.keydown(arr[i].key);
            var element = getAllSelectedAndReturnOne();
            testE(element);
        } else if (arr[i].letter === "Q") {
            Kmom05.keydown(arr[i].key);
            var element = getAllSelectedAndReturnOne();
            testQ(element);
        } else if (arr[i].letter === "W") {
            Kmom05.keydown(arr[i].key);
            var element = getAllSelectedAndReturnOne();
            testZ(element);
        } else if (arr[i].letter === "R") {
            var element = getAllSelectedAndReturnOne();
            testR(element);
        } else if (arr[i].letter === "T") {
            var element = getAllSelectedAndReturnOne();
            testT(element);
        }
        i++;
    } else {
        console.log("DONE!");
        window.clearInterval(timer);
    }
}, interval);
})();

/*

console.log('%c Testing: ' + arr[i].todo + ", key:" + arr[i].key + ", letter: " + arr[i].letter, 'background: #222; color: #bada55');
if (arr[i].info != null) {
    console.log('%c Look for: ' + arr[i].info, 'background: #ffa500; color: #000');
}


hex:
red = ff0000
green = 00ff00
orange = ffa500

case 69:
    toggleCircle();
case 81:
    increaseSize();
case 87:
    decreaseSize();
case 82:
    toggleColor();
case 84:
    createRandom();
case 65:
    increaseZindex();
case 83:
    decreaseZindex();
case 89:
    deleteSelected();
case 37:
    move("left");
case 38:
    move("up");
case 39:
    move("right");
case 40:
    move("down");
case 85:
    unselect();
case 73:
    selectAll();
case 80:
    createNewRandom();
case 68:
    speedChange();
case 32:
    spinThisShit();
*/
