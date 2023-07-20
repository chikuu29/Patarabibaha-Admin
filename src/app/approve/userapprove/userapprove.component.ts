import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-userapprove',
  templateUrl: './userapprove.component.html',
  styleUrls: ['./userapprove.component.scss']
})
export class UserapproveComponent implements OnInit {
  useradata: any;

  constructor(
    private ApiParameter: ApiParameterScript,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getuserAprrove();
  }

  getuserAprrove(){
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_ready_for_active_account: 1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.useradata = res['data'];
      }
    });
  }
  approve(data:any){
      this.router.navigate(['/user',data]);
  }

}
