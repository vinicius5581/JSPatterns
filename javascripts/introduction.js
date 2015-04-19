/*
Primitive types are not objects: 
number, string, boolean, null, and undefined, 
number, string, boolean have corresponding object representation in the form of primitive wrappers


Type of objects
1) Native - Described in the ECMAScript standard
The native objects can further be categorized as built-in (for example, Array, Date) or user-defined (var o = {};).

2) Host - Defined by the host environment (for example, the browser environment)
Host objects are, for example, window and all the DOM objects. If you’re wondering whether you’re using host objects, try running your code in a different, nonbrowser environment. If it works fine, you’re probably using only native objects.

Prototypes
A prototype is an object (no surprises) and every function you create automatically gets a prototype property that points to a new blank object.
Every function has a prototype property.


*/


//Once per scope** , you can use the following string:
//**either function scope, global scope, or at the beginning of a string passed to eval()
function my() {
	"use strict"
	//rest of the function...
}

//http://jslint.com/

//Console
// log(), which prints all the parameters passed to it
// dir(), which enumerates the object passed to it and prints all properties
console.log("test", 1, {}, [1,2,3]);
console.log({one: 1, two: {three: 3}});
console.dir({one: 1, two: {three: 3}});

//this code works if typed in the console too:
for (var i = 0; i <= 50; i += 10) {console.log(i);}

// >>> window.name === window['name']; // true
console.log(window.name === window['name']);

