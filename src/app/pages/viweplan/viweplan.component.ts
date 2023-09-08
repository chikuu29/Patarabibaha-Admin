import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import { ViewPageForMembershipplanComponent } from 'src/app/shared/view-page-for-membershipplan/view-page-for-membershipplan.component';
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
    private modalService: NgbModal
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

  viwe(data:any){
    ///alert(data);
    const modalRef = this.modalService.open(ViewPageForMembershipplanComponent, { size: 'lg' })
    modalRef.componentInstance.user_Data = data
  }



}
