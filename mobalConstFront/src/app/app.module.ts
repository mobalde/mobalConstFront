import { AuthService } from './back-office/loggin/guards/auth.service';
import { AuthGuardService } from './back-office/loggin/guards/auth-guard.service';
import { UserService } from './back-office/loggin/async-services/user.service';
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
import { MarchandiseComponent } from './back-office/marchandise/marchandise.component';
import { PopinConfirmationComponent } from './popin/popin-confirmation/popin-confirmation.component';
import { BilanCompteComponent } from './back-office/bilan-compte/bilan-compte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    BanqueComponent,
    MarchandiseComponent,
    PopinConfirmationComponent,
    BilanCompteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    RouterModule.forRoot([
          { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
          { path: 'banque', component: BanqueComponent, canActivate: [AuthGuardService]},
          { path: 'marchandise', component: MarchandiseComponent, canActivate: [AuthGuardService]},
          { path: 'bilanCompte', component: BilanCompteComponent, canActivate: [AuthGuardService]},
          { path: '', component: LoginComponent},
    ])
  ],
  providers: [LoginService, SharedService, UserService, AuthGuardService, AuthService, {provide: APP_BASE_HREF, useValue: ''}],
  bootstrap: [AppComponent]
})
export class AppModule {}
