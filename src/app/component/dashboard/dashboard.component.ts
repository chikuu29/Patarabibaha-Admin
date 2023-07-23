import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userInfoDATA:any[]=[];
  allUserCount:any=0;
  image:any=''
  constructor(
    private apiparameter: ApiParameterScript,
    private appsevices:AppService
  ) { }

  ngOnInit(): void {
    this.image=this.appsevices.getFilePath()+'storage/'

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
