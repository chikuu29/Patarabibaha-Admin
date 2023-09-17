import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from 'moment';

@Component({
  selector: 'app-annualincome',
  templateUrl: './annualincome.component.html',
  styleUrls: ['./annualincome.component.scss']
})
export class AnnualincomeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  searchincome: any;
  allannualincome: any;
  button:any = "ADD";
  filterText:any;
  annualincome = new FormGroup({
    id: new FormControl(''),
    annualincome: new FormControl('',[Validators.required])
  });
  routerdata: any = '';
  constructor(
    private api: ApiService,
    private Arouter: ActivatedRoute,
    private router: Router,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.annualincome = new FormGroup({
      id: new FormControl(''),
      annualincome: new FormControl('')
    });
    this.button='ADD'
    this.getAllAnnualIncome();
  }

  // selectaftereditclick() {
  //   let param = {
  //     'status': 27,
  //     'id': this.routerdata
  //   }
  //   this.api.annualincome(param).subscribe((res: any) => {
  //     if (res.status) {
  //       this.annualincome = new FormGroup({
  //         incomeamount: new FormControl(res.message[0].annualincome)
  //       });
  //     }
  //   })
  // }

  insert() {
    if (this.button == 'ADD') {

      if (this.annualincome.valid) {


        let updateData = {
          "data": {
            "annualincome": this.annualincome.value.annualincome,
            "created_At": moment().toISOString()
          },
        }

        this.ApiParameter.savedata('annual_income', updateData).subscribe((res: any) => {
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
      if (this.annualincome.valid) {
        let updateData = {
          "data": {
            "annualincome": this.annualincome.value.annualincome,
            //"created_At": moment().toISOString()
          },
          "whereConditions": { id: this.annualincome.value.id }
        }
        this.ApiParameter.updatedata('annual_income', updateData).subscribe((res: any) => {
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
  getAllAnnualIncome() {
    let param = {
      'status': 23
    }
    this.api.annualincome(param).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.allannualincome = res.message;
      }

    })
  }
  search() {
    let param = {
      'status': 24,
      'annualincome': this.searchincome
    }
    this.api.annualincome(param).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.allannualincome = res.message;
      } else {
        this.allannualincome = []
      }

    })
  }
  update(data: any) {

    this.ApiParameter.fetchdata('annual_income', { "projection": ["*"], "whereConditions": { id: data } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        // this.countryalldata = res['data'];
        this.annualincome.patchValue(res['data'][0]);
        this.button = "Update";
        document.getElementById('inlineFormInputName2')?.focus();
       // console.log(this.countrygroup);

      }
    });
   
    
   
    //this.router.navigate(['/annualincome-page', data])
  }


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  deleted(data:any){
      //console.log(id);
      this.blockUI.start('Deleting...')
      this.ApiParameter.deletedata('annual_income', { "whereConditions": { id: data } }).subscribe((res: any) => {
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

    publish(id:any,status:any){

      if(status == 1){
        let updateData = {
          "data": {
            "status": 0,
          },
          "whereConditions": { id: id }
        }
        this.ApiParameter.updatedata('annual_income', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: "Unpublished"
            }).then(() => {
              this.ngOnInit()
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: res.message
            });
          }
        })

      }else if(status == 0){
        let updateData = {
          "data": {
            "status": 1,
          },
          "whereConditions": { id: id }
        }
        this.ApiParameter.updatedata('annual_income', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: "Published"
            }).then(() => {
              this.ngOnInit()
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: res.message
            });
          }
        })
      }

    }
  


}
