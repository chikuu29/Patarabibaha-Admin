import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent implements OnInit {

  privacyPolicyForm = new FormGroup({
    id: new FormControl('', []),
    privacy_policy_content: new FormControl('', [Validators.required])
  });
  allData: any;
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

    if (this.privacyPolicyForm.valid) {


      var updateData={
        "data":{
          "privacy_policy_content":this.privacyPolicyForm.value.privacy_policy_content,
          "privacy_policy_created_time":moment().toISOString()
        },
        "whereConditions": { id: this.privacyPolicyForm.value.id }
      }

      this.ApiParameter.updatedata('privacy_policy',updateData).subscribe((res: any) => {
        
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
        text: 'Please Enter Your Privacy Policy'
      })
    }
   
  }
  getAllData() {


    this.ApiParameter.fetchdata('privacy_policy', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.privacyPolicyForm.patchValue(res['data'][0])
      }


    })

  }



}
