import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServicee } from 'src/app/services/cookie.service';
import { VideoServiceService } from 'src/app/services/video-service.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private videoServices: VideoServiceService, private router: Router, private cookieService: CookieServicee) { }

  formData(form: any) {
    // console.log(form.value);
    this.videoServices.signUp(form.value).subscribe(res => {
      // console.log(res.success,res.message);     
      if (res.success) {
        // console.log(res);
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
