import {RouterModule, Routes} from '@angular/router';
import {StaffListComponent} from './staff-list/staff-list.component';
import {StaffOrgStrcComponent} from 'app/core/staff-directory/staff-org-strc/staff-org-strc.component';
import {StaffUploadComponent} from './staff-upload/staff-upload.component';
import {StaffBatchUploadFailComponent} from 'app/core/staff-directory/staff-batch-upload/staff-batch-upload-fail/staff-batch-upload-fail.component';
import {StaffBatchUploadComponent} from './staff-batch-upload/staff-batch-upload.component';
import {UnsavedGuard} from '../../shared/guard/staff/staff-guard/staff-guard';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {path: '', component: StaffListComponent},
    {path: 'staff-org', component: StaffOrgStrcComponent},
    {path: 'staff-detail', loadChildren: './staff-detail/staff-detail.module#StaffDetailModule'},
    {
        path: 'staff-upload',
        component: StaffUploadComponent,
        canDeactivate: [UnsavedGuard]
    },
    {path: 'staff-batch-upload', component: StaffBatchUploadComponent},
    {path: 'staff-batch-upload/result', component: StaffBatchUploadFailComponent},
    {path: '**', component: StaffListComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [StaffUploadComponent, UnsavedGuard]
})
export class StaffDirectoryRoutingModule {
}
