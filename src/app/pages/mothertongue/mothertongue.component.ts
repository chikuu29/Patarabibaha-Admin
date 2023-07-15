import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mothertongue',
  templateUrl: './mothertongue.component.html',
  styleUrls: ['./mothertongue.component.scss']
})
export class MothertongueComponent implements OnInit {
  mothertongue = new FormGroup({
    mother_tongue_name: new FormControl('', [Validators.required])
  })
  tabledata: any;
  originaldata: any;
  action: any = 'Submit';
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getAllData();
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
             location.reload();
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

}
