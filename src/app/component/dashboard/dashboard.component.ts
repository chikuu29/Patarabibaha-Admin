import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userInfoDATA:any[]=[];
  allUserCount:any=0;
  constructor(
    private apiparameter: ApiParameterScript
  ) { }

  ngOnInit(): void {

    var apiData = {
      "projection": ["*"],
      "whereConditions": []
    }
    this.apiparameter.fetchdata('user_info', apiData).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length>0) {
        this.userInfoDATA=res['data'];
        this.allUserCount=res['data'].length
        
      }else{
        this.userInfoDATA=[];
        this.allUserCount=0
      }

    })
  }

}
