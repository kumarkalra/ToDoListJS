var toDoList = [];

/**
 * self invoking function to get list from local storage and display it on UI
 */
(function () { 
    if ( localStorage["toDoList"] ) {    
        toDoList = JSON.parse(localStorage["toDoList"]);
    }    
    for (i = 0; i < toDoList.length; i++)   {
        var newFood = "<a href='#' onClick='removeRecord(" + i + ");'>X  </a> " + toDoList[i] + " <br>";
        document.getElementById('items').innerHTML += newFood;
    };
    document.getElementById('count').innerHTML = toDoList.length;
})();

/**
 * Represents storage of list in local storage.
 * @constructor
 */
function storeList() {
    localStorage["toDoList"] = JSON.stringify(toDoList);
};

/**
 * Represents addition of item to the list.
 * @constructor
 */
function addItems () {
    var addItem = document.getElementById('addItem').value;
    if (addItem != '' && toDoList.indexOf(addItem) == -1)
    {
        toDoList.push(addItem);
        var newFood = "<a href='#' onClick='removeRecord(" + toDoList.indexOf(addItem) + ");'>X</a> " + addItem + " <br>";
        document.getElementById('items').innerHTML += newFood;
        document.getElementById('count').innerHTML = toDoList.length;
        document.getElementById("myForm").elements[0].value = '';
        document.getElementById('dupAlert').style.visibility = 'hidden';
        storeList(); 
    }else{
        if (toDoList.indexOf(addItem) > -1){
            document.getElementById('dupAlert').style.visibility = 'visible';
            document.getElementById('dupAlert').innerHTML = "<b>" + addItem + "</b> is already in the list";
        }
    }

}

/**
 * Represents removal of record from list.
 * @constructor
 * @param {number} i - index of item ot be removed.
 */
function removeRecord (i) {
    toDoList.splice(i, 1);
    var newFood = "";
    for (var i = 0; i < toDoList.length; i++) {
        newFood += "<a href='#' onClick='removeRecord(" + i + ");'>X</a> " + toDoList[i] + " <br>";
    };
    document.getElementById('items').innerHTML = newFood;
    document.getElementById('count').innerHTML = toDoList.length;
    storeList();
}