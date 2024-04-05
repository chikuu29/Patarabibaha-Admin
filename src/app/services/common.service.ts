import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  headers: any;
  constructor(private http: HttpClient,private appservices:AppService) {
    console.log("Calling Api Services");
    var headers = new HttpHeaders()
      // .set("Authorization",this.appservices.authStatus._refreshkey)
      //.set("Access-Control-Allow-Origin", "http://localhost:4200")
      // .set("Content-Type", "application/x-www-form-urlencoded;harset=utf-8")
      .set("Content-Type", "application/json")
    this.headers = headers;



  }
  public logoUplode(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'logoUplode', apiData, { headers: this.headers });
  }
  public homeLogoUplode(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'homeLogoUplode', apiData, { headers: this.headers });
  }

  public bannerUplode(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'bannerUplode', apiData, { headers: this.headers })
  }
  public matchByCast(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'cast_matches', apiData, { headers: this.headers })
  }
  public premimusMatches(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'premium_matches', apiData, { headers: this.headers })
  }
  public matchesforindivisual(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'matchesforindivisual', apiData, { headers: this.headers })
  }
  public matches(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'matches', apiData, { headers: this.headers })
  }
  public getLoginCount(){
    return this.http.post(this.appservices.getApipath()+ `getLoginCount`,null,{headers:this.headers})
  }
  public getLikeCount(){
    return this.http.post(this.appservices.getApipath()+ `getLikeCount`,null,{headers:this.headers})
  }
  public secondPass(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'secondPass', apiData, { headers: this.headers })
  }
  public firstPass(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'firstPass', apiData, { headers: this.headers })
  }
  passwordresetbyadmin(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'passwordresetbyadmin', apiData, { headers: this.headers })
  }
  updateEditedPlanDetails(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'updateEditedPlanDetails', apiData, { headers: this.headers })
  }
  public waterMark(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'waterMark', apiData, { headers: this.headers });
  }
  public barCode(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'barCode', apiData, { headers: this.headers });
  }
  public getAllDataById(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'getAllDataById', apiData, { headers: this.headers });
  }
  public filterData(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'filterData', apiData, { headers: this.headers });
  }
  public sendData(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'sendData', apiData, { headers: this.headers });
  }
  deleteRequest(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'deleteRequest', apiData, { headers: this.headers });
  }










}
