import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-chat-user-view',
  templateUrl: './chat-user-view.component.html',
  styleUrls: ['./chat-user-view.component.scss']
})
export class ChatUserViewComponent implements OnInit {

  user_data_message: any = 'All Members';
  userInfoDATA: any[] = [];
  allUserCount: any = 0;
  allInactiveUser: any = 0
  allApprovedUser: any = 0
  allPaidUser: any = 0
  image: any = ''
  filterText: any = ''
  collectionSize = 10
  page = 1
  constructor( private apiparameter: ApiParameterScript,
    private appsevices: AppService) { }

  ngOnInit(): void {
    this.image = this.appsevices.getFilePath() + 'storage/'
    this.laodMemberInfo('All');
  }

  laodMemberInfo(typeOfUser: String, searchbtnClick: boolean = false, clickThroughBox: boolean = false) {

    if (clickThroughBox) this.page = 1
    var apiData: any = {
      "projection": ["*"],
      "whereConditions": {}
    }
    // switch (typeOfUser) {
      
    //     break;
    //   case 'All':
    //     // this.allPaidUsrClick = false
    //     // this.allUserClick = true
    //     // this.allApprovedUserClick = false
    //     // this.allInactiveUserClick = false
    //     this.user_data_message = "Total Members"
    //     apiData = {
    //       "projection": ["*"],
    //       "whereConditions": {}
    //     }
    //     break;
    //   default:
    //     apiData = {
    //       "projection": ["*"],
    //       "whereConditions": {}
    //     }
    //     break;
    // }
  
    if (searchbtnClick) {
      apiData['whereConditions']['user_id'] = this.filterText
    }

    var offset = this.page * 10 - 10
    this.apiparameter.fetchdata('user_info', apiData, offset, 10).subscribe((res: any) => {
      

      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['totalCount'];
        this.userInfoDATA = res['data'];
      } else {
        this.userInfoDATA = [];
        this.collectionSize = 10
      }
    })


  }

  onpageChnage() {
    
    // this.getAllData(0, 10, true, search_text)
    // this.page=1;

    this.collectionSize = 0
   
    this.laodMemberInfo("All")
  }

  getSearchText(event: any) {
    this.filterText = event
  }
  search(search_text: any) {
    
    // this.getAllData(0, 10, true, search_text)
    // var typeOfUser = "Approved"
    // if (this.allPaidUsrClick) typeOfUser = "Paid"
    // else if (this.allUserClick) typeOfUser = "All"
    // else if (this.allInactiveUserClick) typeOfUser = "Inactive"
    // else if (this.allApprovedUserClick) typeOfUser = "Approved"
    this.laodMemberInfo("All", true)
  }
}
