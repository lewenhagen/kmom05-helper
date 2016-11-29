javascript:(function(){
var i = 0, interval = 500, round = 1, corr = 0, faults = 0;
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
    {"todo": "New copy and increased Z-index", "key": 84, "letter": "T"},
    {"todo": "Decreased Z-index", "key": 65, "letter": "A"},
    {"todo": "Increased Z-index", "key": 83, "letter": "S"},
    {"todo": "Delete selected", "key": 89, "letter": "Y"},
    {"todo": "Select all", "key": 73, "letter": "i"},
    {"todo": "Move left", "key": 37, "letter": "left"},
    {"todo": "Move up", "key": 38, "letter": "up"},
    {"todo": "Move right", "key": 39, "letter": "right"},
    {"todo": "Move down", "key": 40, "letter": "down"},
    {"todo": "Deselect all", "key": 85, "letter": "U"},
    {"todo": "New random element", "key": 80, "letter": "P"},
    {"todo": "Double click", "key": -1, "letter": "Double-click"},
    {"todo": "5 second change", "key": 68, "letter": "D"}
];

function setOk (c, info) {
    console.log('%c Letter: ' + c + ', ' + info + ' OK!', 'background: #00ff00; color: #000');
    corr++;
};

function setFail (c, info) {
    console.log('%c Letter: ' + c + ', ' + info + ' FAIL!', 'background: #ff0000; color: #000');
    faults++;
};

function getAllSelectedAndReturnOne() {
    var selAll = document.getElementsByClassName("selected");
    var one = "";
    for (var j = 0; j < selAll.length; j++) {
        one = selAll[j];
    }
    return one;
};

function unselectAllButOne() {
    var selAll = document.getElementsByClassName("selected");
    for (var j = 0; j < selAll.length; j++) {
        if (j > 0) {
            selAll[j].classList.remove("selected");
        }
    }
}

function getAllSelected () {
    var selAll = document.getElementsByClassName("selected");
    var ret = [];
    for (var j = 0; j < selAll.length; j++) {
        ret[j] = selAll[j];
    }
    return ret;
};

function getAllDivs () {
    var selAll = document.getElementsByTagName("div");
    var ret = [];
    for (var j = 0; j < selAll.length; j++) {
        ret[j] = selAll[j];
    }
    return ret;
}

function getStyle(el,styleProp)
{
    if (el.currentStyle)
        return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle(el,null)[styleProp];
};

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
    if (getStyle(temp[temp.length-1], "zIndex") > getStyle(temp[0], "zIndex")) {
        setOk("T", "New copy with increased Z-index");
    } else {
        setFail("T", "New copy with increased Z-index");
    }
};

function testA (el) {
    var holderBefore = getStyle(el, "zIndex");
    Kmom05.keydown(65);
    var allEl = getAllSelected();
    var holderAfter = getStyle(allEl[2], "zIndex");
    var ok = true;
    if (holderAfter >= holderBefore) {
        ok = false;
    }
    if (ok) {
        setOk("A", "Decreased Z-index");
    } else {
        setFail("A", "Decreased Z-index");
    }
};

function testS (el) {
    var holderBefore = getStyle(el, "zIndex");
    Kmom05.keydown(83);
    Kmom05.keydown(83);
    var allEl = getAllSelected();
    var holderAfter = getStyle(allEl[2], "zIndex");
    console.log("before: " + holderBefore);
    console.log("after: " + holderAfter);
    var ok = true;
    if (holderAfter <= holderBefore) {
        ok = false;
    }
    if (ok) {
        setOk("S", "Increased Z-index");
    } else {
        setFail("S", "Increased Z-index");
    }
};

function testY (el) {
    if (el.length === 0) {
        setOk("Y", "Deleted elements");
    } else {
        setFail("Y", "Deleted elements");
    }
};

function testI (el) {
    var ok = true;
    for (var j = 0; j < el.length; j++) {
        if (!el[j].classList.contains("selected")) {
            ok = false;
        }
    }
    if (ok) {
        setOk("i", "Select all");
    } else {
        setFail("i", "Select all");
    }
};

function testArrows (el, letter, key) {
    var before = getAllSelectedAndReturnOne().getBoundingClientRect();
    Kmom05.keydown(key);
    var after = getAllSelectedAndReturnOne().getBoundingClientRect();
    var ok = false;

    if (letter === "left") {
        if (after.left < before.left) {
            setOk("Left arrow", "Move left");
        } else {
            setFail("Left arrow", "Move left");
        }
    } else if (letter === "up") {
        if (after.top < before.top) {
            setOk("Up arrow", "Move up");
        } else {
            setFail("Up arrow", "Move up");
        }
    } else if (letter === "right") {
        if (after.left > before.left) {
            setOk("Right arrow", "Move right");
        } else {
            setFail("Right arrow", "Move right");
        }
    } else if (letter === "down") {
        if (after.top > before.top) {
            setOk("Down arrow", "Move down");
        } else {
            setFail("Down arrow", "Move down");
        }
    }
};

function testU (el) {
    var ok = true;
    for (var j = 0; j < el.length; j++) {
        if (el[j].classList.contains("selected")) {
            ok = false;
        }
    }
    if (ok) {
        setOk("U", "Deselect all");
    } else {
        setFail("U", "Deselect all");
    }
};

function testP (el) {
    Kmom05.keydown(80);
    var after = getAllDivs();
    if (after.length > el.length) {
        setOk("P", "New random");
    } else {
        setFail("P", "New random");
    }
};

function testDoubleClick () {
    var el = getAllDivs();
    var one = el[1];
    one.classList.add("selected");
    var event = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
    one.dispatchEvent(event);
    window.setTimeout(function(){
        if (getAllDivs().length < el.length) {
            setOk("Double-click", "mouse event");
        } else {
            setFail("Double-click", "mouse event");
        }
    }, 2500);
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
        } else if (arr[i].letter === "A") {
            var element = getAllSelectedAndReturnOne();
            testA(element);
        } else if (arr[i].letter === "S") {
            var element = getAllSelectedAndReturnOne();
            testS(element);
        } else if (arr[i].letter === "Y") {
            unselectAllButOne();
            Kmom05.keydown(arr[i].key);
            var elements = getAllSelected();
            testY(elements);
        } else if (arr[i].letter === "i") {
            Kmom05.keydown(arr[i].key);
            var elements = getAllSelected();
            testI(elements);
        } else if (arr[i].letter === "left" || arr[i].letter === "up" || arr[i].letter === "right" || arr[i].letter === "down") {
            testArrows(elements, arr[i].letter, arr[i].key);
        } else if (arr[i].letter === "U") {
            Kmom05.keydown(arr[i].key);
            var elements = getAllSelected();
            testU(elements);
        } else if (arr[i].letter === "P") {
            var elements = getAllDivs();
            testP(elements);
        } else if (arr[i].letter === "Double-click") {
            testDoubleClick();
        } else if (arr[i].letter === "D") {
            Kmom05.keydown(73);
            Kmom05.keydown(68);
            console.log('%c EXTRA! Check for a 5 second change on the elements by pressing D!!', 'background: #ffa500; color: #000');
        }
        i++;
    } else {
        window.setTimeout(function(){
            window.clearInterval(timer);
            console.log("DONE! Correct: " + corr + ", Errors: " + faults);
        }, 2500);
    }
}, interval);
})();
