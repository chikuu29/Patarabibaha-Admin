import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employredin',
  templateUrl: './employredin.component.html',
  styleUrls: ['./employredin.component.scss']
})
export class EmployredinComponent implements OnInit {

  Employer = new FormGroup({
    Employer_in_name : new FormControl('',[Validators.required])
  })
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  public() {

    if (this.Employer.valid) {


      var updateData={
        "data":{
          "Employer_in_name":this.Employer.value.Employer_in_name,
          "Employer_in_date_time":moment().toISOString()
        },
        
      }

      this.ApiParameter.savedata('employer_in',updateData).subscribe((res: any) => {
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
  update(data:any){

  }

}
