/**
 * 24 点游戏所有结果计算程序
 * @author zhihuahung
 * 假设 24 点 4 个数为 a, b, c, d
 */

const calc = require('./calc');

let list = [];

/**
 * 计算 1-13 的所有不重复组合
 */
for (let a = 1; a <= 13; a++) {
    for(let b = a; b <= 13; b++) {
        for(let c = b; c <=13; c++) {
            for (let d = c; d <= 13; d++) {
                let exp = calc([a, b, c, d], 24);

                if (exp) {
                    console.log(`${item.join(',')} -> ${exp}`);
                }
            }
        }
    }
}