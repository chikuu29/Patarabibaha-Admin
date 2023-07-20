import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************

  citygroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    country_name: new FormControl('', [Validators.required]),
    state_name: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  });
  button: any = 'Submit';
  countryalldata: any;
  allcitydata: any;
  statealldatabycountry: any;
  countryOption:any;
  stateOption:any;
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.citygroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      country_name: new FormControl('0', [Validators.required]),
      state_name: new FormControl('0', [Validators.required]),
      name: new FormControl('', [Validators.required])
    });
    this.button = 'Submit';
    this.getcountryname();
    this.fatchdata();
    this.showCountry();
    this.showState();
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
  showState() {
    this.ApiParameter.fetchdata('state', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {

        this.stateOption = res['data'].map((obj: any) => {
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
  getstatefilter(){
    this.stateOption.filter((data:any)=>{
      //if(data.)
      
    });
  }

  getcountryname() {

    this.ApiParameter.fetchdata('country', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.countryalldata = res['data'];
        console.log(this.countryalldata);

      }


    })
  }
  getstate() {
    this.ApiParameter.fetchdata('state', { "projection": ["*"], "whereConditions": { country_name: this.citygroup.value.country_name } }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.statealldatabycountry = res['data'];
        console.log(this.statealldatabycountry);

      }


    })
  }

  adddata() {
    if (this.button == 'Submit') {
      if (this.citygroup.value.country_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select country'
        });

      } else if (this.citygroup.value.state_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select state'
        });
      } else if (this.citygroup.value.name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter city name'
        });
      } else {
        let updateData = {
          "data": {
            "country_name": this.citygroup.value.country_name,
            "state_name": this.citygroup.value.state_name,
            "name": this.citygroup.value.name,
            "time_stamp": moment().toISOString()
          },
        }

        this.ApiParameter.savedata('city', updateData).subscribe((res: any) => {
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
    }else if(this.button == 'Update'){
      if (this.citygroup.value.country_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select country'
        });

      } else if (this.citygroup.value.state_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select state'
        });
      } else if (this.citygroup.value.name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter city name'
        });
      } else {
        let updateData = {
          "data": {
            "country_name": this.citygroup.value.country_name,
            "state_name": this.citygroup.value.state_name,
            "name": this.citygroup.value.name,
          },
          "whereConditions": { id: this.citygroup.value.id }
        }

        this.ApiParameter.updatedata('city', updateData).subscribe((res: any) => {
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
    }
  }
  fatchdata() {
    this.ApiParameter.fetchdata('city', { "projection": ["*"] }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success && res['data'].length > 0) {
        this.allcitydata = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })
  }
  update(id:any){
    this.ApiParameter.fetchdata('city', { "projection": ["*"], "whereConditions": { id: id } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.citygroup.patchValue(res['data'][0]);
        this.button = 'Update';

      }
    })
  }

}
