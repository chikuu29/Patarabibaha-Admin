import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gotra',
  templateUrl: './gotra.component.html',
  styleUrls: ['./gotra.component.scss']
})
export class GotraComponent implements OnInit {
  button:any = 'ADD';
  gotragroup = new FormGroup({
    id:new FormControl('',[]),
    name: new FormControl('',[Validators.required]),
  });
  gotraalldata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
   this. showGotra();
  }

  addCountry(){
    if(this.button == 'ADD'){
      if (this.gotragroup.valid) {


        let  updateData = {
          "data": {
            "name": this.gotragroup.value.name,
            "created_At": moment().toISOString()
          },
        }

        this.ApiParameter.savedata('gotra', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: res.message
            }).then((ress: any) => {
              this.gotragroup.value.name = '';
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
          text: 'Please Enter Your Gotra'
        })
      }
    }else if(this.button == 'UPDATE'){
      if (this.gotragroup.valid) {
        let updateData = {
          "data": {
            "name": this.gotragroup.value.name,
            "created_At": moment().toISOString()
          },
          "whereConditions": { id: this.gotragroup.value.id }
        }
        this.ApiParameter.updatedata('gotra', updateData).subscribe((res: any) => {
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


      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter Your Gotra'
        })
      }
    }
  }
  showGotra() {
    this.ApiParameter.fetchdata('gotra', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.gotraalldata = res['data'];
        console.log(this.gotraalldata);
      }
    });
  }
  update(data:any){
    this.ApiParameter.fetchdata('gotra', { "projection": ["*"], "whereConditions": { id: data } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        // this.countryalldata = res['data'];
        this.gotragroup.patchValue(res['data'][0]);
        this.button = "UPDATE";
        //console.log(this.countrygroup);

      }
    });
  }

}
