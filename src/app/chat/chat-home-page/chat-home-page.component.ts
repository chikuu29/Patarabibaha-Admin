import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-chat-home-page',
  templateUrl: './chat-home-page.component.html',
  styleUrls: ['./chat-home-page.component.scss']
})
export class ChatHomePageComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  total_connection: any[] = []
  filterText: any
  profile_id:any
  constructor(
    private appService: AppService,
    private apiParameterScript: ApiParameterScript,
    private _rout: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this._rout.params.subscribe((res: any) => {
      this.profile_id = res['profile_id'];
      var query = `SELECT user_info.user_fname, user_info.user_lname, user_info.user_gender, user_info.user_profile_image, chat_connection_details.*
   FROM user_info
   INNER JOIN chat_connection_details ON user_info.user_id = chat_connection_details.requested_by
   WHERE chat_connection_details.requested_to = '${this.profile_id}'
   UNION
   SELECT user_info.user_fname, user_info.user_lname, user_info.user_gender, user_info.user_profile_image, chat_connection_details.*
   FROM user_info
   INNER JOIN chat_connection_details ON user_info.user_id = chat_connection_details.requested_to
   WHERE chat_connection_details.requested_by = '${ this.profile_id}'`;
      this.blockUI.start("Loading...")
      this.apiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
        console.log(res);
        this.blockUI.stop()
        if (res.data.length > 0) {
          this.total_connection = res['data']
        }
      })
    })

  }

}
