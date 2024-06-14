import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  collapsed: boolean = false
  collapsedForSmallScreen:boolean=false
  @Output() isSidenavCoolapsed: EventEmitter<boolean> = new EventEmitter();
  collapsedSideNav() {
    this.collapsed = !this.collapsed;
    this.isSidenavCoolapsed.emit(this.collapsed);
  }

  @Output() isSidenavCoolapedForSmallScreen: EventEmitter<boolean> = new EventEmitter();
  collapedForSmallScreen() {
    this.collapsedForSmallScreen = !this.collapsedForSmallScreen;
    this.isSidenavCoolapedForSmallScreen.emit(this.collapsedForSmallScreen);
  }
  elem: any;
  activeFullScreenMode: boolean = false
  authInfo:any
  constructor(
    private auth:AuthService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit(): void {
    this.authInfo=this.auth.getAuthStatus()
    this.elem = document.documentElement;
  }

  openFullscreen() {
    
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
