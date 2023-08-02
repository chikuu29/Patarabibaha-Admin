import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annualincome',
  templateUrl: './annualincome.component.html',
  styleUrls: ['./annualincome.component.scss']
})
export class AnnualincomeComponent implements OnInit {
  searchincome: any;
  allannualincome: any;
  annualincome = new FormGroup({
    incomeamount: new FormControl('')
  });
  routerdata: any = '';
  constructor(
    private api: ApiService,
    private Arouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.Arouter.params.subscribe((res: any) => {
    //   if(res.id == ''){

    //   }else{
    //     this.routerdata = res.id;
    //     this.selectaftereditclick();
    //   }
      
    // })
    this.getAllAnnualIncome();
  }

  selectaftereditclick() {
    let param = {
      'status': 27,
      'id': this.routerdata
    }
    this.api.annualincome(param).subscribe((res: any) => {
      if (res.status) {
        this.annualincome = new FormGroup({
          incomeamount: new FormControl(res.message[0].annualincome)
        });
      }
    })
  }

  insert() {
    if (this.annualincome.value.incomeamount == '') {
      Swal.fire({
        icon: 'error',
        text: "Income Shouldn't Blank!"
      });
    } else if (this.routerdata == '') {
      let param = {
        'status': 25,
        'annualincome': this.annualincome.value.incomeamount
      }
      this.api.annualincome(param).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          Swal.fire({
            icon: 'success',
            text: res.message
          }).then((resd: any) => {
            this.ngOnInit();
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: res.message
          });
        }

      });

    } 
    else if (this.routerdata != '') {
      let param = {
        'status': 26,
        'id': this.routerdata,
        'annualincome':this.annualincome.value.incomeamount
      }
      this.api.annualincome(param).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          Swal.fire({
            icon: 'success',
            text: res.message
          }).then((resd: any) => {
            this.ngOnInit();
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: res.message
          });
        }

      });
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
    this.routerdata = data;
    this.selectaftereditclick();
    document.getElementById('inlineFormInputName2')?.focus();
   
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

  }


}
