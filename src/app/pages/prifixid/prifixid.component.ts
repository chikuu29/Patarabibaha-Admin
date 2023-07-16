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
  }
  update() {
    if (this.prifixgroup.valid) {
      let updateData = {
        "data": {
          "prefix_id_name": this.prifixgroup.value.prefix_id_name,
          "created_At": moment().toISOString(),
          "last_change_by": "Admin"
        },
        "whereConditions": { id: 1 }
      }
      this.ApiParameter.updatedata('prefix_id', updateData).subscribe((res: any) => {
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
        text:'Fill All The Fields'
      })
    }
  }
  reset() {
    this.prifixgroup.reset()
  }

  fatchdata(){
    this.ApiParameter.fetchdata('prefix_id', { "projection": ["*"], "whereConditions": { id: 1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.prifixgroup.patchValue(res['data'][0]);
      }
    });
  }

}
