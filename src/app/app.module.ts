import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BaseApi } from './base/BaseApi.Service';
import { AuthGuard } from './base/Guard.Service';
import { DataLocal } from './base/DataLocal.Service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [BaseApi, AuthGuard, DataLocal],
  bootstrap: [AppComponent]
})
export class AppModule {}
