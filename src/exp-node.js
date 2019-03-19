/**
 * @class ExpNode 表达式树
 */
class ExpNode {

    constructor(left, op, right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }

    toString() {
        let left = this.stringify(this.left);
        let right = this.stringify(this.right);

        return `${left} ${this.op} ${right}`;
    }

    stringify(value) {
        if (value instanceof ExpNode &&
            (value.op === '+' || value.op === '-') &&
            (this.op === '*' || this.op === '/')) {
            return `(${value})`;
        }
        else {
            return '' + value;
        }
    }

}

module.exports = ExpNode;