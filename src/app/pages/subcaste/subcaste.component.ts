import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { offset } from '@popperjs/core';
@Component({
  selector: 'app-subcaste',
  templateUrl: './subcaste.component.html',
  styleUrls: ['./subcaste.component.scss']
})
export class SubcasteComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  subcastgroup = new FormGroup({
    id: new FormControl('',),
    sub_cast_name: new FormControl('', [Validators.required]),
    cast_name: new FormControl('', [Validators.required]),
  });
  filterText:any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }
  button: any = 'Submit';
  castOption: any;
  subcast: any;
  collectionSize: number = 0
  page: number = 1
  totalCount: number = 0
  totalFetchrecord:number = 0
  ngOnInit(): void {
    this.subcastgroup = new FormGroup({
      id: new FormControl(''),
      sub_cast_name: new FormControl(''),
      cast_name: new FormControl('0'),
    })
    this.getcast();
    this.getsubcast();
    this.button = 'Submit';
  }

  getSearchText(event: any) {
    console.log(event);

    this.filterText = event
  }
  onpageChnage(){

    this.getsubcast()
  }
  getcast() {
    this.ApiParameter.fetchdata('cast_table', { "projection": ["*"] }).subscribe((res: any) => {
      
      if (res.success) {
        // this.cast = res['data'];
        // console.log(this.cast);

        this.castOption = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.cast_name };
          } else {
            return null
          }
        });

  
        
      }
    })
  }
  getsubcast() {
    let offset = this.page * 10 - 10
    this.ApiParameter.fetchdata('sub_cast', { "projection": ["*"] },offset,10).subscribe((res: any) => {
      // console.log(res['data'][0]);

      this.totalFetchrecord = offset+res['count']
      this.totalCount = res['totalCount']
      this.collectionSize = res['totalCount']
      if (res.success) {
        this.subcast = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })
  }

  adddata() {
    if (this.button == 'Submit') {
      if (this.subcastgroup.value.cast_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select a cast name',
        });
      } else if (this.subcastgroup.value.sub_cast_name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter  sub cast name',
        });
      } else {
        let updateData = {
          "data": {
            "cast_name": this.subcastgroup.value.cast_name,
            "sub_cast_name": this.subcastgroup.value.sub_cast_name,
            "created_At": moment().toISOString()
          },
        }

        this.ApiParameter.savedata('sub_cast', updateData).subscribe((res: any) => {
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
    } else if (this.button == 'Update') {
      if (this.subcastgroup.value.cast_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select a Country name',
        });
      } else if (this.subcastgroup.value.sub_cast_name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter  state name',
        });
      } else {

        let updateData = {
          "data": {
            "cast_name": this.subcastgroup.value.cast_name,
            "sub_cast_name": this.subcastgroup.value.sub_cast_name,
          },
          "whereConditions": { id: this.subcastgroup.value.id }
        }

        this.ApiParameter.updatedata('sub_cast', updateData).subscribe((res: any) => {
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
    }
  }

  edit(id: any) {
    this.ApiParameter.fetchdata('sub_cast', { "projection": ["*"], "whereConditions": { id: id } }).subscribe((res: any) => {
       console.log(res['data'][0]);

      if (res.success && res['data'].length > 0) {
        this.subcastgroup.patchValue(res['data'][0]);
        this.button = 'Update';

      }
    })
  }

  deleted(data:any){
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('sub_cast', { "whereConditions": { id: data } }).subscribe((res: any) => {
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
      this.ApiParameter.updatedata('sub_cast', updateData).subscribe((res: any) => {
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
    } else if (status == 0) {
      let updateData = {
        "data": {
          "status": 1,
        },
        "whereConditions": { id: id }
      }
      this.ApiParameter.updatedata('sub_cast', updateData).subscribe((res: any) => {
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
