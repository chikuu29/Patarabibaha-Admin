import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-highest-education',
  templateUrl: './highest-education.component.html',
  styleUrls: ['./highest-education.component.scss']
})
export class HighestEducationComponent implements OnInit {

  highesteducation = new FormGroup({
    highest_education_name : new FormControl('',[Validators.required])
  })
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  public() {

    if (this.highesteducation.valid) {
      var updateData={
        "data":{
          "highest_education_name":this.highesteducation.value.highest_education_name,
          "highest_education_date_time":moment().toISOString()
        },
        
      }

      this.ApiParameter.savedata('highest_education',updateData).subscribe((res: any) => {
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
        text: 'Please Enter Highest Education Name'
      })
    }
   
  }
  getAllData() {
    this.ApiParameter.fetchdata('highest_education', { "projection": ["*"] }).subscribe((res: any) => {
     // console.log(res['data'][0]);
      if (res.success) {
        //this.privacypalicy.patchValue(res['data'][0])
        this.tabledata = res['data'];
      }
    })

  }
  update(data:any){

  }

}
