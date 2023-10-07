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
      //.set("Access-Control-Allow-Origin", "*")
      // .set("Content-Type", "application/x-www-form-urlencoded;harset=utf-8")
      .set("Content-Type", "application/json")
    this.headers = headers;

 

  }
  public logoUplode(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'logoUplode', apiData, { headers: this.headers });
  }
  public bannerUplode(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'bannerUplode', apiData, { headers: this.headers })
  }
  public matchByCast(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'matchByCast', apiData, { headers: this.headers })
  }
  public premimusMatches(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'premimusMatches', apiData, { headers: this.headers })
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
  
  
  
  
  
}
