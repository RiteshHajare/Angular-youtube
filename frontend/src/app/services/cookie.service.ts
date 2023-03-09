import { Injectable } from '@angular/core';
import { cookieMessage } from 'dataTypes';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieServicee {

  constructor(private cookie: CookieService) { }

  setCookie(token: any): cookieMessage {
    try {
      this.cookie.put("token", token);
      return { success: true }
    } catch (error) {
      console.log(error);
      return { success: false }
    }
  }

  getCookie(): any {
    const cookie = this.cookie.get("token");
    if (cookie) return cookie;
    else return "not found"
  }

  deleteCookie(deletecookie: string) {
    this.cookie.remove(deletecookie);

  }
}
