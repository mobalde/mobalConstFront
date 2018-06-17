import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './loggin/login.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '/home', component: HomeComponent},
            { path: '/login', component: LoginComponent}
        ])],
    exports: [RouterModule]
})
export class BackOfficeRoutingModule { }