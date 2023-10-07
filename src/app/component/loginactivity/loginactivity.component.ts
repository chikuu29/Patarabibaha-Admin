import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-loginactivity',
  templateUrl: './loginactivity.component.html',
  styleUrls: ['./loginactivity.component.scss']
})
export class LoginactivityComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  
  // **************************
  login_activity: any;
  filterText:any;
  class1: string = 'btn btn-primary btn-lg btn-block';
  class2: string = 'btn btn-primary btn-lg btn-block d-none';
  countele: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router:Router ,
    private CommonService:CommonService
  ) { }

  ngOnInit(): void {
    this.fatchdata();
    console.log(moment().toString);
    
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);

  }
  details(data:string){
    let kye = 'Lipun';
    let encripted = CryptoJS.AES.encrypt(JSON.stringify(data),kye).toString();
    this.router.navigate(['login-activity/details/',encripted]);
  }
  
  

  
  fatchdata() {
    this.CommonService.getLoginCount().subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.login_activity = res['data']
      }
    })
  }
}
