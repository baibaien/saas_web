import {CanDeactivate} from "@angular/router";
import {StaffUploadComponent} from "../../../../core/staff-directory/staff-upload/staff-upload.component";
export class UnsavedGuard implements CanDeactivate<StaffUploadComponent> {
    canDeactivate(component: StaffUploadComponent) {
        // let canLeave: Observable<any>;
        if (component.add_yg.touched && component.before_submit && component.show_guard) {
            console.log(123123123);
            return window.confirm('您的表单信息尚未保存，确定要离开此页面吗？');
        } else {
            return true;
        }
    }
}
