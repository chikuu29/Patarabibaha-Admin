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


  constructor(private _router: Router, private _auth: AuthService, private appservices: AppService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("hii",this._auth.admin);
      
    return this._auth.admin.pipe(
     
      take(1),
      map(admin => {
  
      
        if (admin && admin.isLogin ) {
          const appConfig = this.appservices.getappconfig;
          let str = state.url
          // let index = str.indexOf('/', str.indexOf('/') + 1);
          // Extract the part of the string before the second '/'
          // let result = str.substring(0, index)
          // var finalUrl=isEmpty(result)?state.url:result;
          // if (appConfig['roleConfig'][admin.role]['accessRoutUrl'].includes(finalUrl)) {
            return true
          // }
          // return this._router.createUrlTree(['error-page']);
        } else {
          this._router.navigate(['auth/sign-in'], { queryParams: { redirectUrl: state.url } });
          return false
        }


      })
    );




  }
  
}
