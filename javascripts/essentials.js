/*
/Minimizing Globals

Local is a variable declared inside of a function. It is local to that function and not available outside the function.
Global is a variable declared outside of any function or simply used without being declared.


Every global variable you create becomes a property of the global object. 
In browsers, for convenience, there is an additional property of the global object called window.
window (usually) points to the global object itself. 
*/

myglobal = "hello"; // antipattern
console.log(myglobal); // "hello"
console.log(window.myglobal); // "hello"
console.log(window["myglobal"]); // "hello"
console.log(this.myglobal); // "hello"


/*
This code works fine, but after calling the function 
you end up with one more variable result in the 
global namespace that can be a source of problems.
*/

function sum(x, y) {
    // antipattern: implied global
    result = x + y;
    return result;
}

/*
The rule of thumb is to always declare variables with var.
*/

function sum(x, y) {
    var result = x + y;
    return result;
}

/*
Another antipattern that creates implied globals is
to chain assignments as part of a var declaration. 
*/

// antipattern, do not use
//a is local but b becomes global
function foo() {
    var a = b = 0;
    //same as var a = (b = 0);
    // ...
}

/*
Declaring the variables, chaining assignments is fine and doesn’t create unexpected globals.
*/

function foo() {
    var a, b;
    // ...
    a = b = 0; // both local
}


/*
Globals created with var (those created in the program outside of any function) cannot be deleted.
Implied globals created without var (regardless if created inside functions) can be deleted.
*/

/*
Properties can be deleted with the delete operator whereas variables cannot
*/

// define three globals
var global_var = 1;
global_novar = 2; // antipattern
(function () {
    global_fromfunc = 3; // antipattern
}());

// attempt to delete
delete global_var; // false
delete global_novar; // true
delete global_fromfunc; // true

// test the deletion
typeof global_var; // "number"
typeof global_novar; // "undefined"
typeof global_fromfunc; // "undefined"


/*
If you need to access the global object without hard-coding the
identifier window, you can do the following from any level of
nested function scope:
**not the case in ECMAScript 5
*/
var global = (function () {
    return this.location;
}());

console.log(global);

/*
Single var Pattern
It’s a good practice to also initialize the variable with an initial value at the time you declare it.
*/

function func() {
    var a = 1,
        b = 2,
        sum = a + b,
        myobject = {},
        i,
        j;

    // function body...

}

/*
Assigning DOM references to local variables together with the single declaration
*/

function updateElement() {
    var el = document.getElementById("result"),
        style = el.style;

    // do something with el and style...

}

/*
Hoisting
*/

// antipattern
myname = "global"; // global variable
function func() {
    alert(myname); // "undefined"
    var myname = "local";
    alert(myname); // "local"
}
func();

/*
The preceding code snippet will behave as if it were implemented like so:
*/

myname = "global"; // global variable
function func() {
    var myname; // same as -> var myname = undefined;
    alert(myname); // "undefined"
    myname = "local";
    alert(myname); // "local"
}
func();


//Foor Loops

// sub-optimal loop
for (var i = 0; i < myarray.length; i++) {
    // do something with myarray[i]
}

/*
HTMLCollections are objects returned by DOM methods such as:
  * document.getElementsByName()
  * document.getElementsByClassName()
  * document.getElementsByTagName()
  * document.images //All IMG elements on the page
  * document.links //All A elements
  * document.forms //All forms
  * document.forms[0].elements //All fields in the first form on the page

  Collections  are live queries against the underlying document (the HTML page). 
  This means that every time you access any collection’s length, you’re querying the live DOM, and DOM operations are expensive in general.
*/


//Loop with array (or collection) length cache

for (var i = 0, max = myarray.length; i < max; i++) {
    // do something with myarray[i]
}


function looper() {
    var i = 0,
        max,
        myarray = [];

    // ...

    for (i = 0, max = myarray.length; i < max; i++) {
        // do something with myarray[i]
    }
}


// i++  //excessive trickiness
// i = i + 1
// i += 1

//for pattern variation:
var i, myarray = [];

for (i = myarray.length; i--;) {
    // do something with myarray[i]
}


//for pattern variation:
var myarray = [],
    i = myarray.length;

while (i--) {
    // do something with myarray[i]
}


//for-in loops / enumeration
//should be used to iterate over nonarray objects.
//It’s important to use the method hasOwnProperty() when iterating over object properties to filter out properties that come down the prototype chain.

// the object
var man = {
    hands: 2,
    legs: 2,
    heads: 1
};

// somewhere else in the code
// a method was added to all objects
if (typeof  Object.prototype.clone === "undefined") {
    Object.prototype.clone = function () {};
}




// 1. // for-in loop
for (var i in man) {
    if (man.hasOwnProperty(i)) { // filter
        console.log(i, ":", man[i]);
    }
}
/*
result in the console
hands : 2
legs : 2
heads : 1
*/


// 2. // antipattern:
// for-in loop without checking hasOwnProperty()
for (var i in man) {
    console.log(i, ":", man[i]);
}
/*
result in the console
hands : 2
legs : 2
heads : 1
clone: function()
*/




for (var i in man) {
    if (Object.prototype.hasOwnProperty.call(man, i)) { // filter
        console.log(i, ":", man[i]);
    }
}