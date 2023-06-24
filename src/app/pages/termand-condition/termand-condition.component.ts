import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-termand-condition',
  templateUrl: './termand-condition.component.html',
  styleUrls: ['./termand-condition.component.scss']
})
export class TermandConditionComponent implements OnInit {

  insert = 1;
  termand_condition_Form = new FormGroup({
    id: new FormControl('', []),
    termand_condition_content: new FormControl('', [Validators.required])
  });
  allData :any;
  updateddata: any = [];
  data: any;
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.ApiParameter.fetchdata('termand_condition', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.termand_condition_Form.patchValue(res['data'][0])
      }


    })
  }


  public() {

    if (this.termand_condition_Form.valid) {


      var updateData={
        "data":{
          "termand_condition_content":this.termand_condition_Form.value.termand_condition_content,
          "termand_condition_date_time":moment().toISOString()
        },
        "whereConditions": { id: this.termand_condition_Form.value.id }
      }

      this.ApiParameter.updatedata('termand_condition',updateData).subscribe((res: any) => {
        console.log(res);
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

}
