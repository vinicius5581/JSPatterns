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





// Using hasOwnProperty() to call that method off of the Object.prototype, like so:

for (var i in man) {
    if (Object.prototype.hasOwnProperty.call(man, i)) { // filter
        console.log(i, ":", man[i]);
    }
}


// To avoid the long property lookups all the way to Object, you can use a local variable to “cache” it:

var i,
    hasOwn = Object.prototype.hasOwnProperty;
for (i in man) {
    if (hasOwn.call(man, i)) { // filter
        console.log(i, ":", man[i]);
    }
}

//variation
// Warning: doesn't pass JSLint
var i,
    hasOwn = Object.prototype.hasOwnProperty;
for (i in man) if (hasOwn.call(man, i)) { // filter
    console.log(i, ":", man[i]);
}


//Custom addition to the prototype
if (typeof Object.prototype.myMethod !== "function") {
    Object.protoype.myMethod = function () {
        // implementation...
    };
}


//switch Pattern

var inspect_me = 0,
    result = '';

switch (inspect_me) {
case 0:
    result = "zero";
    break;
case 1:
    result = "one";
    break;
default:
    result = "unknown";
}


/*
JavaScript implicitly typecasts variables when you compare them.
That’s why comparisons such as false == 0 or "" == 0 return true.

To avoid confusion caused by the implied typecasting,
always use the === and !== operators that check both
the values and the type of the expressions
*/

var zero = 0;
if (zero === false) {
    // not executing because zero is 0, not false
}

// antipattern
if (zero == false) {
    // this block is executed...
}


// Avoiding eval()
//“eval() is evil.”
// antipattern
var property = "name";
alert(eval("obj." + property));

// preferred
var property = "name";
alert(obj[property]);

// JSON.parse()

// antipatterns
setTimeout("myFunc()", 1000);
setTimeout("myFunc(1, 2, 3)", 1000);

// preferred
setTimeout(myFunc, 1000);
setTimeout(function () {
    myFunc(1, 2, 3);
}, 1000);




console.log(typeof un);    // "undefined"
console.log(typeof deux);  // "undefined"
console.log(typeof trois); // "undefined"

var jsstring = "var un = 1; console.log(un);";
eval(jsstring); // logs "1"

jsstring = "var deux = 2; console.log(deux);";
new Function(jsstring)(); // logs "2"

jsstring = "var trois = 3; console.log(trois);";
(function () {
    eval(jsstring);
}()); // logs "3"

console.log(typeof un);    // "number"
console.log(typeof deux);  // "undefined"
console.log(typeof trois); // "undefined"

/*
eval() can access and modify a variable in its outer scope,
whereas Function cannot (also note that using Function 
or new Function is identical):
*/
(function () {
    var local = 1;
    eval("local = 3; console.log(local)"); // logs 3
    console.log(local); // logs 3
}());


(function () {
    var local = 1;
    Function("console.log(typeof local);")(); // logs undefined
}());


// Number Conversions with parseInt()
// Function accepts a second radix parameter,
// which is often omitted but shouldn’t be.
var month = "06",
    year = "09";
month = parseInt(month, 10);
year = parseInt(year, 10);

//Alternative ways to convert a string to a number include:
+"08" // result is 8
Number("08") // 8