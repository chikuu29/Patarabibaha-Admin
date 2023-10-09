import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-likeprofiledetails',
  templateUrl: './likeprofiledetails.component.html',
  styleUrls: ['./likeprofiledetails.component.scss']
})
export class LikeprofiledetailsComponent implements OnInit {
  user_id: any;
  alldataoflike: any;
  userdata: any;
  filterText:any;

  constructor(
    private router: Router,
    private CommonService:CommonService,
    private activatedroute:ActivatedRoute,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((res:any)=>{
      let encryptSecretKey = 'Lipun';
      let bytes = CryptoJS.AES.decrypt(res.id, encryptSecretKey);
      let data =  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.user_id = data;
      this.alldata(this.user_id);
      this.getDataFromUserInfo(this.user_id);
    });
  }

  userpage(data:any){
    this.router.navigate(['/user', data]);
  }

  alldata(data:any){
    this.ApiParameter.fetchdata('user_like', { "projection": ["*"] ,"whereConditions": { liked_by_profile_id : data }}).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.alldataoflike = res['data'].filter((ele:any)=>{
          if(ele.isLiked == 1){
            return ele;
          }
        });
      }
    })
  }
  getDataFromUserInfo(data:any){
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"] ,"whereConditions": { user_id : data } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.userdata = res['data'][0];
        console.log(this.userdata);
        
      }
    });
  }

}
