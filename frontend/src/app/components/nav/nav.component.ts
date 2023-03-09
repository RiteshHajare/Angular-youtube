import { Component, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServicee } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() type = '';
  cookieBool: Boolean = false;
  constructor(private router: Router, private elementRef: ElementRef, private cookieService: CookieServicee) {
    const token = this.cookieService.getCookie();
    if (token !== "not found") {
      // console.log("cookie present");
      this.cookieBool = true;
    } else {
      // console.log("cookie not");
      this.cookieBool = false;
    }

  }

  imgClick() {
    this.router.navigate(['/uploadimg'])
  }

  hoverEffect() {

    this.elementRef.nativeElement.querySelector('.dropdown-bar').style.visibility = 'visible';
  }
  staticEffect() {

    this.elementRef.nativeElement.querySelector('.dropdown-bar').style.visibility = 'hidden';
  }


  logout() {
    this.cookieService.deleteCookie("token");
    this.cookieBool = false;
  }
}
