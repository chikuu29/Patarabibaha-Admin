import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import * as moment from 'moment';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  insert = 1;
  privacypalicy = new FormGroup({
    id: new FormControl('', []),
    about_us_content: new FormControl('', [Validators.required])
  });
  allData :any;
  updateddata: any = [];
  data: any;
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
   
      this.getAllData();
  
      
  }
  public() {

    if (this.privacypalicy.valid) {


      var updateData={
        "data":{
          "about_us_content":this.privacypalicy.value.about_us_content,
          "about_us_date_time":moment().toISOString()
        },
        "whereConditions": { id: this.privacypalicy.value.id }
      }

      this.ApiParameter.updatedata('about_us',updateData).subscribe((res: any) => {
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
        text: 'Please Enter Your About Us'
      })
    }
   
  }
  getAllData() {
    this.ApiParameter.fetchdata('about_us', { "projection": ["*"] }).subscribe((res: any) => {
     // console.log(res['data'][0]);
      
      if (res.success && res['data'].length > 0) {
        this.privacypalicy.patchValue(res['data'][0])
       // console.log(this.privacypalicy.patchValue(res['data'][0]));
        
      }
    })

  }

  
 
}
