import {RouterModule, Routes} from "@angular/router";
import {ErrorPageComponent} from "./error-page.component";
import {NgModule} from "@angular/core";
/**
 * Created by Bonan on 2017/12/4.
 */


const routes: Routes = [
    {path: '', component: ErrorPageComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ErrorPageRoutingModule {
}