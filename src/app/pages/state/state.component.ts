import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  stategroup = new FormGroup({
    id: new FormControl('', []),
    country_name: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  })
  state: any;
  countryalldata: any;
  countryid: any;
  statealldata: any;
  button: any = 'Submit';

  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.stategroup = new FormGroup({
      id: new FormControl('', []),
      country_name: new FormControl('0', [Validators.required]),
      name: new FormControl('', [Validators.required])
    });
    this.button = 'Submit';
    this.showCountry();
    this.fatchdata();

  }


  showCountry() {
    this.ApiParameter.fetchdata('country', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.countryalldata = res['data'];
      }
    });
  }

  adddata() {
    if (this.button == 'Submit') {
      if (this.stategroup.value.country_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select a Country name',
        });
      } else if (this.stategroup.value.name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter  state name',
        });
      } else {

        let updateData = {
          "data": {
            "country_name": this.stategroup.value.country_name,
            "name": this.stategroup.value.name,
            "time_stamp": moment().toISOString()
          },
        }

        this.ApiParameter.savedata('state', updateData).subscribe((res: any) => {
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
      if (this.stategroup.value.country_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select a Country name',
        });
      } else if (this.stategroup.value.name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter  state name',
        });
      } else {

        let updateData = {
          "data": {
            "country_name": this.stategroup.value.country_name,
            "name": this.stategroup.value.name,
          },
          "whereConditions": { id: this.stategroup.value.id }
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

  fatchdata() {
    this.ApiParameter.fetchdata('state', { "projection": ["*"] }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success && res['data'].length > 0) {
        this.statealldata = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })
  }

  updatestate(id: any) {
    this.ApiParameter.fetchdata('state', { "projection": ["*"], "whereConditions": { id: id } }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success && res['data'].length > 0) {
        this.stategroup.patchValue(res['data'][0]);
        this.button = 'Update';

      }
    })
  }




}
