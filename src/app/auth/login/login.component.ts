import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { isArray } from 'lodash';
import * as _ from 'lodash';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  fontendUrl = environment.fontendUrl
  // **************************
  redirectUrl: any = ''
  // Validators.pattern("^W-([A-Z]{5,5})([@_])([0-9]{3,5})$")
  loginForm = new FormGroup({
    userID: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    checkme: new FormControl('', [])
  });
  constructor(
    private activeroute: ActivatedRoute,
    private Title: Title,
    private _auth: AuthService,
    private _router: Router,
    private alert: ToastrService,
    private api: ApiParameterScript
  ) { }

  ngOnInit(): void {
    // this.blockUI.start('Please Wait...')
    this.Title.setTitle('Sign in to : Patarabibaha Admin Panel')
    // console.log(this.activeroute.snapshot.queryParamMap.get('redirectUrl'));
    this.redirectUrl = this.activeroute.snapshot.queryParamMap.get('redirectUrl') || '/'
  }

  login() {

    // console.log(this.loginForm.value);
    this.blockUI.start('Please Wait');
    if (this.loginForm.valid) {

      var apiData = {
        "userId": this.loginForm.value.userID,
        "password": this.loginForm.value.password
      }
      this._auth.signIn(apiData).subscribe(

        (res: any) => {

          this.blockUI.stop()
          console.log("res", res);
          // this.loader.stop();
          // console.log(res);
          // // console.log(res);
          if (res.success) {


            this._auth.authentication(res.id, res.name, res.email, true, res.role, res.token, res.exp);

            this.alert.success("Login Successfull")
            // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successfull' })
            const apiData = {
              "projection": ["permission"],
              "whereConditions":
                { 'UserId': res.id }
            }

            this.api.fetchdata("admin", apiData).subscribe((res: any) => {
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
                  const navConfig = _.filter(retrivePermission, { permissionGranted: true, displayInSideNav: true })
                  this._auth.setAppUrlPermission({ permissionFoeNavMenu: navConfig, routerLinksPermission: routerLinks })
                } else {
                  this._auth.setAppUrlPermission({ permissionFoeNavMenu: [], routerLinksPermission: routerLinks })
                }
              }else{

                this._auth.setAppUrlPermission({ permissionFoeNavMenu: [], routerLinksPermission: [] })
              }
              var expiration_date = new Date(new Date().getTime() + 86400 * 1000).toString();
              console.log(this.redirectUrl);
              location.href = this.redirectUrl

            })
            // this._router.navigateByUrl(this.redirectUrl)
          } else {
            this.alert.error(res.message)
            // this.messageService.add({ severity: 'error', summary: 'error', detail: res.message })
          }

        },
        (err: any) => {


          this.blockUI.stop()
          console.log("err", err);


        })



    }
  }

}
