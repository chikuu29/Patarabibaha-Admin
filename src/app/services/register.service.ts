import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http:HttpClient,
    private app:AppService
  ) { }


  public setupuserAuthAccount(apiData:any){
    return this.http.post(this.app.getApipath()+'addUserDataFirstApi',apiData)
  }

  public setProfile(apiData:any){
    return this.http.post(this.app.getApipath()+'addUserDataSecondApi',apiData)
  }




}
