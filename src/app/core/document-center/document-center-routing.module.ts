import {RouterModule, Routes} from "@angular/router";
import {DocumentCenterComponent} from "./document-center/document-center.component";
import {NgModule} from "@angular/core";
/**
 * Created by Bonan on 2017/11/13.
 */
const routes: Routes = [
    {path: '', component: DocumentCenterComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DocumentCenterRoutingModule {
}