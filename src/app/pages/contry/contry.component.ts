import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contry',
  templateUrl: './contry.component.html',
  styleUrls: ['./contry.component.scss']
})
export class ContryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  countrygroup = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required])
  });
  filterText:any;
  country: any;
  countryalldata: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];
  button: any = 'ADD';
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.showCountry();
    this.button = 'ADD';
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  //   showFilterData(){

  //     this.ApiParameter.fetchdata('country', { "projection": ["*"] }).subscribe((res: any) => {
  //       if (res.success && res['data'].length > 0) {
  //         this.countryalldata = res['data'][0];
  //        console.log(this.countryalldata);
  //       }
  //     });
  //  }
  // // alert(this.country);
  //   let param = {
  //     'country':this.country,
  //     'status':22,
  //   }
  //   this.api.insertCountry(param).subscribe((res:any)=>{
  //       if(res.status){
  //         this.countryalldata = res.message
  //       }
  //   })


  addCountry() {
    if (this.button == 'ADD') {

      if (this.countrygroup.valid) {


        let updateData = {
          "data": {
            "name": this.countrygroup.value.name,
            "created_At": moment().toISOString()
          },
        }

        this.ApiParameter.savedata('country', updateData).subscribe((res: any) => {
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
    } else if (this.button == 'Update') {
      if (this.countrygroup.valid) {
        let updateData = {
          "data": {
            "name": this.countrygroup.value.name,
            "created_At": moment().toISOString()
          },
          "whereConditions": { id: this.countrygroup.value.id }
        }
        this.ApiParameter.updatedata('country', updateData).subscribe((res: any) => {
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

  showCountry() {
    this.ApiParameter.fetchdata('country', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.countryalldata = res['data'];
        console.log(this.countryalldata);
      }else{
        this.countryalldata=[]
      }
    });
  }
  update(id: any) {


    this.ApiParameter.fetchdata('country', { "projection": ["*"], "whereConditions": { id: id } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        // this.countryalldata = res['data'];
        this.countrygroup.patchValue(res['data'][0]);
        this.button = "Update";
        console.log(this.countrygroup);

      }
    });





  }

  delete(id: any ,name:any) {
    console.log(id);

    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('country', { "whereConditions": { id: id } }).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.success) {
        this.ApiParameter.deletedata('state', { "whereConditions": { country_name: name } }).subscribe((res: any) => { 

          if (res.success) {

            this.ApiParameter.deletedata('city', { "whereConditions": { country_name: name } }).subscribe((res: any) => { 
              if (res.success) {
                Swal.fire('Success', res.message, 'success').then(() => {
                  this.ngOnInit()
                });

              }
            });

           
          }

        
      });
      } else {
        Swal.fire('Error', res.message, 'error')
      }
    });
  }

}