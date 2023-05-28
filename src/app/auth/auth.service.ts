import { Injectable } from '@angular/core';
import { AppService } from '../services/app.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject } from 'rxjs';
import { admin } from '../app-Module/admin';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Router } from '@angular/router';

const SecureStorage = require('secure-web-storage');
import * as CryptoJS from 'crypto-js';
// import Swal from 'sweetalert2';

var SECRET_KEY = '1E99423A4ED2WAYWALASECRET_KEY';
var secureCryptoStorage = new SecureStorage(localStorage, {
  hash: function hash(key: any) {
    // key = CryptoJS.SHA256(key, SECRET_KEY);
    key = CryptoJS.SHA256(key, [SECRET_KEY])
    return key.toString();
  },
  encrypt: function encrypt(data: any) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
  },
  decrypt: function decrypt(data: any) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
  }
});
@Injectable(
  {
    providedIn: 'root'

  }

)

export class AuthService {


  admin = new BehaviorSubject<any>(null);
  deactiveAutoLogout: any
  constructor(private http: HttpClient, private _router: Router) {

    console.log("calling Auth services");

  }

  private getApipath() {
    return environment.baseApiURL;
  }
  public signIn(data: any) {
    return this.http.post(`${this.getApipath()}adminLogin`, data)
  }

  public authentication(id: string, name: string, email: string, isLogin: boolean, role: String, _refreshkey: any, expiration_date: any) {
    var user = new admin(id, name, email, isLogin, role, _refreshkey, expiration_date)
    this.admin.next(user);
    secureCryptoStorage.setItem("authInfo", user);
    this.autoLogout(new Date(expiration_date).getTime() - new Date().getTime())

  }
  public autoSignIn() {
    console.log("AutoSignIn Time", moment().format());
    var authInfo = this.getAuthStatus();
    if (!authInfo) {
      return;
    }
    if (new Date(authInfo.expiration_date).getTime() > new Date().getTime()) {
      console.log("AUTO LOGIN SUCCESSFULL");
      this.authentication(authInfo.id, authInfo.name, authInfo.email, true, authInfo.role, authInfo._refreshkey, authInfo.expiration_date)

    } else {
      console.log("YOUR TOKEN EXPIRA");
      this.admin.next(null)
      localStorage.clear()

    }

  }
  public autoLogout(expiration_date: any) {
    console.log("activating Auto Logout");
    // console.log("expiration_date", expiration_date);
    this.deactiveAutoLogout = setTimeout(() => {
      this.logout()
    }, expiration_date);

  }

  public getAuthStatus() {

    try {
      var loginiinfo = secureCryptoStorage.getItem('authInfo');
      if (loginiinfo != null) {
        return loginiinfo
      } else {
        return undefined;
      }

    } catch (error) {
      return undefined
    }
  }

  public logout() {
    console.log(this.getAuthStatus());

    this.http.post(`${this.getApipath()}auth/logout.php`, { "userID": this.getAuthStatus().id,'token':this.getAuthStatus()._refreshkey }).subscribe((res: any) => {

      // Swal.fire(res.message, 'Bye See You Soon', 'success').then(() => {
        this.admin.next(null);
        // this._router.navigateByUrl('/auth/login')
        location.reload();
        localStorage.clear();
        if (this.deactiveAutoLogout) {
          console.log("deactivating Auto Logout");
          clearTimeout(this.deactiveAutoLogout)
        }
      // })

    }, (error) => {
        console.log(error);
        
    })


  }


  public createUserRole(data: any) {
    return this.http.post(`${this.getApipath()}auth/generate_user_role.php`, data)
  }
  public updateUserRole(data: any) {
    return this.http.post(`${this.getApipath()}auth/update_user.php`, data)
  }


  public generateOTPThroughUserIDTOLOGIN(UserID:any){

    return this.http.post(`${this.getApipath()}auth/sucure-authentication.php`, {"USERID":UserID})
  }

  public validateOTPThroughUserIDTOLOGIN(apiDATA:any){

    return this.http.post(`${this.getApipath()}auth/validate-sucure-authentication.php`,apiDATA )
  }

  

}
