import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-likeprofileview',
  templateUrl: './likeprofileview.component.html',
  styleUrls: ['./likeprofileview.component.scss']
})
export class LikeprofileviewComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  filterText:any;
  like_activity: any;
  countele:number;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router:Router ,
    private CommonService:CommonService
  ) { }

  ngOnInit(): void {
    this.fatchdata()
  }
  details(data:string){
    let kye = 'Lipun';
    let encripted = CryptoJS.AES.encrypt(JSON.stringify(data),kye).toString();
    this.router.navigate(['like-activity/details',encripted]);
  }
  fatchdata() {
    this.CommonService.getLikeCount().subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.like_activity = res['data'];
        this.countele= this.like_activity.length;
      }
    })
  }

}
