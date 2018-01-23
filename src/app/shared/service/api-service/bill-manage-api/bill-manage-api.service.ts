import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class BillManageApiService {
    // -->账单管理API
    // <-----
    constructor(public rootService: RootApiService) {
    }

    getBillListUrl() {
        return `${this.rootService.getRootUrl()}/pay/order/index`;
    }

    // -->创建帐单
    getBillCreateUrl() {
        return `${this.rootService.getRootUrl()}/pay/order/create`;
    }

    // <-----
    getUnpaidListUrl() {
        return `${this.rootService.getRootUrl()}/pay/order/unpaid`;
    }

    getPaidListUrl() {
        return `${this.rootService.getRootUrl()}/pay/order/paid`;
    }

    // 删除帐单
    getDeleteBillUrl(id) {
        return `${this.rootService.getRootUrl()}/pay/order/delete-bill/${id}`;
    }

    // 删除订单
    getDeleteOrderUrl() {
        return `${this.rootService.getRootUrl()}/pay/order/delete-order`;
    }

    // -->下载账单明细
    getBillDetailFile() {
        return `${this.rootService.getRootUrl()}/pay/order/order-down`;
        // return `${this.rootService.getRootUrl()}/pay/order/download-report`;
    }

    // <-----
    // -->导出账单excel
    getBillExcelUrl() {
        return `${this.rootService.getRootUrl()}/pay/order/bill-down`;
    }

    // <-----
    // -->发送账单
    getSendBillDetail() {
        return `${this.rootService.getRootUrl()}/pay/order/send-bill-report-to-mailbox`;
    }

    // <-----
    getPatchFapiao(id) {
        return `${this.rootService.getRootUrl()}/pay/order/${id}/invoice`;
    }

    // -->去支付
    getToPayUrl(id) {
        return `${this.rootService.getRootUrl()}/pay/order/to-pay/${id}`;
    }

    // <-----
    // -->上传凭证
    getUploadImg(id) {
        return `${this.rootService.getRootUrl()}/pay/order/upload-payment-vouchers/${id}`;
    }

    // <-----
    // -->删除凭证
    getDeleteImg(order, voucher) {
        return `${this.rootService.getRootUrl()}/pay/order/remove-payment-voucher/${order}/${voucher}`;
    }

    // <-----


    // -->获取帐单详情
    getBillDetail(id) {
        return `${this.rootService.getRootUrl()}/pay/order/detail/${id}`;
    }

    // <-----


    // -->获取订单详情
    getOrderDetail(id) {
        return `${this.rootService.getRootUrl()}/pay/order/order-detail/${id}`;
    }

    // <-----

    /**
     * getUnpaidTotal
     * 函数描述
     * 获取待支付订单的数量api
     * @params: : ,
     * @return:
     */
    getUnpaidTotal() {
        return `${this.rootService.getRootUrl()}/pay/order/unpaid-total`;
    }


    /**
     * getBillDealStatus
     * 函数描述
     * 获取订单的办理详情
     * @params:
     * @return:
     */
    getBillDealStatus() {
        return `${this.rootService.getRootUrl()}/pay/order/order-status-detail`;
    }


    /**
     * getPaymentVoucher
     * 函数描述
     * 收款凭证
     * @params:
     * @return:
     */
    getPaymentVoucher() {
        return `${this.rootService.getRootUrl()}/pay/order/show-payment-voucher`;
    }


    /**
     * getReceiptVoucher
     * 函数描述
     * 付款凭证
     * @params:
     * @return:
     */
    getReceiptVoucher() {
        return `${this.rootService.getRootUrl()}/pay/order/preview-receipt-voucher`;
    }




}
