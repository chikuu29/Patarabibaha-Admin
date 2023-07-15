import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prifixid',
  templateUrl: './prifixid.component.html',
  styleUrls: ['./prifixid.component.scss']
})
export class PrifixidComponent implements OnInit {
  prifixgroup = new FormGroup({
    prefix_id_name: new FormControl('', [Validators.required]),
  });
  constructor(
    private ApiParameter: ApiParameterScript,
    private _Auth: AuthService
  ) { }

  ngOnInit(): void {
    this.fatchdata();
    // console.log(this._Auth.getAuthStatus());
  }
  addCountry() {
    if (this.prifixgroup.valid) {
      let updateData = {
        "data": {
          "prefix_id_name": this.prifixgroup.value.prefix_id_name,
          "time_stamp": moment().toISOString(),
          "last_change_by": "Admin"
        },
        "whereConditions": { id: 1 }
      }
      this.ApiParameter.updatedata('prefix_id', updateData).subscribe((res: any) => {
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
    }else{
      Swal.fire({
        icon:'error',
        text:'Enter Every fild'
      })
    }
  }
  reset() {
    this.prifixgroup = new FormGroup({
      prefix_id_name: new FormControl('', [Validators.required]),
    });
  }

  fatchdata(){
    this.ApiParameter.fetchdata('prefix_id', { "projection": ["*"], "whereConditions": { id: 1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        // this.countryalldata = res['data'];
        this.prifixgroup.patchValue(res['data'][0]);

      }
    });
  }

}
