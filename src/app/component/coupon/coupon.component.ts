import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  Buttan: any;
  couponcode = new FormGroup({
    coupon: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    created_At: new FormControl(moment().toISOString())
  });
  tabledata: any;
  filterText: any;
  id: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.couponcode = new FormGroup({
      coupon: new FormControl(''),
      type: new FormControl(''),
      amount: new FormControl(''),
      created_At: new FormControl(moment().toISOString())
    });
    this.Buttan = 'Submit';
    this.getAllData();
  }

  uppercase(event: any) {
    // alert(event.target.value.toUpperCase());
    // let value = event.target.value;
    this.couponcode.value.coupon = event.target.value.toUpperCase()
  }

  submit() {
    if (this.Buttan == 'Submit') {
      if (this.couponcode.value.coupon == undefined || this.couponcode.value.coupon == null || this.couponcode.value.coupon == '') {
        Swal.fire({
          icon: 'error',
          text: "Coupon code can't Blank"
        });
      } else if (this.couponcode.value.type == '') {
        Swal.fire({
          icon: 'error',
          text: "Select a type"
        });
      } else if (this.couponcode.value.amount == '') {
        Swal.fire({
          icon: 'error',
          text: "Amount can't Blank"
        });
      } else if (this.couponcode.value.type == '1') {
        if (Number(this.couponcode.value.amount) < 1 || Number(this.couponcode.value.amount) > 100) {
          Swal.fire({
            icon: 'error',
            text: "Amount should be 1 to 100"
          });
        } else {
          this.savedata();
        }
      } else {
        this.savedata();
      }
    }else if(this.Buttan == 'Update'){
      if (this.couponcode.value.coupon == undefined || this.couponcode.value.coupon == null || this.couponcode.value.coupon == '') {
        Swal.fire({
          icon: 'error',
          text: "Coupon code can't Blank"
        });
      } else if (this.couponcode.value.type == '') {
        Swal.fire({
          icon: 'error',
          text: "Select a type"
        });
      } else if (this.couponcode.value.amount == '') {
        Swal.fire({
          icon: 'error',
          text: "Amount can't Blank"
        });
      } else if (this.couponcode.value.type == '1') {
        if (Number(this.couponcode.value.amount) < 1 || Number(this.couponcode.value.amount) > 100) {
          Swal.fire({
            icon: 'error',
            text: "Amount should be 1 to 100"
          });
        } else {
          this.updatedata();
        }
      } else {
        this.updatedata();
      }
    }
  }
  savedata() {
    this.ApiParameter.savedata('coupon_code', { "data": this.couponcode.value }).subscribe((res: any) => {
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
    })
  }
  updatedata(){
 let  alldatawithid = {
    "data": this.couponcode.value ,
    "whereConditions":{id:this.id}
  }
    this.ApiParameter.updatedata('coupon_code', alldatawithid).subscribe((res: any) => {
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
  getAllData() {
    this.ApiParameter.fetchdata('coupon_code', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success) {
        this.tabledata = res['data'];
      }
    })

  }

  update(data: any) {
    this.id= data;
    this.Buttan = 'Update';
    this.ApiParameter.fetchdata('coupon_code', { "projection": ["*"], "whereConditions": { id: data } }).subscribe((res: any) => {
      if (res.success) {
        this.couponcode.patchValue(res['data'][0]);
      }
    })
  }

  deleted(data: any) {
    
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('coupon_code', { "whereConditions": { id: data } }).subscribe((res: any) => {
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

  publish(id: any, status: any) {

    if (status == 1) {
      let updateData = {
        "data": {
          "status": 0,
        },
        "whereConditions": { id: id }
      }
      this.ApiParameter.updatedata('coupon_code', updateData).subscribe((res: any) => {
        
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

    } else if (status == 0) {
      let updateData = {
        "data": {
          "status": 1,
        },
        "whereConditions": { id: id }
      }
      this.ApiParameter.updatedata('coupon_code', updateData).subscribe((res: any) => {
        
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
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


}
