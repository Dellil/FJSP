function addMaker(a) {
    return function(b) {
        return a + b;
    }
}

const add5 = addMaker(5);

// console.log(
//     add5(3),
//     add5(1)
// );

function bValue(key) {
    return function(obj) {
        return obj[key];
    }
}

console.log(bValue('a')({ a: 'hi', b: 'hello'}));