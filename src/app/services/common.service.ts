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
}
