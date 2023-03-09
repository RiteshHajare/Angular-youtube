import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServicee } from 'src/app/services/cookie.service';
import { VideoServiceService } from 'src/app/services/video-service.service';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  jwtToken = ''

  CLOUDINARY_UPLOAD_PRESET = 'youtube_clone_app/video/upload';
  constructor(private videoServices: VideoServiceService,
    private router: Router,
    private elementRef: ElementRef,
    private cookieService: CookieServicee
  ) {
    const token = this.cookieService.getCookie();
    if (token === "not found") {
      // console.log("cookie present");
      this.router.navigate(["/"]);
    } else this.jwtToken = token;
  }

  loader = false;
  disable = false;
  handleVideo(event: Event) {
    this.loader = true;
    this.disable = true;
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      // console.log("FileUpload -> files", fileList[0]);
      var formData = new FormData();
      formData.append('file', fileList[0]);
      formData.append("upload_preset", "youtube_clone_app");
      formData.append("cloud_name", "dgz1wimeg")

      this.videoServices.uploadOnCloud(formData).subscribe((res: any) => {
        // console.log(res.url);
        if (res.url) {
          this.loader = false;
          this.disable = false;

          this.videoServices.postURL(res.url, this.jwtToken).subscribe(res => {
            if (res.success) {
              const toastElList: any = document.querySelectorAll('.toast1')
              const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));
              toastList.forEach(toast => toast.show());
            } else this.elementRef.nativeElement.querySelector('.storedMessage').innerHTML = "Error in uploading video";
          })


        } else {
          alert("some error in uploading video.Please try again.")
          this.router.navigate([""])
        }
      })
    }

  }
}
