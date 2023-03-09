import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadComponent } from './components/upload/upload.component';
import { UserpageComponent } from './components/userpage/userpage.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "uploadimg",
    component: UploadComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: ":username",
    component: UserpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
