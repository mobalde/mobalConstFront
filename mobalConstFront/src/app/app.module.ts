import { SharedService } from './shared/shared.service';
import { LoginService } from './back-office/loggin/async-services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {APP_BASE_HREF} from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './back-office/loggin/login.component';
import { HomeComponent } from './back-office/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { BanqueComponent } from './back-office/banque/banque.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    BanqueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    RouterModule.forRoot([
          { path: '', component: LoginComponent},
          { path: 'home', component: HomeComponent},
          { path: 'banque', component: BanqueComponent}
    ])
  ],
  providers: [LoginService, SharedService, {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
