import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class GlobalMaskControlService {
    // -->
    public bind_emitter = new EventEmitter();
    public is_binding;
    // <-----
    constructor() {
    }

    getBinding() {
        return this.is_binding;
    }
// -->遮罩层
    getBindingEmitter() {
        return this.bind_emitter;
    }

    emitBindStatus(status) {
        this.bind_emitter.emit(status);
    }

    // <-----
}
