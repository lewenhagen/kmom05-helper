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
    {"todo": "Toggle Circle again", "key": 69},
    {"todo": "Increase Size", "key": 81},
    {"todo": "Increase Size some more", "key": 81},
    {"todo": "Decrease Size", "key": 87},
    {"todo": "Decrease again", "key": 87},
    {"todo": "Decrease some more", "key": 87},
    {"todo": "Increase to default", "key": 81},
    {"todo": "Toggle color 1", "key": 82},
    {"todo": "Toggle color 2", "key": 82},
    {"todo": "Toggle color 3", "key": 82},
    {"todo": "Toggle color 4", "key": 82},
    {"todo": "Copy element", "key": 84},
    {"todo": "Select all for another copy", "key": 73},
    {"todo": "Copy several elements", "key": 84},
    {"todo": "Deselect all", "key": 85},
    {"todo": "Deselect all", "key": 85},
    {"todo": "Deselect all", "key": 85},
    {"todo": "Deselect all", "key": 85},
    {"todo": "Deselect all", "key": 85},
    {"todo": "Deselect all", "key": 85}
];
var i = 0, interval = 1500;
var css = 'background: #222; color: #bada55';
var timer = window.setInterval(function(){
    if(i < arr.length){
        var status = "";
        console.log('%c Testing: ' + arr[i].todo + ", key:" + arr[i].key, 'background: #222; color: #bada55');
        if (arr[i].info != null) {
            console.log('%c Look for: ' + arr[i].info, 'background: #ffa500; color: #000');
        }
        Kmom05.keydown(arr[i].key);
        i++;
    } else {
        console.log("DONE!");
        window.clearInterval(timer);
    }
}, interval);
})();

/*
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
