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
    id: new FormControl('', []),
    country_name: new FormControl('', [Validators.required]),
    state_name: new FormControl('', [Validators.required]),
    city_name: new FormControl('', [Validators.required])
  });
  button: any = 'ADD';
  countryalldata: any;
  allcitydata: any;
  statealldatabycountry: any;
  countryOption: any;
  stateOption: any;
  filterText:string;
  collectionSize: number = 0
  page: number = 1
  totalCount: number = 0
  totalFetchrecord:number = 0
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript,
    private ApiParameterScript: ApiParameterScript
  ) { }

  ngOnInit(): void {

    this.citygroup = new FormGroup({
      id: new FormControl('',),
      country_name: new FormControl(''),
      state_name: new FormControl(''),
      city_name: new FormControl('')
    });

    this.button = 'ADD';
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
    this.getcountryname();
    this.fatchdata();


  }



  getSearchText(event:any){
    console.log(event);

    this.filterText = event
  }
  
  onpageChnage(){
    this.fatchdata();
  }

  getstatefilter(country_name: any) {
    console.log(country_name);
    this.ApiParameter.fetchdata('state', { "projection": ["*"], "whereConditions": { "country_name": country_name, "status": 1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {

        this.stateOption = res['data'].map((obj: any) => {

          return { name: obj.name };

        });
        console.log(this.countryOption);

      } else {
        this.stateOption = []
      }

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
    if (this.button == 'ADD') {

      if (this.citygroup.valid) {


        let updateData = {
          "data": {
            "country_name": this.citygroup.value.country_name,
            "state_name": this.citygroup.value.state_name,
            "city_name": this.citygroup.value.city_name,
            "created_At": moment().toISOString()
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
              icon: 'error',
              text: res.message
            });
          }
        })


      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter All Your Data'
        })
      }
    } else if (this.button == 'Update') {
      if (this.citygroup.valid) {
        let updateData = {
          "data": {
            "country_name": this.citygroup.value.country_name,
            "state_name": this.citygroup.value.state_name,
            "city_name": this.citygroup.value.city_name,
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
              icon: 'warning',
              text: res.message
            });
          }
        })


      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter All Your Data'
        })
      }
    }
  }
  fatchdata() {
    let offset = this.page * 10 - 10
    this.ApiParameter.fetchdata('city', { "projection": ["*"] },offset, 10).subscribe((res: any) => {
      // console.log(res['data'][0]);
      this.totalFetchrecord = offset+res['count']
      this.totalCount = res['totalCount']
      this.collectionSize = res['totalCount']
      if (res.success && res['data'].length > 0) {
        this.allcitydata = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })
  }




  edit(id: any) {
    this.ApiParameter.fetchdata('city', { "projection": ["*"], "whereConditions": { id: id } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        // this.countryalldata = res['data'];
        this.getstatefilter(res['data'][0]['country_name'])
        this.citygroup.patchValue(res['data'][0]);
        this.button = "Update";
        // console.log(this.city);

      }
    });
  }

  delete(id: any) {
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('city', { "whereConditions": { id: id } }).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.success) {
        Swal.fire('Success', res.message, 'success').then(() => {
          this.ngOnInit()
        });
      } else {
        Swal.fire('Error', res.message, 'error')
      }
    });
  }

}
