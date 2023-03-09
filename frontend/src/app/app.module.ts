import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CookieModule } from 'ngx-cookie';
import { UserpageComponent } from './components/userpage/userpage.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    HomeComponent,
    NavComponent,
    SignupComponent,
    LoginComponent,
    UserpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.withOptions()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
