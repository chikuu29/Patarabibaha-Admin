import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from 'moment';
import { offset } from '@popperjs/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-annualincome',
  templateUrl: './annualincome.component.html',
  styleUrls: ['./annualincome.component.scss'],
})
export class AnnualincomeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  searchincome: any;
  allannualincome: any;
  button: any = 'ADD';
  filterText: any;
  collectionSize: number = 0;
  page: number = 1;
  totalCount: number = 0;
  totalFetchrecord: number = 0;
  alldata: any;
  tableData: any = [];
  allId: any[] = [];
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getAllAnnualIncome';
  totalDataCount: number = 0;
  annualincome = new FormGroup({
    id: new FormControl(''),
    annualincome: new FormControl(Number(), [Validators.required]),
    annualincome_text: new FormControl('', [Validators.required]),
    amount: new FormControl(Number(), [Validators.required]),
  });
  routerdata: any = '';
  editedcast: any;
  constructor(
    private api: ApiService,
    private Arouter: ActivatedRoute,
    private router: Router,
    private CommonService : CommonService,
    private ApiParameter: ApiParameterScript
  ) {}

  ngOnInit(): void {
    this.annualincome = new FormGroup({
      id: new FormControl(''),
      annualincome: new FormControl(Number()),
      annualincome_text: new FormControl(''),
      amount: new FormControl(Number()),
    });
    this.button = 'ADD';
    this.getAllAnnualIncome(0, this.apiFetchRecordLimit);
  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit,
      this.apiFetchRecordLimit
    );
    this.offset =
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit;
  }
  insert() {
    if (this.annualincome.value.annualincome_text == 'Thousand') {
        //this.annualincome.value.amount = this.annualincome.value.annualincome ;
      this.annualincome.value.annualincome = Number(this.annualincome.value.amount) / 100;
      
    } else {

        this.annualincome.value.annualincome = this.annualincome.value.amount ;

    }

   


    if (this.button == 'ADD') {
      if (this.annualincome.valid) {
        let updateData = {
          data: {
            annualincome: this.annualincome.value.annualincome,
            annualincome_text:this.annualincome.value.annualincome_text,
            amount:this.annualincome.value.amount,
            created_At: moment().toISOString(),
          },
        };

        this.ApiParameter.savedata('annual_income', updateData).subscribe(
          (res: any) => {
            
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: res.message,
              }).then((ress: any) => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter All Your Data',
        });
      }
    } else if (this.button == 'Update') {
      if (this.annualincome.valid) {
        let updateData = {
          data: {
            annualincome: this.annualincome.value.annualincome,
            annualincome_text:this.annualincome.value.annualincome_text,
            amount:this.annualincome.value.amount,
            //"created_At": moment().toISOString()
          },
          whereConditions: { id: this.annualincome.value.id },
        };
        this.ApiParameter.updatedata('annual_income', updateData).subscribe(
          (res: any) => {
            
            if (res.success) {

              let update = {
                "oldcast": this.editedcast,
                "newdata" : this.annualincome.value.annualincome,
                "tablename" : "user_education_occupations",
                "coulemnname" : "user_anual_income"
              }
              this.CommonService.coloumUpdated(update).subscribe((res:any)=>{

              });
              Swal.fire({
                icon: 'success',
                text: res.message,
              }).then((ress: any) => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter All Your Data',
        });
      }
    }
  }
  getAllAnnualIncome( start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any) {
      this.pegination_required = true;
      var quary = `SELECT *, COUNT(*) OVER () AS total_count
        FROM annual_income
        ORDER BY annualincome DESC
        LIMIT ${limit} OFFSET ${start}`;

      if (loadSpecificData) {
        quary = `SELECT *, COUNT(*) OVER () AS total_count
        FROM annual_income
        WHERE annualincome = '${search_text}'
        annualincome_text = '${search_text}'
        amount = '${search_text}'
           ORDER BY annualincome DESC
         `;
      }

      this.blockUI.start('Loading...');

      this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
        this.blockUI.stop();

        if (res.success && res['data'].length > 0) {
          this.totalDataCount = res['data'][0].total_count;
          this.totalFetchrecord = start + res['data'].length;
          this.collectionSize =
            Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
          
          this.tableData = res['data'];
        } else {
          this.collectionSize = 1;
          this.tableData = [];
        }
      });


  }
  update(data: any) {
    this.ApiParameter.fetchdata('annual_income', {
      projection: ['*'],
      whereConditions: { id: data },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        // this.countryalldata = res['data'];
        this.annualincome.patchValue(res['data'][0]);
        this.editedcast = this.annualincome.value.annualincome;
        this.button = 'Update';
        document.getElementById('inlineFormInputName2')?.focus();
        
      }
    });

    //this.router.navigate(['/annualincome-page', data])
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  deleted(data: any) {
    
    this.blockUI.start('Deleting...');
    this.ApiParameter.deletedata('annual_income', {
      whereConditions: { id: data },
    }).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.success) {
        Swal.fire('Success', res.message, 'success').then(() => {
          this.ngOnInit();
        });
      } else {
        Swal.fire('Error', res.message, 'error');
      }
    });
  }

  publish(id: any, status: any) {
    if (status == 1) {
      let updateData = {
        data: {
          status: 0,
        },
        whereConditions: { id: id },
      };
      this.ApiParameter.updatedata('annual_income', updateData).subscribe(
        (res: any) => {
          
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: 'Unpublished',
            }).then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: res.message,
            });
          }
        }
      );
    } else if (status == 0) {
      let updateData = {
        data: {
          status: 1,
        },
        whereConditions: { id: id },
      };
      this.ApiParameter.updatedata('annual_income', updateData).subscribe(
        (res: any) => {
          
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: 'Published',
            }).then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: res.message,
            });
          }
        }
      );
    }
  }

  getSearchText(event: any) {
    this.filterText = event;
  }
  search(search_text: any) {
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);
    
    // this.getAllData(0, 10, true, search_text)
  }
  fillter(event: any) {
    //this.pegination_required = false;
    //this.currentFunction = 'fillter';
    
    var query = `SELECT * , COUNT(*) OVER () AS total_count
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_horoscope ON user_info.user_id = user_horoscope.user_id
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID`;
    if (event.isqueryGenerated) {
      query = `SELECT * , COUNT(*) OVER () AS total_count
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_horoscope ON user_info.user_id = user_horoscope.user_id
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID
    ${event.whereConditions}`;
    }

    

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['data'].length;
        this.offset = 1;
        this.totalFetchrecord = this.collectionSize;
        this.tableData = res['data'];
        
      } else {
        this.offset = 0;
        this.totalFetchrecord = 0;
        this.collectionSize = 0;
        this.tableData = [];
      }
    });
  }
  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
  }
  checkAll(e: any) {
    

    let check = document.querySelectorAll('.check');
    

    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any, key: any) => {
        this.allId.push(parseInt(this.tableData[key].id));
        checkbox.checked = true;
      });
    } else {
      check.forEach((checkbox: any, key: any) => {
        this.allId = [];
        checkbox.checked = false;
      });
    }
    
  }
  getId(id: any, e: any) {
    

    if (e.target.checked) {
      this.allId.push(parseInt(id));
    } else {
      let index = this.allId.indexOf(parseInt(id));
      this.allId.splice(index, 1);
      let k = <any>document.getElementById('all');
      k.checked = false;
    }
    
  }
  publishuser() {
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to publish',
        showCancelButton: true,
      }).then((r: any) => {
        
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 1,
            },
            type: 'Publish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'annual_income',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'publish',
              }).then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          });
        }
      });
    }
  }
  unpublishuser() {
    // alert(data);
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to  Unpublish',
        showCancelButton: true,
      }).then((r: any) => {
        
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 0,
            },
            type: 'UnPublish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'annual_income',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'Unpublish',
              }).then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          });
        }
      });
    }
  }
  deletedata(){
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to Delete',
        showCancelButton: true,
      }).then((r: any) => {
        
        if (r.isConfirmed) {
          let updateData = {
            type: 'Delete',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipuldeleteData(
            'annual_income',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'Deleted',
              }).then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          });
        }
      });
    }
  }
}
