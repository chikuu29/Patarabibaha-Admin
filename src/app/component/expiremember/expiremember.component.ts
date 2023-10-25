import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expiremember',
  templateUrl: './expiremember.component.html',
  styleUrls: ['./expiremember.component.scss']
})
export class ExpirememberComponent implements OnInit {
  finaldata:any;
  filterText:any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getExpireData();
  }
  
  getExpireData(){
    let Quary =  'select * from auth_user as a Join user_info as b join user_plan_deatils as c on a.auth_ID = b.user_id AND b.user_id = c.user_id where c.active_status = 1 AND c.plan_ending_date < now()';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    });
  }

  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

}
