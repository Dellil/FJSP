let users = [
    { id: 1, name: "ID", age: 32},
    { id: 2, name: "HA", age: 25},
    { id: 3, name: "BJ", age: 32},
    { id: 4, name: "PJ", age: 28},
    { id: 5, name: "JE", age: 27},
    { id: 6, name: "JM", age: 32},
    { id: 7, name: "HI", age: 24},
];

function findBy(key, list, val) {
    for(let i = 0, len = list.length; i < len; i++) {
        if(list[i][key] === val) return list[i];
    }
}

// console.log(findBy('age', users, 32));

function User(id, name, age) {
    this.getId = function() {
        return id;
    }
    this.getName = function() {
        return name;
    }
    this.getAge = function() {
        return age;
    }
}

let users2 = [
    new User(1, "ID", 32),
    new User(2, "HA", 25),
    new User(3, "BJ", 32),
    new User(4, "PJ", 28),
    new User(5, "JE", 27),
    new User(6, "JM", 32),
    new User(7, "HI", 24),
];

function find(list, predicate) {
    for(let i = 0, len = list.length; i < len; i++) {
        if(predicate(list[i])) return list[i];
    }
}

const filter = (list, predicate) => {
    let new_list = [];
    list.map((v) => {
        if(predicate(v)) new_list.push(v);
    });
    return new_list;
}

function map(list, iteratee) {
    let new_list = [];
    for(var i = 0, len = list.length; i < len; i++) {
        new_list.push(iteratee(list[i]));
    }
    return new_list;
}

// console.log(find(users2, function(u) { return u.getAge() === 25; }).getName());
// console.log(find(users, function(u) { return u.name.indexOf('P') !== -1;}));
// console.log(find(users, function(u) { return u.age === 32 && u.name === 'JM';}));
// console.log(find(users2, function(u) {
//     return u.getAge() < 30
// }).getName());

function bmatch1(key, val) {
    return function(obj) {
        return obj[key] === val;
    }
}

// console.log(
//     find(users, bmatch1('age', 32))
// );

// console.log(
//     find(users, bmatch1('name', 'HA'))
// );

// console.log(
//     filter(users, bmatch1('age', 32))
// );

function object(key, val) {
    let obj = {};
    obj[key] = val;
    return obj;
}

function match(obj, obj2) {
    for(let key in obj2) {
        if(obj[key] !== obj2[key]) return false;
    }
    return true;
}

function bmatch(obj2, val) {
    if(arguments.length == 2) obj2 = object(obj2, val);
    return function(obj) {
        return match(obj, obj2);
    }
}

// console.log(
//     match(
//         find(users, bmatch('id', 3)), find(users, bmatch('name', 'BJ'))
//     )
// );

// console.log(
//     find(users, function(u) { return u.age == 32 && u.name == 'JM'})
// );

// console.log(
//     find(users, bmatch({ name: 'JM', age: 32 }))
// );

function findIndex(list, predicate) {
    for(var i = 0, len = list.length; i < len; i++) {
        if(predicate(list[i])) return i;
    }
    return -1;
}

// console.log(findIndex(users, bmatch({ name : "JM", age: 32})));

// console.log(findIndex(users, bmatch({ age: 36 })));
let _ = {};
_.map = function(list, iteratee) {
    let new_list = [];
    for(let i = 0, len = list.length; i < len; i++) {
        new_list.push(iteratee(list[i], i, list));
    }
    return new_list;
};

_.filter = function(list, predicate) {
    let new_list = [];
    for(let i = 0, len = list.length; i < len; i++) {
        if(predicate(list[i], i, list)) new_list.push(list[i]);
    }
    return new_list;
};

_.find = function(list, predicate) {
    for(let i = 0, len = list.length; i < len; i++) {
        if(predicate(list[i], i, list)) return list[i];
    }
};

_.findIndex = function(list, predicate) {
    for(let i = 0, len = list.length; i < len; i++) {
        if(predicate(list[i], i, list)) return i;
    }
    return -1;
}

// console.log(_.filter([1, 2, 3, 4, 5], (val, idx) => {
//     return idx % 2 === 0;
// }));

_.identity = function(v) { return v; }

// console.log(_.filter([true, 0, 10, 'a', false, null], _.identity));

_.some = function(list) {
    return !!_.find(list, _.identity);
}

// _.every = function(list) {
//     return _.filter(list, _.identity).length === list.length;
// }

// console.log(_.some([0, null, 2]));
// console.log(_.some([0, null, false]));

// console.log(_.every([0, null, 2]));
// console.log(_.every([{}, true, 2]));

function not(v) { return !v; }
function beq(a) {
    return function(b) {
        return a === b;
    }
}

_.every = function(list) {
    return beq(-1)(_.findIndex(list, not));
}

// console.log(_.some([0, null, 2]));
// console.log(_.some([0, null, false]));
// console.log(_.every([0, null, 2]));
// console.log(_.every([{}, true, 2]));

function positive(list) {
    return _.find(list, _.identity);
}

function negativeIndex(list) {
    return _.findIndex(list, not);
}

_.some = function(list) {
    return not(not(positive(list)));
};

_.every = function(list) {
    return beq(-1)(negativeIndex(list));
}

// console.log(_.some([0, null, 2]));
// console.log(_.some([0, null, false]));
// console.log(_.every([0, null, 2]));
// console.log(_.every([{}, true, 2]));

_.compose = function() {
    let args = arguments;
    let start = args.length - 1;
    return function() {
        let i = start;
        let result = args[start].apply(this, arguments);
        while(i--) result = args[i].call(this, result);
        return result;
    }
}

_.some = _.compose(not, not, positive);
_.every = _.compose(beq(-1), negativeIndex);

console.log(_.some([0, null, 2]));
console.log(_.every([{}, true, 2]));