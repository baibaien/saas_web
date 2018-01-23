import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {BillManageApiService} from "../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {BillManageService} from "../../../shared/service/bill-manage/bill-manage.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {Headers} from "@angular/http";
import {isNull, isUndefined} from "util";
import {Router} from "@angular/router";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";
import {ThirdPlatformApiServiceService} from "../../../shared/service/api-service/third-platform-api/third-platform-api-service.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-pay-manage',
    templateUrl: './pay-manage.component.html',
    styleUrls: ['./pay-manage.component.css']
})
export class PayManageComponent implements OnInit, OnDestroy, AfterViewInit {

    public order_id;
    public bank_info = {
        bank: {},
        ali: {}
    };
    public money;


    public is_wx;
    public vcode;
    public pay_type = new FormControl('0');
    public payment = new FormControl();
    public pay_type_watcher;

    public img_arr;
    public local_img_arr = {
        img_arr_child: []
    };

    public pay_img_arr = [
        '', '', ''
    ];

// -->第三方支付
    public is_third_pay;
    public third_pay_info;
    // <-----

    constructor(public httpService: HttpService,
                public sanitizer: DomSanitizer,
                public fb: FormBuilder,
                public thirdPlatformApiService: ThirdPlatformApiServiceService,
                public billManageApiService: BillManageApiService,
                public assistModalService: AssistModalService,
                public router: Router,
                public billManageService: BillManageService) {
        this.pay_img_arr[1] = `/assets/pay-logo/pay-bank.png`;
        document.title = '订单支付';
        this.img_arr = this.fb.group({
            img_arr_child: this.fb.array([])
        });
        this.img_arr.get('img_arr_child').push(new FormControl());
        this.local_img_arr.img_arr_child[0] = {path: '', voucher_id: ''};

        this.pay_type_watcher = this.pay_type.valueChanges.subscribe(data => {
            this.vcode = this.pay_img_arr[Number(data)];
        });
    }

    ngOnInit() {
        this.order_id = this.billManageService.getOrderId();
        if (isUndefined(this.order_id)) {
            if (isNull(window.localStorage.getItem('order_id'))) {
                this.router.navigate(['/user/bill-manage']);
            } else {
                this.order_id = window.localStorage.getItem('order_id');
            }
        }
        if (!isUndefined(this.order_id)) {
            this.httpService.myGet(this.billManageApiService.getToPayUrl(this.order_id))
                .subscribe(data => {
                    console.log(data);
                    this.is_third_pay = data.data.is_third_pay;
                    this.third_pay_info = data.data.third_pay_info;
                    if (this.third_pay_info.hasOwnProperty('url')) {
                        this.third_pay_info['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(
                            this.third_pay_info['url']
                        );
                    } else {
                        this.third_pay_info['url'] = '';
                    }
                    // this.pay_img_arr[2] = data.data.BANK_LIST.ali.imgCode;
                    // this.pay_img_arr[0] = data.data.img_url;
                    this.pay_img_arr = [
                        data.data.img_url,
                        data.data.BANK_LIST.bank.logo,
                        data.data.BANK_LIST.ali.imgCode
                    ];
                    this.vcode = data.data.img_url;
                    this.is_wx = data.data.is_wx;
                    if (this.is_wx) {
                        this.pay_type.setValue('0');
                    } else {
                        this.pay_type.setValue('2');
                    }
                    this.bank_info = JSON.parse(JSON.stringify(data.data.BANK_LIST));
                    this.money = data.data.money;

                }, error => {
                    console.log(error);
                    const err = error.json();
                    if (err.message === '订单已支付！') {
                        this.router.navigate(['/user/bill-manage/paid-list']);
                    }
                });
        }
        // const tmp = document.getElementById('third-plat-iframe');
        // if (tmp.attachEvent){
        //     tmp.attachEvent("onload", function(){
        //         alert("Local tmp is now loaded.");
        //     });
        // } else {
        //     tmp.onload = function(){
        //         alert("Local tmp is now loaded.");
        //     };
        // }
        console.log(this.local_img_arr);
    }

    ngAfterViewInit() {
        console.log(document.getElementsByTagName('iframe'));
    }

    ngOnDestroy() {
        this.pay_type_watcher.unsubscribe();
    }

    selectPayType(bank) {
    }

    uploadImg(event: any, index) {
        console.log(index);
        // if (event.target.files.length > 0) {
        const header = new Headers();
        // const temp_data = event.target.files[0];
        const form_data = new FormData();
        form_data.append('vouchers', event);
        header.append('Authorization', `bearer ${window.localStorage.getItem('mayihr_token')}`);
        const upload_url = this.billManageApiService.getUploadImg(this.order_id);
        this.httpService.myPost(upload_url, form_data, {headers: header}).subscribe((res) => {
            this.local_img_arr.img_arr_child[index]['path'] = res.data.real_path;
            this.local_img_arr.img_arr_child[index]['voucher_id'] = res.data.voucher_id;
            if (this.img_arr.get('img_arr_child')['controls'].length < 5) {
                this.img_arr.get('img_arr_child').push(new FormControl());
                this.local_img_arr.img_arr_child.push({path: '', voucher_id: ''});
            }
            console.log(this.local_img_arr);
        });
        // }
    }

    deleteImg(img_obj, index) {
        console.log(img_obj, index);
        this.httpService.myDelete(this.billManageApiService.getDeleteImg(this.order_id, img_obj['voucher_id']))
            .subscribe(data => {
                this.img_arr.get('img_arr_child').removeAt(index);
                this.local_img_arr.img_arr_child.splice(index, 1);
            });
    }

    toPaidList() {
        console.log(this.local_img_arr);
        if (!(this.local_img_arr.img_arr_child.length === 1 && this.local_img_arr.img_arr_child[0].path === '')) {
            this.billManageService.setListStatus('paid');
            this.router.navigate(['/user/bill-manage/paid-list']);
        }
    }

    /**
     * toThirdPlatformPay
     * 函数描述
     * 第三方支付
     * @params:
     * @return:
     */
    toThirdPlatformPay() {
        this.httpService.myGet(this.thirdPlatformApiService.getThirdPlatformPayment(), {params: {order_id: this.order_id}})
            .subscribe(data => {
                console.log(data);
                this.router.navigate(['/user/bill-manage/paid-list']);
            });
    }

    // frameLoad() {
    //     const iframe = document.getElementsByTagName('iframe');
    //     // iframe.height = iframe.contentDocument.body.scrollHeight.toString();
    //     console.log(iframe);
    // }
}