import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { offset } from '@popperjs/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  stategroup = new FormGroup({
    id: new FormControl('', []),
    country_name: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  });
  filterText:any;
  state: any;
  countryalldata: any;
  countryid: any;
  statealldata: any;
  button: any = 'ADD';
  countryOption: any
  collectionSize: number = 0
  page: number = 1
  totalCount: number = 0
  totalFetchrecord:number = 0

  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.stategroup = new FormGroup({
      id: new FormControl('', []),
      country_name: new FormControl(''),
      name: new FormControl('')
    });
    this.button = 'ADD';
    this.showCountry();
    this.ApiParameter.fetchdata('state', { "projection": ["*"] }).subscribe((res: any) => {


      if (res.success && res['data'].length > 0) {
        this.statealldata = res['data'];
      }
    })

  }

  getSearchText(event: any) {
    console.log(event);

    this.filterText = event
  }
  onpageChnage(){

  }

  showCountry() {
    let offset = this.page * 10 - 10
    this.ApiParameter.fetchdata('country', { "projection": ["*"] },offset,10).subscribe((res: any) => {
      this.totalFetchrecord = offset+res['count']
      this.totalCount = res['totalCount']
      this.collectionSize = res['totalCount']
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
            icon: 'error',
            text: res.message
          });
        }
      });

     } else {
      // Swal.fire('Please Enter All Fields','success','success')
      Swal.fire({
        icon: 'error',
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
              icon: 'error',
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


  delete(id: any ,name:any) {
    //console.log(id);

    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('state', { "whereConditions": { id: id } }).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.success) {
        this.ApiParameter.deletedata('city', { "whereConditions": { state_name: name } }).subscribe((res: any) => {

          if (res.success) {


                Swal.fire('Success', res.message, 'success').then(() => {
                  this.ngOnInit()
                });




          }


      });


      } else {
        Swal.fire('Error', res.message, 'error')
      }
    });
  }




}
