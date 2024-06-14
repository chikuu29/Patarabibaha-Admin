import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
// const appConfig = require('../../config/config.json')
// const appDetailConfig = require('../../config/app.json')
const country_state_district = require('../../config/country_state_district.json')
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private appConfig: any;
  private appDetailConfig: any;
  private country_state_district_Data: any;
  private _authorizationTokenKey: any;
  constructor(
    private _auth: AuthService,
  ) {
    // this.appConfig = appConfig;
    // this.appDetailConfig = appDetailConfig
    this.country_state_district_Data = country_state_district['states']
    
    this.setAuthorizationTokenKey()
  }

  setAuthorizationTokenKey(): void {
    this._auth.admin.subscribe((res: any) => {
      if(res)this._authorizationTokenKey = res.token ? res.token : null;
        // Replace with the actual token key from 'res'
    });
  }

  get authorizationTokenKey() {
    return this._authorizationTokenKey
  }
  get authStatus() {
    return this._auth.getAuthStatus();
  }
  public getApipath() {
    return environment.baseApiURL;
  }
  public getFilePath() {
    return environment.filePath;
  }
  get getappconfig() {
    return this.appConfig;
  }
  get getappVersion() {
    return this.appDetailConfig.version
  }
  get country_state_district() {
    return this.country_state_district_Data
  }
  set startUpAPIConfigSetup(val:any){
    this.appConfig=val
  }


}
