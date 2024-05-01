import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: any;
  constructor(private http: HttpClient,private appservices:AppService,) {
    console.log("Calling Api Services");
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    })
    this.headers = headers;
  }
  public getdata(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'fetch', apiData, { headers: this.headers });
  }
    public makeActinForMultipulData(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'makeActinForMultipulData',JSON.stringify(apiData),{ headers: this.headers })
  }
  public makeActinForMultipuldeleteData(apiData:any){
    return this.http.post(this.appservices.getApipath()+ 'makeActinForMultipuldeleteData',JSON.stringify(apiData),{ headers: this.headers })
  }

  public update(apiData: any) {
    return this.http.post(this.appservices.getApipath() + 'update', apiData, { headers: this.headers })

  }




  public save(apiData:any){
    return this.http.post(this.appservices.getApipath() + 'save', apiData, { headers: this.headers })
  }

  public delete(apiData:any){
    const options = {
      body: apiData  // Data to be sent in the body of the request
    };

    return this.http.delete(this.appservices.getApipath() + 'delete', options)
  }






  public fetchDataQueryApi(query:any){
    // return this.http.get(this.appservices.getApipath() + 'generic/getDataFormQuery.php?token='+this.appservices.authStatus._refreshkey+'&query='+encodeURIComponent(JSON.stringify(query)));
    return this.http.post(this.appservices.getApipath() + 'getDataFormQuery', query, { headers: this.headers })
  }

  public deleteImage(apiData:any){
    return this.http.post(this.appservices.getApipath() + `shop/delete_image.php`, apiData)
  }
  public socialMediaLink(apiData:any){
    return this.http.post(this.appservices.getApipath() + `socialMediaLink`, apiData)
  }

  public getSocialMediaLink(){
    return this.http.get(this.appservices.getApipath() + `getsocialMediaLink`)
  }

  public insertCountry(param:any){
    return this.http.post(this.appservices.getApipath()+ `country`,param,{headers:this.headers})
  }
  public state(param:any){
    return this.http.post(this.appservices.getApipath()+ `state`,param,{headers:this.headers})
  }
  public zodiacs(param:any){
    return this.http.post(this.appservices.getApipath()+ `zodiacs`,param,{headers:this.headers})
  }
  public nakshatra(param:any){
    return this.http.post(this.appservices.getApipath()+ `nakshatra`,param,{headers:this.headers})
  }

  public annualincome(param:any){
    return this.http.post(this.appservices.getApipath()+ `annual_income`,param,{headers:this.headers})
  }

  public memberpaln(param:any){
    return this.http.post(this.appservices.getApipath()+ `memberpaln`,param,{headers:this.headers})
  }

  public getAllData(param:any){
    return this.http.post(this.appservices.getApipath()+ `getAllData`,param,{headers:this.headers})
  }
  public city(param:any){
    return this.http.post(this.appservices.getApipath()+ `city`,param,{headers:this.headers})
  }
  public privacypolicy(param:any){
    return this.http.post(this.appservices.getApipath()+ `privacypolicy`,param,{headers:this.headers})
  }
  public contactus(param:any){
    return this.http.post(this.appservices.getApipath()+ `contactus`,param,{headers:this.headers})
  }
  public termandcondition(param:any){
    return this.http.post(this.appservices.getApipath()+ `termandcondition`,param,{headers:this.headers})
  }
  public aboutus(param:any){
    return this.http.post(this.appservices.getApipath()+ `aboutus`,param,{headers:this.headers})
  }

  public userActivation(param:any){
    return this.http.post(this.appservices.getApipath()+ `userActivation`,param,{headers:this.headers})
  }





  public getprofile(param:any){
    return this.http.post(this.appservices.getApipath()+ `getprofile`,JSON.stringify(param),{headers:this.headers})
  }

  public successStory(param: any) {
    return this.http.post(this.appservices.getApipath() + 'successStory', param, { headers: this.headers })
  }
  public dataBaseBackup() {
    return this.http.post(this.appservices.getApipath() + 'dataBaseBackup', null, { headers: this.headers })
  }












}
