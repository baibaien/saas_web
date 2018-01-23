import {Injectable} from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class StaffsService {
    //员工API
    constructor(public rootApiService: RootApiService) {
    }

    // 获取id=name列表
    getStaffOutline() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/get-ygs?name=`;
    }

    //员工列表   get
    // 添加员工  post
    getYgUpload() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/`;
    }

    // 添加员工/员工详情基础配置 get
    getYgSettings() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/create`;
    }

    // 查看员工  get    url/id
    getStaff(id) {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/${id}`;
    }

    getStaffs() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/index`;
    }

    rehire() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/update-re-employ`;
    }

    // 基础信息
    getStaffsIndexSetting() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/index-setting`;
    }

    // 获得社保编辑状态
    getSocialState(yg_id) {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/create-social/?yg_id=${yg_id}`;
    }

    // 导入员工
    getStaffsImport() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/import`;
    }

    // 导入撤销  post
    getStaffsImportRevoke() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/import-revoke`;
    }

    // 导入员工保存  post
    getStaffImportStore() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/import-store`;
    }

    // 更新员工工号 post
    getStaffUpdateNo() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/update-no`;
    }

    // 查看员工工作 get/delete
    getYgWork(id) {
        return `${this.rootApiService.getRootUrl()}/staff/works/${id}`;
    }

    // 添加员工工作 post
    addYgWork() {
        return `${this.rootApiService.getRootUrl()}/staff/works/store`;
    }

    // 更新员工工作 post
    updateYgWork(id) {
        return `${this.rootApiService.getRootUrl()}/staff/works/${id}/update`;
    }

    // 查看员工家庭 get/delete
    getYgFamily(id) {
        return `${this.rootApiService.getRootUrl()}/staff/families/${id}`;
    }

    // 添加员工家庭 post
    addYgFamily() {
        return `${this.rootApiService.getRootUrl()}/staff/families/store`;
    }

    // 更新员工家庭 post
    updateYgFamily(id) {
        return `${this.rootApiService.getRootUrl()}/staff/families/${id}/update`;
    }

    // 查看员工教育 get/delete
    getYgEducation(id) {
        return `${this.rootApiService.getRootUrl()}/staff/educations/${id}`;
    }

    // 添加员工教育 post
    addYgEducation() {
        return `${this.rootApiService.getRootUrl()}/staff/educations/store`;
    }

    // 更新员工教育 post
    updateYgEducation(id) {
        return `${this.rootApiService.getRootUrl()}/staff/educations/${id}/update`;
    }

    // 查看合同列表 get
    getContractList(yg_id) {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-contract/?yg_id=${yg_id}`;
    }

    // 添加新合同 post
    addContract() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-contract/store`;
    }

    // 更新员工详情页基本信息表单
    updateYgBase(yg_id) {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/${yg_id}/update-base`;
    }

    // 更新员工详情页基本信息表单
    updateYgContact(yg_id) {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/${yg_id}/update-contact`;
    }

    // 员工转正
    getYgQualified() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/store-staff-become/`;
    }

    // 员工薪酬
    getYgPay() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/store-salary/`;
    }

    // 员工福利
    getYgBenifit() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/store-benifit`;
    }

    // 员工社保更新
    getYgSocial() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/store-social/`;
    }

    // 员工账户更新
    updateYgAccount() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/update-social-account`;
    }

    // 员工医院更新
    updateYgHospital() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hospital/update`;
    }

    getHospital() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hospital/update-form`;
    }

    // 员工医院列表 post
    getYgHospital() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-hospital/`;
    }

    // 员工银行列表
    getYgBank() {
        return `${this.rootApiService.getRootUrl()}/staff/tl-bank-code/`;
    }

    // 员工银行支行列表
    getYgOpenBank() {
        return `${this.rootApiService.getRootUrl()}/staff/open-bank-code`;
    }

    uploadYgPics() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-certificate-image/upload`;
    }

    deleteYgpic() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-certificate-image`;
    }

    uploadYgsExcel() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/import`;
    }

    saveYgsExcel() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/import-store`;
    }

    downErrorExcel(excel_url) {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/${excel_url}`;
    }

    downloadExcel() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/export`;
    }

    gaveupExcel() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/import-revoke`;
    }

    // 地址有误
    downloadContract() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-contract/preview`;
    }


    /**
     * 合同解除pdf
     * 函数描述
     * downloadStopContract
     * @params:
     * @return:
     */
    downloadStopContract() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-contract/preview-over`;
    }

    // -->员工自助
    getStaffSelf() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/update-self-help`;
    }

    // <-----


    // -->重新雇佣
    getRehireStaff() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/update-re-employ`;
    }

    // <-----

    getRehireValid() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/valid-re-employ`;
    }

    /**
     * getYgContractCreate
     * 函数描述
     * 获取下一个合同生成日期
     * @params: yg_id
     * @return:
     */
    getYgContractCreate() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-yg-contract/create`;
    }


    getSocialConfig() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/social-setting`;
    }

    getSocialCalcResult() {
        return `${this.rootApiService.getRootUrl()}/social/social-calculator`;
    }

    // -->
    getReemploy() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/create-re-employ`;
    }

    // <-----
}
