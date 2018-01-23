/**
 * Created by Bonan on 2017/11/14.
 */


export function checkOutsourcingStatus(data) {
    // 签约状态
    window.localStorage.setItem('is_outsource_use', data.is_outsource_use);
    // 是否为saas用户
    window.localStorage.setItem('is_saas_use', data.is_saas_use);
    // 是否通过手机验证
    window.localStorage.setItem('is_mobile_auth', data.is_mobile_auth);
    // 外包状态
    window.localStorage.setItem('outsource_sign_status', data.outsource_sign_status);
    // saas状态
    window.localStorage.setItem('saas_sign_status', data.saas_sign_status);
    // 激活状态
    window.localStorage.setItem('is_self_active_status', data.is_self_active_status);
}