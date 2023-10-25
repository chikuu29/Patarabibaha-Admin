import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-deleterequest',
  templateUrl: './deleterequest.component.html',
  styleUrls: ['./deleterequest.component.scss']
})
export class DeleterequestComponent implements OnInit {
  useradata: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getuserAprrove();
  }
  getuserAprrove(){
    this.ApiParameter.fetchdata('user_delete_request', { "projection": ["*"], "whereConditions": { states: 0 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.useradata = res['data'];
      }
    });
  }
  deleted(data:any){

  }

}
