import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-ignoreactivity',
  templateUrl: './ignoreactivity.component.html',
  styleUrls: ['./ignoreactivity.component.scss']
})
export class IgnoreactivityComponent implements OnInit {
  filterText:any;
  like_activity: any;
  countele:number;
  userdata: any;
  constructor(
    private router: Router,
    private CommonService:CommonService,
    private activatedroute:ActivatedRoute,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getDataFromUserInfo();
  }

  details(data:string){
   
    let kye = 'Lipun';
    let encripted = CryptoJS.AES.encrypt(JSON.stringify(data),kye).toString();
    this.router.navigate(['ignore-activity-details',encripted]);
  }
  getDataFromUserInfo(){
    this.ApiParameter.fetchdata('user_activities', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.userdata = res['data'].map((ele:any)=>{
          let countele = ele.user_block_list.split(',').length;
          return {'id' : ele.user_id , 'count' : countele}
        });
         
      }
    });
  }

}
