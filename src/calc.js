const Decimal = require('decimal.js-light');

const ExpNode = require('./exp-node');

let solution = new Map(); // 利用 Map 去存储解

/**
 * 计算 nums 数组是否可以通过加（+）、减（-）、乘（*）、除（/）计算出 result
 *
 * @param nums
 * @param result Result 不能为负数
 */
function calc(nums, result) {
    const key = `${nums.toString()} ?= ${result.toString()}`;

    if (solution.has(key)) {
        return solution.get(key);
    }

    // console.log('  '.repeat(4 - nums.length), key);

    switch (nums.length) {
        case 0:
            break;

        case 1:
            return nums[0].eq(result) ? nums[0].toString() : false;

        case 2:
            let [a, b] = nums;

            if (a.add(b).eq(result)) {
                return new ExpNode(a, '+', b); // 可以通过加（+）得到
            }

            if (a.lt(b)) {
                [a, b] = [b, a];
            }

            if (a.sub(b).eq(result)) {
                return new ExpNode(a, '-', b);
            }

            if (a.mul(b).eq(result)) {
                return new ExpNode(a, '*', b);
            }

            if (a.div(b).eq(result)) {
                return new ExpNode(a, '/', b);
            }

            if (b.div(a).eq(result)) {
                return new ExpNode(b, '/', a);
            }

            solution.set(key, false);
            return false;

        // nums.length >= 3
        default:
            for (let i = 0; i < nums.length; i++) {
                let [n, other] = splitArray(nums, i);

                let exp;

                // n < result && n + other = result
                if (n.lt(result)) {
                    exp = calc(other, result.sub(n));
                    if (exp) {
                        return new ExpNode(n, '+', exp);
                    }
                }

                // n - other = result OR other - n = result
                if (n.gt(result)) {
                    exp = calc(other, n.sub(result));
                    if (exp) {
                        return new ExpNode(n, '-', exp);
                    }
                }
                else {
                    exp = calc(other, n.add(result));
                    if (exp) {
                        return new ExpNode(exp, '-', n);
                    }
                }

                // n * other = result
                exp = calc(other, result.div(n));
                if (exp) {
                    return new ExpNode(exp, '*', n);
                }

                // n / other = result OR other / n = result
                exp = calc(other, n.div(result));
                if (exp) {
                    return new ExpNode(n, '/', exp);
                }

                exp = calc(other, n.mul(result));
                if (exp) {
                    return new ExpNode(exp, '/', n);
                }
            }

            solution.set(key, false);
            return false;
    }
}

/**
 * 从数组中取出一个值，剩余的值作为剩余数组
 *
 * @param array
 * @param index
 */
function splitArray(array, index) {
    let value = array[index];
    let temp = [];
    for(let i = 0; i < array.length; i++) {
        if (i !== index) {
            temp.push(array[i]);
        }
    }

    return [value, temp];
}

/**
 *
 * @param nums
 * @param result
 * @return {*|string|boolean}
 */
module.exports = function(nums, result) {
    return calc(nums.map(num => new Decimal(num)), new Decimal(result));
};
