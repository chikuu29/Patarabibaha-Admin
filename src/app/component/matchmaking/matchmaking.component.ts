import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss']
})
export class MatchmakingComponent implements OnInit {
  finaldata: any;
  filterText:any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }
  getAllData() {
    let Quary =  'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.user_status = "Approved" AND a.deleted = 1 AND a.status = 1 AND a.user_has_complete_profile = 1';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    });
  }
  matchmaking(data:any){
    let kye = 'Lipun';
    let encripted = CryptoJS.AES.encrypt(JSON.stringify(data),kye).toString();
    this.router.navigate(['matches-page',encripted]);
  }

}
