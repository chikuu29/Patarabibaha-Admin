import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  usercount: any;
  profilephotocount: any;

  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getuserAprrove();
    this.getProfileImageAprrove();
  }

  getuserAprrove(){
    
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_status: "Pending" } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.usercount = res['data'].length
        //console.log();
      }
    });
  }
  getProfileImageAprrove(){
    this.ApiParameter.fetchdata('user_profile_images', { "projection": ["*"], "whereConditions": { user_profile_images_for_approval: 0 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.profilephotocount = res['data'].length
      }
    });
  }

}
