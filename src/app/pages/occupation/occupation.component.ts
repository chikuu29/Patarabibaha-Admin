import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss']
})
export class OccupationComponent implements OnInit {

  occupation = new FormGroup({
    occupation_name : new FormControl('',[Validators.required])
  })
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  public() {

    if (this.occupation.valid) {


      var updateData={
        "data":{
          "occupation_name":this.occupation.value.occupation_name,
          "occupation_date_time":moment().toISOString()
        },
        
      }

      this.ApiParameter.savedata('occupation',updateData).subscribe((res: any) => {
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
        text: 'Please Enter Occupation Name'
      })
    }
   
  }
  getAllData() {
    this.ApiParameter.fetchdata('occupation', { "projection": ["*"] }).subscribe((res: any) => {
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
