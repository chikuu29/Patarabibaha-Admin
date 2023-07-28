import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-view-auth-user',
  templateUrl: './view-auth-user.component.html',
  styleUrls: ['./view-auth-user.component.scss']
})
export class ViewAuthUserComponent implements OnInit {

  authDataList:any[]=[]
  constructor(
    private ApiParameterScript:ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.ApiParameterScript.fetchdata('auth_user',{"projection":["*"],"whereConditions":{}}).subscribe((res:any)=>{
      console.log(res);
      if(res.success && res['data'].length>0){
        this.authDataList=res['data']
      }else{
        this.authDataList=[]
      }
      
    })
  }

  loadAuthData(data:any){
    
  }

}
