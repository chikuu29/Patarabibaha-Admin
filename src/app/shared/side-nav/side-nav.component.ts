import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CryptographyService } from 'src/app/services/cryptography.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  usercount: number =0;
  profilephotocount: number=0;
  deliteeeqest: number=0;

  constructor(
    private ApiParameter: ApiParameterScript,
    private cryptographyservice : CryptographyService,
    private _auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.getuserAprrove();
    this.getProfileImageAprrove();
    this.getDeleteRequestdata();
    // let item = secureCryptoStorage.setItem("authInfo")
    // this.ApiParameter.fetchdata('admin', { "projection": ["*"], "whereConditions": { user_status: "Pending" } }).subscribe((res: any) => {
    //   if (res.success && res['data'].length > 0) {
    //     this.usercount = res['data'].length;
    //     //console.log();
    //   }
    // });
  }

  getuserAprrove(){
    
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_status: "Pending" } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.usercount = res['data'].length;
        //console.log();
      }
    });
  }
  getProfileImageAprrove(){
    this.ApiParameter.fetchdata('user_profile_images', { "projection": ["*"], "whereConditions": { user_profile_images_for_approval: 0 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.profilephotocount = res['data'].length;
      }
    });
  }
  getDeleteRequestdata(){
    this.ApiParameter.fetchdata('user_delete_request', { "projection": ["*"], "whereConditions": { states: 0 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.deliteeeqest = res['data'].length;
      }
    });
  }

}
