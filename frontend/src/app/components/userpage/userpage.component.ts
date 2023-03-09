import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoServiceService } from 'src/app/services/video-service.service';
import { map, Observable } from 'rxjs';
import { CookieServicee } from 'src/app/services/cookie.service';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent {
  @ViewChild('userinput') inputName: any;
  state$: Observable<any> | undefined;
  constructor(private activeRoute: ActivatedRoute, private videoService: VideoServiceService, private cookieService: CookieServicee) { }
  username: string | null = "";
  link: any = "";
  videoId: string | null = '';
  myself: string | null = '';
  comments: any = [];
  toast: any = '';

  ngOnInit() {
    this.username = this.activeRoute.snapshot.paramMap.get('username');

    this.state$ = this.activeRoute.paramMap
      .pipe(map(() => window.history.state))

    this.state$.subscribe(obj => {
      this.link = obj.link;
      this.videoId = obj.videoId
      this.myself = obj.myself,
        this.comments = obj.comments
    })

  }

  commentClick(input: any) {
    if (input == "") return;
    if (this.cookieService.getCookie() === 'not found') {
      this.inputName.nativeElement.value = null;
      const toastElList: any = document.querySelectorAll('.toast3')
      const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));
      toastList.forEach(toast => toast.show());
      return;
    }
    this.comments.push({ user: this.myself, comment: input })
    this.videoService.sendComment(input, this.videoId, this.myself).subscribe(res => {
      // console.log(res);

      if (res.success) {
        this.toast = true;
        const toastElList: any = document.querySelectorAll('.toast1')
        const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));
        toastList.forEach(toast => toast.show());
      } else {
        const toastElList: any = document.querySelectorAll('.toast2')
        const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));
        toastList.forEach(toast => toast.show());
      }

    })
    this.inputName.nativeElement.value = null;
  }


  keyPressed(e: any, input: string) {
    if (e.code === 'Enter') this.commentClick(input);
  }



}
