import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-mothertongue',
  templateUrl: './mothertongue.component.html',
  styleUrls: ['./mothertongue.component.scss']
})
export class MothertongueComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI; 
  mothertongue = new FormGroup({
    mother_tongue_name: new FormControl('', [Validators.required])
  });
  filterText:any
  tabledata: any;
  originaldata: any;
  action: any = 'Submit';
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.mothertongue = new FormGroup({
      mother_tongue_name: new FormControl('')
    })
    this.getAllData();
    this.action = 'Submit';
  }
  public() {

    if (this.mothertongue.valid) {

      if (this.action == 'Submit') {

        var updateData = {
          "data": {
            "mother_tongue_name": this.mothertongue.value.mother_tongue_name,
            "mother_tongue_date_and_time": moment().toISOString()
          },

        }

        this.ApiParameter.savedata('mother_tongue', updateData).subscribe((res: any) => {
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
      }else{
        var updateData1 = {
          "data": {
            "mother_tongue_name": this.mothertongue.value.mother_tongue_name,
          },
          "whereConditions":{id:this.originaldata[0].id}
        }
        console.log(updateData1);
        

        this.ApiParameter.updatedata('mother_tongue', updateData1).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: res.message
            }).then((ress: any) => {
             this.ngOnInit();
            });
          } else {
            Swal.fire({
              icon: 'success',
              text: res.message
            });
          }
        })
      }


    } else {
      Swal.fire({
        icon: 'error',
        text: 'Please Enter Mother Tongue Name'
      })
    }

  }
  getAllData() {
    this.ApiParameter.fetchdata('mother_tongue', { "projection": ["*"] }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success) {
        //this.privacypalicy.patchValue(res['data'][0])
        this.tabledata = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })

  }
  update(data: any) {
    this.ApiParameter.fetchdata('mother_tongue', { "projection": ["*"] }).subscribe((res: any) => {
      // console.log(res['data'][0]);
      this.action = 'Update';
      if (res.success) {
        this.tabledata = res['data'];

        this.originaldata = this.tabledata.filter((num: any) => {
          return (num.id == data) ? num : null;
        })

        this.mothertongue.patchValue(this.originaldata[0]);





      }
    })
  }
  deleted(data:any){
    //console.log(id);
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('mother_tongue', { "whereConditions": { id: data } }).subscribe((res: any) => {
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
      this.ApiParameter.updatedata('mother_tongue', updateData).subscribe((res: any) => {
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
      this.ApiParameter.updatedata('mother_tongue', updateData).subscribe((res: any) => {
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
