/**
 * Created by Bonan on 2018/1/2.
 */

// -->普通登录入口
const EXG_ROUTER_ENTRY = new RegExp(/^\/entry\/[a-zA-Z]*/);
// <-----

// -->登录入口-手机验证
const EXG_ROUTER_PHONE_CHECK = new RegExp(/^\/entry\/phonecheck/);
// <-----

// -->第三方登陆入口
const EXG_ROUTER_THIRD_PLATFORM_LOGIN = new RegExp(/^\/entry\/third-platform-login/);
// <-----


// -->第三方登陆入口-迅萌
const EXG_ROUTER_THIRD_PLATFORM_LOGIN_XM = new RegExp(/\/entry\/third-platform-login-xm/);
// <-----

// -->帮助中心
const EXG_ROUTER_ASSIST = new RegExp(/^\/assist/);

// <-----

// -->社保计算器
const EXG_ROUTER_CALC = new RegExp(/^\/social-assurance-calc/);
// <-----

// -->错误页面
const EXG_ROUTER_ERROR = new RegExp(/^\/error/);
// <-----


// -->外部首页
const EXG_ROUTER_INDEX = new RegExp(/^\/index/);
// <-----


// -->内部首页
const EXG_ROUTER_USER = new RegExp(/^\/user/);
// <-----

// -->报错页
// <-----
export {
    EXG_ROUTER_ENTRY,
    EXG_ROUTER_PHONE_CHECK,
    EXG_ROUTER_ASSIST,
    EXG_ROUTER_CALC,
    EXG_ROUTER_ERROR,
    EXG_ROUTER_INDEX,
    EXG_ROUTER_THIRD_PLATFORM_LOGIN,
    EXG_ROUTER_THIRD_PLATFORM_LOGIN_XM,
    EXG_ROUTER_USER
}
