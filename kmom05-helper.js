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
    {"todo": "Selecting the element", "key": 73, "info": null},
    {"todo": "Toggle Circle", "key": 69, "info": "Testar"},
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
var i = 0, interval = 500, saveForLater = "";

var timer = window.setInterval(function(){
    if(i < arr.length){
        var status = "";
        console.log('%c Testing: ' + arr[i].todo + ", key:" + arr[i].key, 'background: #222; color: #bada55');
        if (arr[i].info != null) {
            console.log('%c Look for: ' + arr[i].info, 'background: #ffa500; color: #000');
        }
        if (arr[i].special === "getSelected") {
            var allElements = document.getElementsByClassName("selected");
            var selectedElement = "";

            for(var j = 0; j < allElements.length; j++){
                selectedElement = allElements[j];
                saveForLater = allElements[j-1];
            }
            console.log('%c Remove all selected and choose one!', 'background: #ffff00; color: #000');
            Kmom05.keydown(arr[i].key);
            selectedElement.classList.add("selected");
        } else if (arr[i].special === "zindex") {
            var oneSelected = document.getElementsByClassName("selected");
            for (var m = 0; m < oneSelected.length; m++) {
                if (arr[i].key === -1) {
                    if (oneSelected[m].style.zIndex < saveForLater.style.zIndex) {
                        console.log('%c Keypress A is working!', 'background: #00ff00; color: #000');
                    } else {
                        console.log('%c Keypress A do not work!', 'background: #ff0000; color: #000');
                    }
                } else if (arr[i].key === -2) {
                    if (oneSelected[m].style.zIndex > saveForLater.style.zIndex) {
                        console.log('%c Keypress S is working!', 'background: #00ff00; color: #000');
                    } else {
                        console.log('%c Keypress S do not work!', 'background: #ff0000; color: #000');
                    }
                }
            }
        } else {
            Kmom05.keydown(arr[i].key);
        }
        i++;
    } else {
        console.log("DONE!");
        window.clearInterval(timer);
    }
}, interval);
})();

/*
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
