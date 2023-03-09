import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { userVideo } from 'dataTypes';
import { VideoServiceService } from 'src/app/services/video-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allVideos: [] = []
  user: any = ''
  constructor(private videoService: VideoServiceService, private router: Router, private activeRoute: ActivatedRoute) {
    this.user = this.activeRoute.snapshot.queryParamMap.get('user');

    this.videoService.getAllVideos().subscribe(res => {
      // console.log(res);

      this.allVideos = res.videos;
    })

  }
  // .sort(() => Math.random() - 0.5)
  userPage(userdata: userVideo) {

    const nav = userdata.user;
    const navigationExtras: NavigationExtras = {
      state: {
        link: userdata.video,
        videoId: userdata.videoId,
        myself: this.user,
        comments: userdata.comments
      }
    }
    this.router.navigate([`${nav}`], navigationExtras);
  }

  mouseLeave(videoPlayer: any) {
    videoPlayer.pause();
    videoPlayer.currentTime = 1;
  }

  loadStart(videoPlayer: any) {
    videoPlayer.muted = true;
    videoPlayer.currentTime = 1
  }

}
