import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  insert = 1;
  privacypalicy = new FormGroup({
    id: new FormControl('', []),
    contact_us_content: new FormControl('', [Validators.required])
  });
  allData :any;
  updateddata: any = [];
  data: any;
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
      this. getAllData();
  }
  public() {

    if (this.privacypalicy.valid) {


      var updateData={
        "data":{
          "contact_us_content":this.privacypalicy.value.contact_us_content,
          "contact_us_date_time":moment().toISOString()
        },
        "whereConditions": { id: this.privacypalicy.value.id }
      }

      this.ApiParameter.updatedata('contactus',updateData).subscribe((res: any) => {
        
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
        text: 'Please Enter Your Contact Us'
      })
    }
   
  }
  getAllData() {
    this.ApiParameter.fetchdata('contactus', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.privacypalicy.patchValue(res['data'][0])
      }
    })
  }

}
