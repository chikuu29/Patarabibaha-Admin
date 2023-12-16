import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  elem: any;
  activeFullScreenMode: boolean = false
  constructor(
    private auth:AuthService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
  }

  openFullscreen() {
    console.log("active FullScreen Mode" );
    if (!this.activeFullScreenMode) {
      this.activeFullScreenMode=true
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      this.activeFullScreenMode=false
      this.closeFullscreen()
    }
  }
  /* Close fullscreen */
  closeFullscreen() {
    console.log("In active FullScreen Mode");
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
     
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  logout(){
    this.auth.logout()
  }

}
