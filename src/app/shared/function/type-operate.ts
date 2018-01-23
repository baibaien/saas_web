/**
 * Created by Bonan on 2017/11/8.
 */
/**
 * objToArr
 * 函数描述
 * 将二维以上的对象结构转换为最外层是数组的对象数组
 * @params:
 * @return:
 */
export function objToArr(obj) {
    return Object.keys(obj).map(val => {
        return obj[val];
    });
}