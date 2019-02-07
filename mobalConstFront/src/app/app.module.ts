import { BanqueService } from './back-office/banque/async-services/banque.services';
import { BilancompteService } from './back-office/bilan-compte/async-services/bilancomptes.service';
import { ProduitsService } from './back-office/produit/async-services/produits.services';
import { MarchandisesService } from './back-office/marchandise/async-services/marchandises.service';
import { AuthGuardService } from './back-office/loggin/guards/auth-guard.service';
import { UserService } from './back-office/loggin/async-services/user.service';
import { SharedService } from './shared/shared.service';
import { LoginService } from './back-office/loggin/async-services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes, Params } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {APP_BASE_HREF} from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './back-office/loggin/login.component';
import { HomeComponent } from './back-office/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { BanqueComponent } from './back-office/banque/banque.component';
import { MarchandiseComponent } from './back-office/marchandise/marchandise.component';
import { BilanCompteComponent } from './back-office/bilan-compte/bilan-compte.component';
import { ErrorPageComponent } from './back-office/error/error-page.component';
import { ProduitComponent } from './back-office/produit/produit.component';
import { AjoutProduitComponent } from './back-office/produit/ajout-produit.component';

const appRoute: Routes = [
        { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
        { path: 'banque', component: BanqueComponent, canActivate: [AuthGuardService]},
        { path: 'marchandise', component: MarchandiseComponent, canActivate: [AuthGuardService]},
        { path: 'bilanCompte', component: BilanCompteComponent, canActivate: [AuthGuardService]},
        { path: 'produit', 
          component: ProduitComponent, 
          children: [
            {
                path:'ajoutProduit',
                component: AjoutProduitComponent
            }],
          canActivate: [AuthGuardService]},
        { path: 'error', component: ErrorPageComponent},
        { path: '**', component: LoginComponent },
]; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    BanqueComponent,
    MarchandiseComponent,
    BilanCompteComponent,
    ErrorPageComponent,
    ProduitComponent,
    AjoutProduitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [BilancompteService, LoginService, SharedService, UserService, AuthGuardService, MarchandisesService, ProduitsService, BanqueService, {provide: APP_BASE_HREF, useValue: ''}],
  bootstrap: [AppComponent]
})
export class AppModule {}
