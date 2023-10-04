import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js'; 
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-matchpage',
  templateUrl: './matchpage.component.html',
  styleUrls: ['./matchpage.component.scss']
})
export class MatchpageComponent implements OnInit {
  user_id: any;
  class1 :any = 'flex-item activedata' ;
  class2  :any= 'flex-item';
  class3 :any ='flex-item';
  class4 :any= 'flex-item';
  filterText:any;
  finaldata:any;
  constructor(
    private activatedroute : ActivatedRoute ,
    private commonservice: CommonService
  ) { }

  ngOnInit(): void {
      this.activatedroute.params.subscribe((res:any)=>{
        let encryptSecretKey = 'Lipun';
        let bytes = CryptoJS.AES.decrypt(res.id, encryptSecretKey);
        let data =  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.user_id = data;
      });
      this.matches();
  }

  matchByCast(){
    let data ={
      "user_id" : this.user_id
    }
     this.commonservice.matchByCast(data).subscribe((res:any)=>{
      if(res.status){
        this.finaldata={};
        this.finaldata = res['data']
      }
     });
  }
  premimusMatches(){
    let data ={
      "user_id" : this.user_id
    }
     this.commonservice.premimusMatches(data).subscribe((res:any)=>{
      if(res.status){
        this.finaldata={};
        this.finaldata = res['data']
      }
     });
  }
  matchesforindivisual(){
    let data ={
      "user_id" : this.user_id
    }
     this.commonservice.matchesforindivisual(data).subscribe((res:any)=>{
      if(res.status){
        this.finaldata={};
        this.finaldata = res['data']
      }
     });
  }
  matches(){
    let data ={
      "user_id" : this.user_id
    }
     this.commonservice.matches(data).subscribe((res:any)=>{
        
        if(res.status){
          this.finaldata={};
          this.finaldata = res['data']
        }
        
     });
  }
  activeclass(data:any){

    if(data =='1'){
      this.class1 = 'flex-item activedata' ;
      this.class2 = 'flex-item';
      this.class3 = 'flex-item' ;
      this.class4 = 'flex-item' ;
      this.matches();
    }else if(data =='2'){
      this.class1 = 'flex-item' ;
      this.class2 = 'flex-item activedata';
      this.class3 = 'flex-item' ;
      this.class4 = 'flex-item' ;
      this. matchByCast();
    }else if(data =='3'){
      this.class1 = 'flex-item' ;
      this.class2 = 'flex-item';
      this.class3 = 'flex-item activedata' ;
      this.class4 = 'flex-item' ;
      this.matchesforindivisual();
    }else if(data =='4'){
      this.class1 = 'flex-item' ;
      this.class2 = 'flex-item';
      this.class3 = 'flex-item' ;
      this.class4 = 'flex-item activedata' ;
      this.premimusMatches()
    }

  }

}
