import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { isEmpty } from 'lodash';
import { AuthService } from './auth.service';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private _router: Router,
    private _auth: AuthService,
    private appservices: AppService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this._auth.admin.pipe(

      take(1),
      map(admin => {


        if (admin && admin.token) {
          const routerLinksPermission = this._auth.getAppUrlPermission['routerLinksPermission']


          let str = state.url

          // return true
          let index = str.indexOf('/', str.indexOf('/') + 1);
          // Extract the part of the string before the second '/'
          let result = str.substring(0, index)


          var finalUrl = isEmpty(result) ? state.url : result;


          if (routerLinksPermission.includes(finalUrl) || admin.role=="SUPPER_ADMIN" || state.url=='/page_not_found') {
            return true
          }
          // return true
          return this._router.createUrlTree(['page_not_found']);
        } else {
          this._router.navigate(['auth/sign-in'], { queryParams: { redirectUrl: state.url } });
          return false
        }


      })
    );




  }

}
