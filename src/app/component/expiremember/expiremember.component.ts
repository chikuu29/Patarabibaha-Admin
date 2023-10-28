import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberPaymentProcessingTaskComponent } from 'src/app/shared/member-payment-processing-task/member-payment-processing-task.component';


@Component({
  selector: 'app-expiremember',
  templateUrl: './expiremember.component.html',
  styleUrls: ['./expiremember.component.scss']
})
export class ExpirememberComponent implements OnInit {
  finaldata: any;
  filterText: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getExpireData();
  }

  getExpireData() {
    let Quary = 'select * from auth_user as a Join user_info as b join user_plan_deatils as c on a.auth_ID = b.user_id AND b.user_id = c.user_id where c.active_status = 1 AND c.plan_ending_date < now()';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    });
  }

  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

  deletedata(data: any, deleted: any) {

    if (deleted == 1) {

      Swal.fire({
        icon: 'question',
        text: 'Do you want to Delete',
        showCancelButton: true,
      }).then((r: any) => {
        console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "deleted": 0,
            },
            "whereConditions": { user_id: data }
          }
          this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
            // console.log(res);
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "deleted"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })
        } else {

        }

      })


    } else if (deleted == 0) {

      Swal.fire({
        icon: 'question',
        text: 'Do you want to Recover',
        showCancelButton: true,
      }).then((r: any) => {
        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "deleted": 1,
            },
            "whereConditions": { user_id: data }
          }
          this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
            // console.log(res);
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "Recoverad"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })
        } else {

        }
      });

    }
  }
  Upgrade(data:any){
    const modalRef = this.modalService.open(MemberPaymentProcessingTaskComponent, { size: 'lg' })
    modalRef.componentInstance.user_Data = data
  }

}
