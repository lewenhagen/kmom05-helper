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
    {"todo": "Toggle Circle", "key": 69, "letter": "E", "info": "Testar"},
    {"todo": "Toggle Circle again", "key": 69, "info": null},
    {"todo": "Increase Size", "key": 81, "info": null},
    {"todo": "Increase Size some more", "key": 81, "info": null},
    {"todo": "Decrease Size", "key": 87, "info": null},
    {"todo": "Decrease again", "key": 87, "info": null},
    {"todo": "Decrease some more", "key": 87, "info": null},
    {"todo": "Increase to default", "key": 81, "info": null},
    {"todo": "Toggle color 1", "key": 82, "info": null},
    {"todo": "Toggle color 2", "key": 82, "info": null},
    {"todo": "Toggle color 3", "key": 82, "info": null},
    {"todo": "Toggle color 4", "key": 82, "info": null},
    {"todo": "Copy element", "key": 84, "info": "new one should be random!"},
    {"todo": "Select all for another copy", "key": 73, "info": null},
    {"todo": "Copy several elements", "key": 84, "info": "new ones should be random!"},
    {"todo": "Setting up...", "key": 85, "info": null, "special": "getSelected"},
    {"todo": "Decreasing Z-index", "key": 65, "info": null},
    {"todo": "Checking Z-index", "key": -1, "info": null, "special": "zindex"},
    {"todo": "Increasing Z-index", "key": 83, "info": null},
    {"todo": "Increasing Z-index again", "key": 83, "info": null},
    {"todo": "Checking Z-index", "key": -2, "info": null, "special": "zindex"}
];
function setOk (c) {
    console.log('%c Letter: ' + c + " OK!", 'background: #00ff00; color: #000');
};

function setFail (c) {
    console.log('%c Letter: ' + c + " FAIL!", 'background: #ff0000; color: #000');
};

var i = 0, interval = 500, saveForLater = "";

var timer = window.setInterval(function(){
    if(i < arr.length){
        Kmom05.keydown(arr[i].key);
        if (arr[i].letter === "E") {
            var selAll = document.getElementsByClassName("selected");
            var one = "";
            for (var j = 0; j < selAll.length; j++) {
                one = selAll[j];
            }
            if (parseInt(one.style.borderRaduis)) {
                setOk(arr[i].letter);
            } else {
                setFail(arr[i].letter);
            }
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
