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
  button: any = 'ADD';
  countryOption: any

  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.stategroup = new FormGroup({
      id: new FormControl('', []),
      country_name: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])
    });
    this.button = 'ADD';
    this.showCountry();
    this.ApiParameter.fetchdata('state', { "projection": ["*"] }).subscribe((res: any) => {


      if (res.success && res['data'].length > 0) {
        this.statealldata = res['data'];
      }
    })

  }


  showCountry() {
    this.ApiParameter.fetchdata('country', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {

        this.countryOption = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.name };
          } else {
            return null
          }
        });
        console.log(this.countryOption);

      }
    });
  }

  adddata() {
    if (this.button == 'ADD') {
     if (this.stategroup.valid) {
      let updateData = {
        "data": {
          "country_name": this.stategroup.value.country_name,
          "name": this.stategroup.value.name,
          "created_At": moment().toISOString()
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
      
     } else {
      // Swal.fire('Please Enter All Fields','success','success')
      Swal.fire({
        icon: 'warning',
        text: "Please Enter All Fields"
      });
     }

    } else if (this.button == 'Update') {
      if (this.stategroup.valid) {
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


  

  edit(id: any) {
    this.ApiParameter.fetchdata('state', { "projection": ["*"], "whereConditions": { id: id } }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success && res['data'].length > 0) {
        this.stategroup.patchValue(res['data'][0]);
        this.button = 'Update';

      }
    })
  }




}
