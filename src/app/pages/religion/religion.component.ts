import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.scss']
})
export class ReligionComponent implements OnInit {

  religion = new FormGroup({
    religion_name : new FormControl('',[Validators.required])
  })
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  public() {

    if (this.religion.valid) {


      var updateData={
        "data":{
          "religion_name":this.religion.value.religion_name,
          "religion_date_time":moment().toISOString()
        },
        
      }

      this.ApiParameter.savedata('religion',updateData).subscribe((res: any) => {
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
        text: 'Please Enter Religion Name'
      })
    }
   
  }
  getAllData() {
    this.ApiParameter.fetchdata('religion', { "projection": ["*"] }).subscribe((res: any) => {
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
