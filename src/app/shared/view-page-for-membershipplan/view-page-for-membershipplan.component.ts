import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-view-page-for-membershipplan',
  templateUrl: './view-page-for-membershipplan.component.html',
  styleUrls: ['./view-page-for-membershipplan.component.scss']
})
export class ViewPageForMembershipplanComponent implements OnInit {
  deatils: any;
  user_Data:any
  constructor(
    public modal: NgbActiveModal,
    private ApiParameterScript: ApiParameterScript,
  ) { }

  

  ngOnInit(): void {
    this.ApiParameterScript.fetchdata('membership_plan', { "projection": ["*"] , "whereConditions": { membership_plan_id: this.user_Data }  }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.deatils = res['data'][0];
      }
    });
  }

}
