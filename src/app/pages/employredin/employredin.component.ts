import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-employredin',
  templateUrl: './employredin.component.html',
  styleUrls: ['./employredin.component.scss']
})
export class EmployredinComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  Employer = new FormGroup({
    Employer_in_name: new FormControl('', [Validators.required])
  })
  tabledata: any;
  action: any = 'Submit';
  rdata: any;
  filterText:any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.Employer = new FormGroup({
      Employer_in_name: new FormControl('')
    });

    this.action= 'Submit';
    this.getAllData();
  }
  public() {

    if (this.Employer.valid) {

      if (this.action == 'Submit') {
        var updateData = {
          "data": {
            "Employer_in_name": this.Employer.value.Employer_in_name,
            "Employer_in_date_time": moment().toISOString()
          },
        }
        this.ApiParameter.savedata('employer_in', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: res.message
            }).then((ress: any) => {
              this.ngOnInit()
            });
          } else {
            Swal.fire({
              icon: 'success',
              text: res.message
            });
          }
        });
      } else {
        var updateData1 = {
          "data": {
            "Employer_in_name": this.Employer.value.Employer_in_name,
          },
          "whereConditions":{id:this.rdata[0].id}
        }
        this.ApiParameter.updatedata('employer_in', updateData1).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: res.message
            }).then((ress: any) => {
              this.ngOnInit()
            });
          } else {
            Swal.fire({
              icon: 'success',
              text: res.message
            });
          }
        });
      }


    } else {
      Swal.fire({
        icon: 'error',
        text: 'Please Enter Employer In Name'
      })
    }

  }
  getAllData() {
    this.ApiParameter.fetchdata('employer_in', { "projection": ["*"] }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success) {
        //this.privacypalicy.patchValue(res['data'][0])
        this.tabledata = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })

  }
  update(data: any) {
    this.action = 'Update';
    this.ApiParameter.fetchdata('employer_in', { "projection": ["*"] }).subscribe((res: any) => {


      if (res.success) {
        // this.tabledata = res['data'];
       this.rdata = res['data'].filter((val: any) => { return val = val.id == data });
        //console.log(rdata);

        this.Employer.patchValue(this.rdata[0]);

      }
    })
  }
  deleted(data:any){
    //console.log(id);
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('employer_in', { "whereConditions": { id: data } }).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.success) {
        Swal.fire('Success', res.message, 'success').then(() => {
          this.ngOnInit()
        });
      } else {
        Swal.fire('Error', res.message, 'error')
      }
    });
  }

  publish(id:any,status:any){

    if(status == 1){
      let updateData = {
        "data": {
          "status": 0,
        },
        "whereConditions": { id: id }
      }
      this.ApiParameter.updatedata('employer_in', updateData).subscribe((res: any) => {
        // console.log(res);
        if (res.success) {
          Swal.fire({
            icon: 'success',
            text: "Unpublished"
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

    }else if(status == 0){
      let updateData = {
        "data": {
          "status": 1,
        },
        "whereConditions": { id: id }
      }
      this.ApiParameter.updatedata('employer_in', updateData).subscribe((res: any) => {
        // console.log(res);
        if (res.success) {
          Swal.fire({
            icon: 'success',
            text: "Published"
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
    }

  }

}
