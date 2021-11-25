javascript:(function(){
let i = 0, interval = 500, round = 1, corr = 0, faults = 0, allEls = document.getElementsByClassName("box");
let Kmom05 = {};
Kmom05.keydown = async function(k) {
    let myevent = new KeyboardEvent("keydown", {
        'view': window,
        'key': k
    });

    return Promise.resolve(document.dispatchEvent(myevent));

};

let arr = [
    {"todo": "Toggle Circle", "key": "e", "letter": "E"},
    {"todo": "Toggle Circle back", "key": "e", "letter": "E"},
    {"todo": "Increase size", "key": "q", "letter": "Q"},
    {"todo": "Decrease size", "key": "w", "letter": "W"},
    {"todo": "Toggle color", "key": "r", "letter": "R"},
    {"todo": "New copy", "key": "t", "letter": "T"},
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
    let selAll = document.getElementsByClassName("selected")[0];
    return selAll;
};

function unselectAllButOne() {
    let selAll = document.getElementsByClassName("selected");
    for (let j = 0; j < selAll.length; j++) {
        if (j > 0) {
            selAll[j].classList.remove("selected");
        }
    }
}

function getAllSelected () {
    return document.getElementsByClassName("selected");
};

function getAllDivs () {
    let selAll = document.getElementsByTagName("div");
    let ret = [];
    for (let j = 0; j < selAll.length; j++) {
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
    let holderBefore, holderAfter;
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
    let holderBefore, holderAfter;
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
    let startColor = getStyle(el, "backgroundColor");
    for (let j = 0; j < 3; j++) {
        Kmom05.keydown("r");
        let temp = getAllSelectedAndReturnOne();
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
    let temp = getAllSelected();
    if (getStyle(temp[temp.length-1], "zIndex") > getStyle(temp[0], "zIndex")) {
        setOk("T", "New copy");
    } else {
        setFail("T", "New copy");
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
    let ok = true;
    for (let j = 0; j < el.length; j++) {
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
    let before = getAllSelectedAndReturnOne().getBoundingClientRect();
    Kmom05.keydown(key);
    let after = getAllSelectedAndReturnOne().getBoundingClientRect();
    let ok = false;

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
    let ok = true;
    for (let j = 0; j < el.length; j++) {
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
    let after = getAllDivs();
    if (after.length > el.length) {
        setOk("P", "New random");
    } else {
        setFail("P", "New random");
    }
};

function testDoubleClick () {
    let el = document.querySelectorAll(".box");
    let event = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
    el[0].dispatchEvent(event);
    window.setTimeout(function(){
        let newLength = document.querySelectorAll(".box").length;
        if (newLength < el.length) {
            setOk("Double-click", "mouse event");
        } else {
            setFail("Double-click", "mouse event");
        }
    }, 2500);
};

let timer = window.setInterval(function(){
    if (i < arr.length){
        if (arr[i].letter === "E") {
            console.log("before: " + allEls[0].classList);
            Kmom05.keydown(arr[i].key)
            .then(function() {

                testE(document.getElementById("box1"));
                console.log("after: " + allEls[0].classList);

            })

        } else if (arr[i].letter === "Q") {
            Kmom05.keydown(arr[i].key)
            .then(function() {
                let element = getAllSelectedAndReturnOne();
                testQ(element);
            });

        } else if (arr[i].letter === "W") {
            Kmom05.keydown(arr[i].key);
            let element = getAllSelectedAndReturnOne();
            testZ(element);
        } else if (arr[i].letter === "R") {
            let element = getAllSelectedAndReturnOne();
            testR(element);
        } else if (arr[i].letter === "T") {
            let element = getAllSelectedAndReturnOne();
            testT(element);
        } else if (arr[i].letter === "A") {
            let element = getAllSelectedAndReturnOne();
            testA(element);
        } else if (arr[i].letter === "S") {
            let element = getAllSelectedAndReturnOne();
            testS(element);
        } else if (arr[i].letter === "Y") {
            unselectAllButOne();
            Kmom05.keydown(arr[i].key);
            let elements = getAllSelected();
            testY(elements);
        } else if (arr[i].letter === "i") {
            Kmom05.keydown(arr[i].key);
            let elements = getAllSelected();
            testI(elements);
        } else if (arr[i].letter === "left" || arr[i].letter === "up" || arr[i].letter === "right" || arr[i].letter === "down") {
            testArrows(elements, arr[i].letter, arr[i].key);
        } else if (arr[i].letter === "U") {
            Kmom05.keydown(arr[i].key);
            let elements = getAllSelected();
            testU(elements);
        } else if (arr[i].letter === "P") {
            let elements = getAllDivs();
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
