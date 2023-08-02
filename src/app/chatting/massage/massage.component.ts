import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.scss']
})
export class MassageComponent implements OnInit {
  cahting = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
  });
  button: any = 'ADD';
  massagedata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.cahting = new FormGroup({
      id:new FormControl(''),
      name: new FormControl('', [Validators.required]),
    });
    this.fatchhdata();
  }

  addMessage() {
    if (this.button == 'ADD') {
      if (this.cahting.valid) {
        let updateData = {
          "data": {
            "name": this.cahting.value.name,
            "created_At": moment().toISOString()
          },
        }
        this.ApiParameter.savedata('message', updateData).subscribe((res: any) => {
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
    } else if (this.button = 'UPDATE') {
      if (this.cahting.valid) {
        let updateData = {
          "data": {
            "name": this.cahting.value.name,
          },
          "whereConditions": { id: this.cahting.value.id }
        }
        this.ApiParameter.updatedata('message', updateData).subscribe((res: any) => {
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

  fatchhdata() {
    this.ApiParameter.fetchdata('message', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.massagedata = res['data'];
        //console.log(this.statealldatabycountry);

      }


    })
  }
  update(data: any) {
    this.ApiParameter.fetchdata('message', { "projection": ["*"], "whereConditions": { id: data } }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.button = 'UPDATE'
        this.cahting.patchValue(res['data'][0]);
        //console.log(this.statealldatabycountry);

      }


    })
  }

}
