import { SharedService } from './shared.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
    HeaderComponent],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule
    ],
    providers: [SharedService],
    exports: []
  })
  export class SharedModule {
  }
