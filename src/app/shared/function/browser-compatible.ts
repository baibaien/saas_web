/**
 * Created by Bonan on 2017/12/12.
 */
export function ie9Test() {
    let result;
    if (navigator.appName == 'Microsoft Internet Explorer'
        &&
        Number(navigator.appVersion.split(';')[1].replace(/[ ]/g, '').replace('MSIE', '')) < 10) {
        result =  true;
    } else {
        result = false;
    }
    return result;
}
export function ie8Test() {
    let result;
    if (navigator.appName == 'Microsoft Internet Explorer'
        &&
        Number(navigator.appVersion.split(';')[1].replace(/[ ]/g, '').replace('MSIE', '')) < 9) {
        result =  true;
    } else {
        result = false;
    }
    return result;
}

/**
 * isPhone
 * 函数描述
 * 是否为移动端
 * @params:
 * @return:
 */
export function isPhone() {
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsIpad = sUserAgent.match(/ipad/i)[0] === 'ipad';
    const bIsIphoneOs = sUserAgent.match(/iphone os/i)[0] === 'iphone os';
    const bIsMidp = sUserAgent.match(/midp/i)[0] === 'midp';
    const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)[0] === 'rv:1.2.3.4';
    const bIsUc = sUserAgent.match(/ucweb/i)[0] === 'ucweb';
    const bIsAndroid = sUserAgent.match(/android/i)[0] === 'android';
    const bIsCE = sUserAgent.match(/windows ce/i)[0] == 'windows ce';
    const bIsWM = sUserAgent.match(/windows mobile/i)[0] === 'windows mobile';
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    } else {
    }
}