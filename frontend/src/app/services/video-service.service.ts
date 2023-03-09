import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jsonFormat, signupModel, imgUploadRes, allVideos } from 'dataTypes';
import { Observable } from 'rxjs';
import { CookieServicee } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/dgz1wimeg/video/upload';
  server = "http://localhost:5000"
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private cookieService: CookieServicee) { }
  token = this.cookieService.getCookie();

  uploadOnCloud(formData: FormData) {
    const data = formData;
    return this.http.post(this.CLOUDINARY_API, data);
  }
  signUp(form: signupModel): Observable<jsonFormat> {
    return this.http.post<jsonFormat>(`${this.server}/signup`, form, { headers: this.httpHeaders });
  }

  signIn(form: any): Observable<jsonFormat> {
    return this.http.post<jsonFormat>(`${this.server}/login`, form, { headers: this.httpHeaders });
  }

  postURL(url: string, token: string): Observable<imgUploadRes> {
    console.log(url);
    return this.http.post<imgUploadRes>(`${this.server}/uploadimg`, { url }, { headers: this.httpHeaders.set('Authorization', `Bearer ${token}`) });
  }

  getAllVideos(): Observable<allVideos> {
    return this.http.get<allVideos>(`${this.server}/allvideos`);
  }

  sendComment(comment: string, videoId: string | null, myself: string | null): Observable<jsonFormat> {
    return this.http.post<jsonFormat>(`${this.server}/uploadcomment`, { comment, videoId, myself }, { headers: this.httpHeaders.set('Authorization', `Bearer ${this.token}`) });
  }
}
