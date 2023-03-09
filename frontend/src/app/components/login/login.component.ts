import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServicee } from 'src/app/services/cookie.service';
import { VideoServiceService } from 'src/app/services/video-service.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private videoservices: VideoServiceService, private router: Router, private cookieService: CookieServicee) { }

  email = new FormControl("", [
    Validators.required,
    Validators.email
  ])
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ])

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  })

  login() {
    this.videoservices.signIn(this.loginForm.value).subscribe((res) => {
      if (res.token) {
        const obj = this.cookieService.setCookie(res.token);
        obj.success ? this.router.navigate([""], { queryParams: { user: res.username } }) : console.log("error in setting Cookie");
      } else {
        const toastElList: any = document.querySelectorAll('.toast1')
        const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));
        toastList.forEach(toast => toast.show());
      }
    })
  }
}
