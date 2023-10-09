import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-changeuserpass',
  templateUrl: './changeuserpass.component.html',
  styleUrls: ['./changeuserpass.component.scss']
})
export class ChangeuserpassComponent implements OnInit {
  finaldata: any;
  filterText :any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  userpage(data: any,fname:any,lname:any) {
    let kye = 'Lipun';
    let alldata = data+':'+fname+':'+lname;
    let encripted = CryptoJS.AES.encrypt(JSON.stringify(alldata),kye).toString();
    this.router.navigate(['/2wayverification', encripted]);
  }

  getAllData() {
    let Quary =  'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    });
  }

}
