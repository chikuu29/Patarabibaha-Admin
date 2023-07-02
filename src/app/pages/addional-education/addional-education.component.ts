import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addional-education',
  templateUrl: './addional-education.component.html',
  styleUrls: ['./addional-education.component.scss']
})
export class AddionalEducationComponent implements OnInit {

  additionaleducation = new FormGroup({
    additional_education_name : new FormControl('',[Validators.required])
  })
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  public() {

    if (this.additionaleducation.valid) {


      var updateData={
        "data":{
          "additional_education_name":this.additionaleducation.value.additional_education_name,
          "additional_education_date_time":moment().toISOString()
        },
        
      }

      this.ApiParameter.savedata('additional_education',updateData).subscribe((res: any) => {
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
        text: 'Please Enter Additional Education Name'
      })
    }
   
  }
  getAllData() {
    this.ApiParameter.fetchdata('additional_education', { "projection": ["*"] }).subscribe((res: any) => {
     // console.log(res['data'][0]);
      
      if (res.success) {
        //this.privacypalicy.patchValue(res['data'][0])
        this.tabledata = res['data'];
       // console.log(this.privacypalicy.patchValue(res['data'][0]));
        
      }
    })

  }
  update(data:any){

  }

}
