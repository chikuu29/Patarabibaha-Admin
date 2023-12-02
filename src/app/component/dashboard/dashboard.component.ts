import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  allUserClick: boolean = false;
  allApprovedUserClick: boolean = false;
  allInactiveUserClick: boolean = false;
  allPaidUsrClick: boolean = false


  user_data_message: any = 'All Members';
  userInfoDATA: any[] = [];
  allUserCount: any = 0;
  allInactiveUser: any = 0
  allApprovedUser: any = 0
  allPaidUser: any = 0
  image: any = ''
  filterText: any = ''
  collectionSize=0
  page=1
  constructor(
    private apiparameter: ApiParameterScript,
    private appsevices: AppService
  ) { }

  ngOnInit(): void {
    this.image = this.appsevices.getFilePath() + 'storage/'

    this.getUserCount(["Approved", 'All', 'Paid', 'Unpaid', 'Inactive'])
    this.laodMemberInfo('Inactive');
  }
  getSearchText(event: any) {
    this.filterText = event
  }
  search(search_text: any) {
    console.log(search_text);
    // this.getAllData(0, 10, true, search_text)
    var typeOfUser = "Approved"
    if (this.allPaidUsrClick) typeOfUser = "Paid"
    else if (this.allUserClick) typeOfUser = "All"
    else if (this.allInactiveUserClick) typeOfUser = "Inactive"
    else if (this.allApprovedUserClick) typeOfUser = "Approved"
    this.laodMemberInfo(typeOfUser, true)
  }

  onpageChnage(){
    // console.log(search_text);
    // this.getAllData(0, 10, true, search_text)
    // this.page=1;

    this.collectionSize=0
    var typeOfUser = "Approved"
    if (this.allPaidUsrClick) typeOfUser = "Paid"
    else if (this.allUserClick) typeOfUser = "All"
    else if (this.allInactiveUserClick) typeOfUser = "Inactive"
    else if (this.allApprovedUserClick) typeOfUser = "Approved"
    this.laodMemberInfo(typeOfUser)
  }
  getUserCount(countUserList: any) {
    var query = "SELECT COUNT(user_id) as count FROM user_info"

    countUserList.forEach((item: any) => {
      switch (item) {
        case "Approved":
          query = "SELECT COUNT(user_id) as count FROM user_info WHERE user_membership_plan_active=1"
          this.apiparameter.fetchDataFormQuery(query).subscribe((res: any) => {
            console.log(res);
            if (res.success && res['data'].length > 0) {

              this.allApprovedUser = res['data'][0].count ? res['data'][0].count : 0
            } else {
              this.allApprovedUser = 0
            }

          })

          break;
        case 'Paid':
          query = "SELECT COUNT(user_id) as count FROM user_info WHERE user_membership_plan_active=1 AND user_membership_plan_type !='Free'"
          this.apiparameter.fetchDataFormQuery(query).subscribe((res: any) => {
            console.log(res);
            if (res.success && res['data'].length > 0) {

              this.allPaidUser = res['data'][0].count ? res['data'][0].count : 0
            } else {
              this.allPaidUser = 0
            }

          })
          break;

        case "Inactive":
          query = "SELECT COUNT(user_id) as count FROM user_info WHERE user_membership_plan_active=0"
          this.apiparameter.fetchDataFormQuery(query).subscribe((res: any) => {
            console.log(res);
            if (res.success && res['data'].length > 0) {

              this.allInactiveUser = res['data'][0].count ? res['data'][0].count : 0
            } else {
              this.allInactiveUser = 0
            }

          })
          break;
        case "All":
          query = "SELECT COUNT(user_id) as count FROM user_info"
          this.apiparameter.fetchDataFormQuery(query).subscribe((res: any) => {
            console.log("res", res);
            if (res.success && res['data'].length > 0) {

              this.allUserCount = res['data'][0].count ? res['data'][0].count : 0
            } else {
              this.allUserCount = 0
            }

          })
          break;
        default:

      }

    });


  }

  laodMemberInfo(typeOfUser: String, searchbtnClick: boolean = false) {

    var apiData :any = {
      "projection": ["*"],
      "whereConditions": {}
    }
    switch (typeOfUser) {
      case 'Approved':
        this.allApprovedUserClick = true
        this.allUserClick = false
        this.allInactiveUserClick = false
        this.allPaidUsrClick = false
        this.user_data_message = "All Approved Members"
        apiData = {
          "projection": ["*"],
          "whereConditions": { "user_membership_plan_active": 1 }
        }
        break;
      case 'Paid':
        this.allUserClick = false
        this.allApprovedUserClick = false
        this.allInactiveUserClick = false
        this.allPaidUsrClick = true
        this.user_data_message = "All Paid Members"
        apiData = {
          "projection": ["*"],
          "whereConditions": { "user_membership_plan_active": 1 ,'user_membership_plan_type':'Gold'}
        }

        break;
      case 'Inactive':
        this.allPaidUsrClick = false
        this.allUserClick = false
        this.allApprovedUserClick = false
        this.allInactiveUserClick = true
        this.user_data_message = "All Recent Register Members"
        apiData = {
          "projection": ["*"],
          "whereConditions": { "user_membership_plan_active": 0 }
        }
        break;
      case 'All':
        this.allPaidUsrClick = false
        this.allUserClick = true
        this.allApprovedUserClick = false
        this.allInactiveUserClick = false
        this.user_data_message = "Total Members"
        apiData = {
          "projection": ["*"],
          "whereConditions": {}
        }
        break;
      default:
        apiData = {
          "projection": ["*"],
          "whereConditions": {}
        }
        break;
    }

    if (searchbtnClick) {
      apiData['whereConditions']['user_id'] = this.filterText
    }
    
    var offset=this.page*10-10
    this.apiparameter.fetchdata('user_info', apiData,offset,10).subscribe((res: any) => {
      console.log("res", res);
      
      if (res.success && res['data'].length > 0) {
        this.collectionSize=res['totalCount'];
        this.userInfoDATA = res['data'];
      } else {
        this.userInfoDATA = [];
        this.collectionSize=0
      }
    })


  }
}
