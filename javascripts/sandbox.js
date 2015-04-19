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

// 1. // for-in loop
for (var i in man) {
    console.log(i, ":", man[i]);
}