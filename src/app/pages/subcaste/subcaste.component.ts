import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcaste',
  templateUrl: './subcaste.component.html',
  styleUrls: ['./subcaste.component.scss']
})
export class SubcasteComponent implements OnInit {
  subcastgroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    sub_cast_name: new FormControl('', [Validators.required]),
    cast_name: new FormControl('', [Validators.required]),
  })
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }
  button: any = 'Submit';
  cast: any;
  subcast: any;
  ngOnInit(): void {
    this.subcastgroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      sub_cast_name: new FormControl('', [Validators.required]),
      cast_name: new FormControl('0', [Validators.required]),
    })
    this.getcast();
    this.getsubcast();
    this.button = 'Submit';
  }
  getcast() {
    this.ApiParameter.fetchdata('cast_table', { "projection": ["*"] }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success && res['data'].length > 0) {
        this.cast = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })
  }
  getsubcast() {
    this.ApiParameter.fetchdata('sub_cast', { "projection": ["*"] }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success && res['data'].length > 0) {
        this.subcast = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })
  }

  adddata() {
    if (this.button == 'Submit') {
      if (this.subcastgroup.value.cast_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select a cast name',
        });
      } else if (this.subcastgroup.value.sub_cast_name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter  sub cast name',
        });
      } else {
        let updateData = {
          "data": {
            "cast_name": this.subcastgroup.value.cast_name,
            "sub_cast_name": this.subcastgroup.value.sub_cast_name,
            "createdon": moment().toISOString()
          },
        }

        this.ApiParameter.savedata('sub_cast', updateData).subscribe((res: any) => {
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
        });

      }
    } else if (this.button == 'Update') {
      if (this.subcastgroup.value.cast_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select a Country name',
        });
      } else if (this.subcastgroup.value.sub_cast_name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter  state name',
        });
      } else {

        let updateData = {
          "data": {
            "cast_name": this.subcastgroup.value.cast_name,
            "name": this.subcastgroup.value.sub_cast_name,
          },
          "whereConditions": { id: this.subcastgroup.value.id }
        }

        this.ApiParameter.updatedata('state', updateData).subscribe((res: any) => {
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
        });
      }
    }
  }

  updatestate(id: any) {
    this.ApiParameter.fetchdata('sub_cast', { "projection": ["*"], "whereConditions": { id: id } }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success && res['data'].length > 0) {
        this.subcastgroup.patchValue(res['data'][0]);
        this.button = 'Update';

      }
    })
  }

}
