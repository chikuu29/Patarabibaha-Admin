import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { MemberPaymentProcessingTaskComponent } from 'src/app/shared/member-payment-processing-task/member-payment-processing-task.component';

@Component({
  selector: 'app-makepaid',
  templateUrl: './makepaid.component.html',
  styleUrls: ['./makepaid.component.scss']
})
export class MakepaidComponent implements OnInit {
  finaldata: any = [];
  alldata: any;
  defultdata: any;
  filterText:string
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    //this.getdefultplan();.
    this.getmembership_plan();
    

  }
  getSearchText(event:any){
 
    this.filterText=event
    

  }
  getAllData() {
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_membership_plan_type: this.defultdata } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    })
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }
  makeMemberAsPaid(data: any) {
    const modalRef = this.modalService.open(MemberPaymentProcessingTaskComponent, { size: 'lg' })
    modalRef.componentInstance.user_Data = data
  }
  getmembership_plan() {
    this.ApiParameter.fetchdata('membership_plan', { "projection": ["*"], "whereConditions": { membership_plan_default: 1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.defultdata = res['data'][0].membership_plan_type;
        this.getAllData();
        console.log(this.defultdata);
      }
    })
  }

  // getdefultplan() {

  //   this.ApiParameter.fetchdata('membership_plan', { "projection": ["*"] }).subscribe((res: any) => {
  //     if (res.success && res['data'].length > 0) {
  //         this.defultdata = res['data'];
  //         console.log(this.defultdata);
  //     }
  //   });
  // }

}
