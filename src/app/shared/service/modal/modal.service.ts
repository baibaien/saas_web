import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ModalService {
    public modal_name;
    public modal_name_emit = new EventEmitter();


    public modal_scroll_emit = new EventEmitter();


    public modal_func_emit = new EventEmitter();

    public modal_info;
    public modal_info_emit = new EventEmitter();

    constructor() {
    }


    setModalName(data) {
        this.modal_name = data;
    }

    emitModalName() {
        this.modal_name_emit.emit(this.modal_name);
    }

    getModalNameEmit() {
        return this.modal_name_emit;
    }


    // 发射回调函数及数据
    emitModalHandler(data) {
        this.modal_func_emit.emit(data);
    }

    getModalHandlerEmit() {
        return this.modal_func_emit;
    }


    // -->info
    setModalDate(data) {
        this.modal_info = data;
    }

    getModalDataEmit() {
        return this.modal_info_emit;
    }

    getModalData() {
        return this.modal_info;
    }

    emitModalData(data) {
        this.modal_info_emit.emit(data);
    }


    // scroll
    emitScrollName() {
        this.modal_scroll_emit.emit(this.modal_name);
    }

    getScrollEmit() {
        return this.modal_scroll_emit;
    }
}
