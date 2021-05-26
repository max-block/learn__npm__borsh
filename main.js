const borsh = require("borsh")

class Assignable {
    constructor(properties) {
        Object.keys(properties).map((key) => {
            this[key] = properties[key];
        });
    }
}

class Test extends Assignable {
}


let value = new Test({x: 778, y: "bla"});
let schema = new Map([[Test, {kind: 'struct', fields: [['x', 'u64'], ['y', 'string']]}]]);
let buffer = borsh.serialize(schema, value);
console.log(new Int32Array(buffer).toString())
// 10,3,0,0,0,0,0,0,3,0,0,0,98,108,97

value = new Test({
    admin: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 100, 120],
    min_bet: 100,
    max_bet: 7000
});
schema = new Map([[Test, {kind: 'struct', fields: [["admin", [32]], ["min_bet", "u64"], ["max_bet", "u64"]]}]]);
buffer = borsh.serialize(schema, value);
console.log(new Int32Array(buffer).toString())
// 1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,100,120,100,0,0,0,0,0,0,0,88,27,0,0,0,0,0,0