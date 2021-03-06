javascript:(function(){
var i = 0, interval = 500, round = 1, corr = 0, faults = 0, allEls = document.getElementsByClassName("selected");
var Kmom05 = {};
Kmom05.keydown = async function(k) {
    var myevent = new KeyboardEvent("keydown", {
        'view': window,
        'key': k
    });

    return Promise.resolve(document.dispatchEvent(myevent));

};

var arr = [
    {"todo": "Toggle Circle", "key": "e", "letter": "E"},
    {"todo": "Toggle Circle back", "key": "e", "letter": "E"},
    {"todo": "Increase size", "key": "q", "letter": "Q"},
    {"todo": "Decrease size", "key": "w", "letter": "W"},
    {"todo": "Toggle color", "key": "r", "letter": "R"},
    {"todo": "New copy and increased Z-index", "key": "t", "letter": "T"},
    {"todo": "Decreased Z-index", "key": "a", "letter": "A"},
    {"todo": "Increased Z-index", "key": "s", "letter": "S"},
    {"todo": "Delete selected", "key": "y", "letter": "Y"},
    {"todo": "Select all", "key": "i", "letter": "i"},
    {"todo": "Move left", "key": "ArrowLeft", "letter": "left"},
    {"todo": "Move up", "key": "ArrowUp", "letter": "up"},
    {"todo": "Move right", "key": "ArrowRight", "letter": "right"},
    {"todo": "Move down", "key": "ArrowDown", "letter": "down"},
    {"todo": "Deselect all", "key": "u", "letter": "U"},
    {"todo": "New random element", "key": "p", "letter": "P"},
    {"todo": "5 second change", "key": "d", "letter": "D"},
    {"todo": "Double click", "key": -1, "letter": "Double-click"}
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
    var selAll = document.getElementsByClassName("box")[0];
    return selAll;
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
    return document.getElementsByClassName("selected");
};

function getAllDivs () {
    var selAll = document.getElementsByTagName("div");
    var ret = [];
    for (var j = 0; j < selAll.length; j++) {
        ret.push(selAll[j]);
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
    Kmom05.keydown("q");
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
    Kmom05.keydown("w");
    holderAfter = parseInt(getAllSelectedAndReturnOne().offsetHeight);

    if (holderAfter < holderBefore) {
        setOk("W", "Decreased size");
    } else {
        setFail("W", "Decreased size");
    }
};

function testR (el) {
    var startColor = getStyle(el, "backgroundColor");
    for (var j = 0; j < 3; j++) {
        Kmom05.keydown("r");
        var temp = getAllSelectedAndReturnOne();
        if (getStyle(temp, "backgroundColor") != startColor) {
            setOk("R", "Toggle color");
        } else {
            setFail("R", "Toggle color");
        }
    }
};

function testT (el) {
    Kmom05.keydown("t");
    Kmom05.keydown("t");
    var temp = getAllSelected();
    if (getStyle(temp[temp.length-1], "zIndex") > getStyle(temp[0], "zIndex")) {
        setOk("T", "New copy with increased Z-index");
    } else {
        setFail("T", "New copy with increased Z-index");
    }
};

function testA (el) {
    var holderBefore = parseInt(getStyle(el, "zIndex"));
    Kmom05.keydown("a");
    Kmom05.keydown("a");
    var holderAfter = parseInt(getStyle(el, "zIndex"));
    console.log("before: " + holderBefore);
    console.log("after: " + holderAfter);
    var ok = false;
    if (holderAfter < holderBefore) {
        ok = true;
    }
    if (ok) {
        setOk("A", "Decreased Z-index");
    } else {
        setFail("A", "Decreased Z-index");
    }
};

function testS (el) {
    var holderBefore = parseInt(getStyle(el, "zIndex"));
    Kmom05.keydown("s");
    Kmom05.keydown("s");
    var holderAfter = parseInt(getStyle(el, "zIndex"));
    console.log("before: " + holderBefore);
    console.log("after: " + holderAfter);
    var ok = false;
    if (holderAfter > holderBefore) {
        ok = true;
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
    Kmom05.keydown("p");
    var after = getAllDivs();
    if (after.length > el.length) {
        setOk("P", "New random");
    } else {
        setFail("P", "New random");
    }
};

function testDoubleClick () {
    var el = document.querySelectorAll(".box");
    var event = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
    el[0].dispatchEvent(event);
    window.setTimeout(function(){
        var newLength = document.querySelectorAll(".box").length;
        if (newLength < el.length) {
            setOk("Double-click", "mouse event");
        } else {
            setFail("Double-click", "mouse event");
        }
    }, 2500);
};

var timer = window.setInterval(function(){
    if (i < arr.length){
        if (arr[i].letter === "E") {
            console.log(allEls[0].classList);
            Kmom05.keydown(arr[i].key)
            .then(function() {

                console.log(allEls[0].classList);

                testE(document.getElementById("box1"));
            })

        } else if (arr[i].letter === "Q") {
            Kmom05.keydown(arr[i].key)
            .then(function() {
                var element = getAllSelectedAndReturnOne();
                testQ(element);
            });

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
