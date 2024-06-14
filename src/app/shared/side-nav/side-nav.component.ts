import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { isArray } from 'lodash';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { CryptographyService } from 'src/app/services/cryptography.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() isSidenavCoolapedForSmallScreen = false;
  usercount: number = 0;
  profilephotocount: number = 0;
  deliteeeqest: number = 0;
  phoneapprovedata: number = 0;
  navConfig: any = []
  constructor(
    private ApiParameter: ApiParameterScript,
    private cryptographyservice: CryptographyService,
    private _auth: AuthService,
    private app: AppService
  ) { }

  ngOnInit(): void {

    this.loadSideNav()
    this.getuserAprrove();
    this.getProfileImageAprrove();
    this.getDeleteRequestdata();
    this.phoneapprove();
  }


  loadSideNav() {
    if (this._auth.getAppUrlPermission && isArray(this._auth.getAppUrlPermission["permissionFoeNavMenu"])) {
      this.navConfig = _.filter(this._auth.getAppUrlPermission['permissionFoeNavMenu'], { permissionGranted: true, displayInSideNav: true })
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
            if (isArray(retrivePermission)) {
              this.navConfig = _.filter(retrivePermission, { permissionGranted: true, displayInSideNav: true })
              this._auth.setAppUrlPermission({ permissionFoeNavMenu: this.navConfig, routerLinksPermission: routerLinks })
            } else {
              this._auth.setAppUrlPermission({ permissionFoeNavMenu: [], routerLinksPermission: routerLinks })
            }


          } else {
            this.navConfig = []
          }


        })
      } else {
        const routerLinks = _.flatMap(this.app.getappconfig['navConfig'], (i: any) => {
          if (i.submenu && _.isArray(i.submenu)) {
            return [..._.map(i.submenu, 'routerLink')];
          } else {
            return [i.routerLink];
          }
        });
        this._auth.setAppUrlPermission({ permissionFoeNavMenu: this.app.getappconfig['navConfig'], routerLinksPermission: routerLinks })
      }

    }



  }

  getuserAprrove() {
    this.ApiParameter.fetchdata('user_info', {
      projection: ['*'],
      whereConditions: { user_status: 'Pending' },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.usercount = res['data'].length;

      }
    });
  }
  getProfileImageAprrove() {
    this.ApiParameter.fetchdata('user_profile_images', {
      projection: ['*'],
      whereConditions: { user_profile_images_for_approval: 0 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.profilephotocount = res['data'].length;
      }
    });
  }
  getDeleteRequestdata() {
    this.ApiParameter.fetchdata('user_delete_request', {
      projection: ['*'],
      whereConditions: { states: 0 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.deliteeeqest = res['data'].length;
      }
    });
  }
  phoneapprove() {
    this.ApiParameter.fetchdata('user_info', {
      projection: ['*'],
      whereConditions: { phone_no_request: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {


        this.phoneapprovedata = res['data'].length;

      }
    });
  }

  public activeSubmenu(index: number) {
    this.navConfig[index];

    if (this.navConfig[index].submenuActive) {
      this.navConfig[index]['submenuActive'] = false;
    } else {
      this.navConfig[index]['submenuActive'] = true;
    }
  }
}
