import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { offset } from '@popperjs/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtype',
  templateUrl: './addtype.component.html',
  styleUrls: ['./addtype.component.scss']
})
export class AddtypeComponent implements OnInit {
  alldata: any;
  finaldata: any;
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  tableData: any = [];
  filterText: string;

  allId: any[] = [];
  totalDataCount: number = 0
  totalFetchrecord:number=0
  apiFetchRecordLimit = 10
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10
  offset = 1;
  pegination_required: boolean = false
  currentFunction: string = 'fatchdata';

  constructor(
    private ApiParameter: ApiParameterScript
  ) { }
  type:any = new FormGroup({
    id: new FormControl('',[]),
    type_name :new FormControl('',[Validators.required]),
    name :new FormControl('',[])
  });
  totalCount: number = 0
  button:any = 'Submit'
  ngOnInit(): void {
    this.button = 'Submit';
    this.fatchdata(0,this.collectionSize);
    this.type = new FormGroup({
      id: new FormControl('',[]),
      type_name :new FormControl('',[Validators.required]),
      name :new FormControl('',[])
    });
  }
  addtype(){
    if (this.button == 'Submit') {
      if (this.type.valid) {
       let updateData = {
         "data": {

           "type_name": this.type.value.type_name,
           "name" : this.type.value.type_name.trim().replaceAll(' ','_')
         },
       }

       this.ApiParameter.savedata('type', updateData).subscribe((res: any) => {
         
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
       if (this.type.valid) {
         let updateData = {
           "data": {
            "type_name": this.type.value.type_name,
            "name" : this.type.value.type_name.trim().replaceAll(' ','_')
           },
           "whereConditions": { id: this.type.value.id }
         }
         this.ApiParameter.updatedata('type', updateData).subscribe((res: any) => {
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

  fatchdata(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any){

    let Quary =
    `select * ,COUNT(*) OVER () AS total_count from type
    LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      Quary = `select * ,COUNT(*) OVER () AS total_count from type
      WHERE
      type_name = '${search_text}'
    `
    }
  this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
    
    if (res.success && res['data'].length > 0) {
      this.totalDataCount=res['data'][0].total_count;
      this.totalFetchrecord =start+res['data'].length
      this.collectionSize = Math.ceil(res['data'][0].total_count/this.apiFetchRecordLimit)*10;
      this.finaldata = res['data'];
      
    }
  });














    // let offset = this.page * 10 - 10
    // this.ApiParameter.fetchdata('type', { "projection": ["*"] },offset,10).subscribe((res: any) => {
    //   this.totalFetchrecord = offset+res['count']
    //   this.totalCount = res['totalCount']
    //   this.collectionSize = res['totalCount']
    //   if (res.success && res['data'].length > 0) {
    //     this.alldata =  res['data'];
    //     

    //   }
    // });
  }
  edit(alldata:any){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.ApiParameter.fetchdata('type', { "projection": ["*"], "whereConditions": { id: alldata } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.type.patchValue(res['data'][0]);
        this.button = "Update";
         

      }
    });
  }
  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this
    _this[this.currentFunction](0, Number(event.target.value));
  }

  getSearchText(event: any) {
    this.filterText = event
  }
  search(search_text: any) {
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);
    
    // this.getAllData(0, 10, true, search_text)

  }
  fillter(event: any) {
    
    var query = `SELECT *
     FROM user_info
     LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
     LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
     LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
     LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
     LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
     LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
     LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID`
    if (event.isqueryGenerated) {
      query = `SELECT *
     FROM user_info
     LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
     LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
     LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
     LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
     LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
     LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
     LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID
     ${event.whereConditions}`
    }
    

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['data'].length
        // this.collectionSize=
        

        this.tableData = res['data'];
        
      }

    })

  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit, this.apiFetchRecordLimit);
    this.offset = this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit
  }

}
