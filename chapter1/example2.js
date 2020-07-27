let users = [
    { id: 1, name: "ID", age: 32},
    { id: 2, name: "HA", age: 25},
    { id: 3, name: "BJ", age: 32},
    { id: 4, name: "PJ", age: 28},
    { id: 5, name: "JE", age: 27},
    { id: 6, name: "JM", age: 32},
    { id: 7, name: "HI", age: 24},
]

const filter = (list, predicate) => {
    let new_list = [];
    list.map((v) => {
        if(predicate(v)) new_list.push(v);
    });
    return new_list;
}

// const users_under_30 = filter(users, (user) => { return user.age < 30});
// console.log(users_under_30.length);

// let ages = [];
// users_under_30.map((user) => {
//     ages.push(user.age);
// });
// console.log(ages);

// const users_over_30 = filter(users, (user) => {return user.age >= 30});
// console.log(users_over_30.length);

// let names = [];
// users_over_30.map((user) => {
//     names.push(user.name);
// });
// console.log(names);

// map function
function map(list, iteratee) {
    let new_list = [];
    for(var i = 0, len = list.length; i < len; i++) {
        new_list.push(iteratee(list[i]));
    }
    return new_list;
}

// let users_under_30 = filter(users, function(user) { return user.age < 30});
// let ages = map(users_under_30, function (user) { return user.age});
// console.log(ages);

let ages = map(
    filter(users, function(user) { return user.age < 30}),
    function(user) { return user.age}
);
// console.log(ages);

function log_length(value) {
    console.log(value.length);
    return value;
}

function bValue(key) {
    return function(obj) {
        return obj[key];
    }
}

// console.log(log_length(ages));

// console.log(log_length(
//     map(
//         filter(users, function(user) { return user.age >= 30},
//         function(user) { return user.age }
//         ),
//         function(user) { return user.name }
//     )
// ));

console.log(log_length(
    map(
        filter(
            users, function(user) { return user.age >= 30},
            bValue('age')
        ),
        bValue('name')
    )
));