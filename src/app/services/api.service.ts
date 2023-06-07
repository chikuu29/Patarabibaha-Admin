import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: any;
  constructor(private http: HttpClient,private appservices:AppService) {
    console.log("Calling Api Services");
    var headers = new HttpHeaders()
      // .set("Authorization",this.appservices.authStatus._refreshkey)
      //.set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", "application/x-www-form-urlencoded;harset=utf-8")
    this.headers = headers;

 

  }
  public getdata(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'fetch', apiData, { headers: this.headers });
  }

  public update(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'generic/update.php',apiData,{ headers: this.headers })

  }

  public save(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'generic/savedata.php',apiData,{ headers: this.headers })
  }

  public delete(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'generic/deletedate.php',apiData,{ headers: this.headers })
  }

  public addmedicine(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'medicine/creatmed.php',apiData,{ headers: this.headers })
  }


     /**
  * @param requestId ,100(For Adding New product) ,101(For Updating Product)
  * @param apiData ,
  * @author Suryanarayan Biswal
  * @since 01-11-2022
  */
  public requsting_E_Commerce_Product_Api(requestId:any,apiData:any){
    return this.http.post(this.appservices.getApipath()+ `shop/create_Selling_Product.php?request_id=${requestId}&token=admin_waywala`,apiData,{ headers: this.headers })
  }
  
  public fetchDataQueryApi(query:any){
    return this.http.get(this.appservices.getApipath() + 'generic/getDataFormQuery.php?token='+this.appservices.authStatus._refreshkey+'&query='+encodeURIComponent(JSON.stringify(query)));
  }

  public deleteImage(apiData:any){
    return this.http.post(this.appservices.getApipath()+ `shop/delete_image.php`,apiData,{headers:this.headers})
  }
  public socialMediaLink(apiData:any){
    return this.http.post(this.appservices.getApipath()+ `socialMediaLink`,apiData,{headers:this.headers})
  }

  public getSocialMediaLink(){
    return this.http.post(this.appservices.getApipath()+ `getsocialMediaLink`,{headers:this.headers})
  }

  public insertCountry(param:any){
    return this.http.post(this.appservices.getApipath()+ `country`,param,{headers:this.headers})
  }
  public state(param:any){
    return this.http.post(this.appservices.getApipath()+ `state`,param,{headers:this.headers})
  }
 





  



}
