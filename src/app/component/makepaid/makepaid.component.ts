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

  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllData();
    this.getmembership_plan();
  }
  getAllData() {
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.finaldata = [];
        this.alldata = res['data'];
        this.alldata.map((res: any) => {
          // this.finaldata[]= res;
          let daat = Math.abs(Date.now() - new Date(res.user_dob).getTime());
          let age = Math.floor((daat / (1000 * 3600 * 24)) / 365.25);
          this.finaldata.push({
            'alldata': res,
            'age': age
          });
        });
        console.log(this.finaldata);

      }
    })
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }
  makeMemberAsPaid(data: any) {

    console.log("data",data);
    
    const modalRef =  this.modalService.open(MemberPaymentProcessingTaskComponent,{ size: 'lg' })
    modalRef.componentInstance.user_Data=data
    // this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_id: data } }).subscribe((res: any) => {
    //   console.log(res);

    // })




  }
  getmembership_plan() {
    this.ApiParameter.fetchdata('membership_plan', { "projection": ["*"] }).subscribe((res: any) => {
      console.log(res);
    })
  }

}
