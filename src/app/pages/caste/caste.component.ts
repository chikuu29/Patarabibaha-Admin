import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-caste',
  templateUrl: './caste.component.html',
  styleUrls: ['./caste.component.scss']
})
export class CasteComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  button:any = 'Submit';
  filterText:any;
  collectionSize: number = 0
  page: number = 1
  totalCount: number = 0
  totalFetchrecord:number = 0
  cast = new FormGroup({
    id: new FormControl(''),
    cast_name : new FormControl('',[Validators.required])
  })
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.cast = new FormGroup({
      id: new FormControl(''),
      cast_name : new FormControl('')
    });
    this.button = 'Submit';
    this.getAllData();
  }

  getSearchText(event: any) {
    console.log(event);

    this.filterText = event
  }
  onpageChnage(){
    this.getAllData()
  }
  public() {
    if(this.button == 'Submit'){
    if (this.cast.valid) {
      var updateData={
        "data":{
          "cast_name":this.cast.value.cast_name,
          "created_At":moment().toISOString()
        },
      }
      this.ApiParameter.savedata('cast_table',updateData).subscribe((res: any) => {
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
      })

     
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Please Enter Mother Tongue Name'
      })
    }
  }else if(this.button == 'Update'){
    if (this.cast.valid) {
      let updateData={
        "data":{
          "cast_name":this.cast.value.cast_name,
        },
        "whereConditions": { id: this.cast.value.id }
      }
      this.ApiParameter.updatedata('cast_table',updateData).subscribe((res: any) => {
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
      })

     
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Please Enter Mother Tongue Name'
      })
    }
  }
  }
  getAllData() {
    let offset = this.page * 10 - 10
    this.ApiParameter.fetchdata('cast_table', { "projection": ["*"] }).subscribe((res: any) => {
      this.totalFetchrecord = offset+res['count']
      this.totalCount = res['totalCount']
      this.collectionSize = res['totalCount']
      if (res.success) {
        this.tabledata = res['data'];
      }
    })
  }
  update(data:any){
    this.ApiParameter.fetchdata('cast_table', { "projection": ["*"], "whereConditions": { id: data } }).subscribe((res: any) => {
      // console.log(res['data'][0]);
      
      if (res.success) {
        this.button = 'Update';
        this.cast.patchValue(res['data'][0]);
      }
    })
  }
  deleted(data:any){
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('cast_table', { "whereConditions": { id: data } }).subscribe((res: any) => {
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
      this.ApiParameter.updatedata('cast_table', updateData).subscribe((res: any) => {
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
      this.ApiParameter.updatedata('cast_table', updateData).subscribe((res: any) => {
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
