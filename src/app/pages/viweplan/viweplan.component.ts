import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viweplan',
  templateUrl: './viweplan.component.html',
  styleUrls: ['./viweplan.component.scss']
})
export class ViweplanComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  // **************************
  allplandata: any;
  planOptionType: any[] = [
    { name: "FREE_PLAN" },
    { name: "DIMOND_PLAN" },
    { name: "GOLD_PLAN" },
  ]
  finaldata: any;
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private ApiParameterScript: ApiParameterScript,
    private ApiParameter: ApiParameterScript,
    private router: Router,
  ) { }



  statuses!: any[];

  clonedProducts: { [s: string]: any } = {};



  ngOnInit(): void {
    this.getallplain();
  }
  getallplain() {
    this.ApiParameter.fetchdata('membership_plan', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);

      }
    })
  }

  edite(data: any) {
    this.router.navigate(['/addplan-page', data]);
  }



}
