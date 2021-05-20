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

// value = new Test();
// schema = new Map([[Test, {kind: 'enum'}]]);
// buffer = borsh.serialize(schema, value);
// console.log(new Int32Array(buffer).toString())