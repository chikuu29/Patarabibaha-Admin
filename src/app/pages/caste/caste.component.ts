import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-caste',
  templateUrl: './caste.component.html',
  styleUrls: ['./caste.component.scss']
})
export class CasteComponent implements OnInit {

  cast = new FormGroup({
    cast_name : new FormControl('',[Validators.required])
  })
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  public() {

    if (this.cast.valid) {


      var updateData={
        "data":{
          "cast_name":this.cast.value.cast_name,
          "createdon":moment().toISOString()
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
   
  }
  getAllData() {
    this.ApiParameter.fetchdata('cast_table', { "projection": ["*"] }).subscribe((res: any) => {
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
