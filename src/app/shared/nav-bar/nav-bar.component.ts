import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DOCUMENT } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import * as _ from 'lodash';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  collapsed: boolean = false
  collapsedForSmallScreen: boolean = false
  @Output() isSidenavCoolapsed: EventEmitter<boolean> = new EventEmitter();
  collapsedSideNav() {
    console.log("cliks", this.collapsed);

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
  authInfo: any


  searchTerm: any
  filteredItems: any[]
  actualSerchItem:any[]=[]
  constructor(
    private auth: AuthService,
    private app: AppService,
    private ApiParameter: ApiParameterScript,
    private router:Router,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit(): void {
    this.authInfo = this.auth.getAuthStatus()
    this.elem = document.documentElement;
    if (this.auth.getAppUrlPermission && _.isArray(this.auth.getAppUrlPermission["permissionFoeNavMenu"])) {
      this.filteredItems = _.filter(this.auth.getAppUrlPermission['permissionFoeNavMenu'], { permissionGranted: true, displayInSideNav: true })
      console.log("this.",this.filteredItems);

      
      this.actualSerchItem=_.flatMap(this.filteredItems, (i: any) => {
        if (i.submenu && _.isArray(i.submenu)) {
          // return [..._.map(i.submenu, 'routerLink')];
          return [...i.submenu]
        } else {
          return [i];
        }

      });
   
      
    } else {
      if (this.app.authStatus.role != "SUPER_ADMIN") {
        const apiData = {
          "projection": ["permission"],
          "whereConditions":
            { 'UserId': this.app.authStatus.id }
        }
        this.ApiParameter.fetchdata("admin", apiData).subscribe((res: any) => {
          if (res.success && res['data'].length > 0) {
            const retrivePermission = JSON.parse(res['data'][0]['permission'])
            const routerLinks = _.flatMap(retrivePermission, (i: any) => {
              if (i.submenu && _.isArray(i.submenu)) {
                return [..._.map(i.submenu, 'routerLink')];
              } else {
                return [i.routerLink];
              }

            });
            if (_.isArray(retrivePermission)) {
              this.filteredItems = _.filter(retrivePermission, { permissionGranted: true, displayInSideNav: true })
              this.auth.setAppUrlPermission({ permissionFoeNavMenu: this.filteredItems, routerLinksPermission: routerLinks })
            } else {
              this.auth.setAppUrlPermission({ permissionFoeNavMenu: [], routerLinksPermission: routerLinks })
            }


          } else {
            this.filteredItems = []
          }


        })
      } else {
        const routerLinks = _.flatMap(this.app.getappconfig['filteredItems'], (i: any) => {
          if (i.submenu && _.isArray(i.submenu)) {
            return [..._.map(i.submenu, 'routerLink')];
          } else {
            return [i.routerLink];
          }
        });
        this.auth.setAppUrlPermission({ permissionFoeNavMenu: this.app.getappconfig['filteredItems'], routerLinksPermission: routerLinks })
      }

    }
  }

  openFullscreen() {

    if (!this.activeFullScreenMode) {
      this.activeFullScreenMode = true
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
      this.activeFullScreenMode = false
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

  logout() {
    this.auth.logout()
  }
  onSearch() {
    console.log("on Search", this.searchTerm);


    this.filteredItems =_.cloneDeep(this.actualSerchItem.filter(item => item['text'].toLowerCase().includes(this.searchTerm.toLowerCase())));

  }

  highlightMatch(item: string): string {
    if (!this.searchTerm) {
      return item;
    }
    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    return item.replace(regex, '<span class="highlight fw-bold text-danger" >$1</span>');
  }
  clickOnserchItem(i:any){
    console.log(i);

    this.searchTerm=i.text
    this.router.navigateByUrl(i.routerLink)
    

  }

}
