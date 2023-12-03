import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-view-auth-user',
  templateUrl: './view-auth-user.component.html',
  styleUrls: ['./view-auth-user.component.scss']
})
export class ViewAuthUserComponent implements OnInit {

  authDataList:any[]=[]
  activeAuthUserCount:any=0
  inactiveAuthUserCount:any=0
  allAuthUserCount:any=0

  activeAuthUserClick:boolean=false
  inactiveAuthUserClick:boolean=false
  allAuthUserClick:boolean=false
  filterText:string
  constructor(
    private ApiParameterScript:ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.loadAuthData('All')
    this.getAuthMemberDataCount(["All", 'active', 'inactive'])
  }


  getAuthMemberDataCount(countUserList: any) {
    var query = "SELECT COUNT(auth_ID) as count FROM auth_user"

    countUserList.forEach((item: any) => {
      switch (item) {
        case "active":
          query = "SELECT COUNT(auth_ID) as count FROM auth_user WHERE account_status='active'"
          this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
            console.log(res);
            if (res.success && res['data'].length > 0) {

              this.activeAuthUserCount = res['data'][0].count ? res['data'][0].count : 0
            } else {
              this.activeAuthUserCount = 0
            }

          })

          break;


        case "inactive":
          query = "SELECT COUNT(auth_ID) as count FROM auth_user WHERE account_status='inactive'"
          this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
            console.log(res);
            if (res.success && res['data'].length > 0) {

              this.inactiveAuthUserCount = res['data'][0].count ? res['data'][0].count : 0
            } else {
              this.inactiveAuthUserCount = 0
            }

          })
          break;
        case "All":
          query = "SELECT COUNT(auth_ID) as count FROM auth_user"
          this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
            console.log(res);
            if (res.success && res['data'].length > 0) {

              this.allAuthUserCount = res['data'][0].count ? res['data'][0].count : 0
            } else {
              this.allAuthUserCount = 0
            }

          })
          break;
        default:

      }

    });


  }

  loadAuthData(typeOfUser:any){
    var apiData = {
      "projection": ["*"],
      "whereConditions": {}
    }
    switch (typeOfUser) {
      case 'active':
        this.inactiveAuthUserClick = false
        this.allAuthUserClick = false
        this.activeAuthUserClick = true
 
        // this.user_data_message = "All Approved Members"
        apiData = {
          "projection": ["*"],
          "whereConditions": { "account_status": 'active' }
        }
        break;
      case 'inactive':
        this.inactiveAuthUserClick = true
        this.allAuthUserClick = false
        this.activeAuthUserClick = false
        // this.user_data_message = "All Paid Members"
        apiData = {
          "projection": ["*"],
          "whereConditions": {"account_status": 'inactive' }
        }

        break;

      case 'All':
        this.inactiveAuthUserClick = false
        this.allAuthUserClick = true
        this.activeAuthUserClick = false
        // this.user_data_message = "Total Members"
        apiData = {
          "projection": ["*"],
          "whereConditions": {  }
        }
        break;
      default:
        apiData = {
          "projection": ["*"],
          "whereConditions": {}
        }
        break;
    }

    this.ApiParameterScript.fetchdata('auth_user', apiData).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        this.authDataList = res['data'];
      } else {
        this.authDataList = [];
      }
    })
    
  }

}
