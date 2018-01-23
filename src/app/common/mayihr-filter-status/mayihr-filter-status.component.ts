import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {MayihrFilterService} from "../../shared/service/mayihr-filter/mayihr-filter.service";
import {GlobalFuncService} from "../../shared/service/global-func/global-func.service";

@Component({
    selector: 'mayihr-filter-status',
    templateUrl: './mayihr-filter-status.component.html',
    styleUrls: ['./mayihr-filter-status.component.css']
})
export class MayihrFilterStatusComponent implements OnInit, OnDestroy, OnChanges {
    @Input()
    request_type;
    @Input()
    request_url;
    @Input()
    filter_term;
    @Output()
    submit_emitter = new EventEmitter();
    public advanced_filter;
    public filter_term_emit;

    constructor(public mayihrFilterService: MayihrFilterService,
                public globalFuncService: GlobalFuncService) {
        this.filter_term_emit = this.mayihrFilterService.getLocalFilterEmit().subscribe(data => {
            // this.getFilter(this.mayihrFilterService.getLocalFilter());
            console.log(data);
            this.getFilter(data);
        });
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.getFilter(this.mayihrFilterService.getLocalFilter());
    }

    ngOnDestroy() {
        this.filter_term_emit.unsubscribe();
    }

    closeTerm(i, j) {
        this.filter_term[i].child[j].status = false;
        this.mayihrFilterService.setLocalFilter(this.filter_term);
        this.mayihrFilterService.emitLocalFilter();
        this.globalFuncService.setInfoListSource(this.request_type, this.request_url, this.mayihrFilterService.compileFilterEmit());
        this.globalFuncService.emitInfoListSource();
        for (let i in this.filter_term) {
            for (let j in this.filter_term[i].child) {
                if (this.filter_term[i].child[j].status) {
                    if (this.filter_term[i].child[j].status_show && this.filter_term[i].child[j].status) {
                        this.advanced_filter = true;
                        return false;
                    }
                } else {
                    this.advanced_filter = false;
                }
            }
        }

    }

    getFilter(data) {
        console.log(data);
        this.filter_term = data;
        this.advanced_filter = false;
        console.log(this.filter_term);
        for (let i in this.filter_term) {
            for (let j in this.filter_term[i].child) {
                if (this.filter_term[i].child[j].status) {
                    if (this.filter_term[i].child[j].status_show && this.filter_term[i].child[j].status) {
                        console.log(this.filter_term[i]);
                        this.advanced_filter = true;
                        return false;
                    } else {
                        this.advanced_filter = false;
                    }
                }
            }
        }
    }
}
