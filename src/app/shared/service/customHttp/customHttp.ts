import {Injectable} from "@angular/core";
import {
    Http,
    RequestOptionsArgs,
    Response,
    RequestOptions,
    ConnectionBackend,
} from "@angular/http";
import {LoadingBarService} from "../../loading-bar/loading-bar.service";
import {Observable} from "rxjs/Observable";
@Injectable()
export class CustomHttp extends Http {
    timer: Array<any> = [];
    count = 0;
    sum = 0;
    public img = new Image();


    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                public loading: LoadingBarService) {
        super(backend, defaultOptions);
        this.img.src = '/assets/loading/loading.gif';

    }

    get(url: string, options ?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, options));
    }

    post(url: string, body: string, options ?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options ?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }

    patch(url: string, body: string, options ?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.patch(url, body, this.getRequestOptionArgs(options)));
    }

    getRequestOptionArgs(options ?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }

    // 拦截器
    intercept(observable: Observable<Response>): Observable<Response> {

        // const img_promise = new Promise((resolve) => {
        //     console.log(this.img.complete);
        //     if (this.img.complete) {
        //         resolve();
        //     } else {
        //         this.img.onload = () => {
        //             resolve();
        //         };
        //     }
        // });

        return Observable.create((observer) => {
            // console.log(observable.);
            // img_promise.then(() => {
            setTimeout(() => {
                this.count++;
                this.loading.open();
                observable.subscribe(res => {
                    observer.next(res);
                    this.sum++;
                    if (this.sum === this.count) {
                        this.loading.close();
                    }
                }, (err) => {
                    this.sum++;
                    if (this.sum === this.count) {
                        this.loading.close();
                    }
                    observer.error(err);
                }, () => {
                    observer.complete(); // 注意添加这句，否则有可能一些第三方的包不能正常使用，如ng2-translate
                });
            }, 1);
            // });
        });
    }

}

