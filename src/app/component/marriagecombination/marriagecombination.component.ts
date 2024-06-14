import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-marriagecombination',
  templateUrl: './marriagecombination.component.html',
  styleUrls: ['./marriagecombination.component.scss']
})
export class MarriagecombinationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  filterText: string;
  collectionSize: any = 10
  pegination_required: boolean = true
  finaldata: any;
  allId:any[] = [];
  page: any = 1;
  urlid: any;
  gender: any;


  constructor(
    private activatedroute:ActivatedRoute,
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((res:any)=>{
       
        if(res.id != ''){
          this.urlid = res.id
          let quary = `select user_gender from user_info where user_id = '${this.urlid}'`;
          this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
            if (res.success && res['data'].length > 0) {
              this.gender = res['data'][0].user_gender;
              this.getAllData(this.page * 10 - 10, 10);
            }
            

          });
          this.getAllData(this.page * 10 - 10, 10);
        }
    });
    

  }

  loadDATA(functionName: string) {
    //this.currentFunction = functionName;
    this.page = 1;
    this.collectionSize = 10
    this.pegination_required = true
    let _this: any = this
    _this[functionName](0, 10);
  }
  getSearchText(event: any) {
    this.filterText = event
  }
  search(search_text: any) {
    let _this:any = this;
    this.getAllData(0, 10,true,search_text);
    
    // this.getAllData(0, 10, true, search_text)

  }
  onpageChnage() {
    let _this:any = this;
    this.getAllData(this.page * 10 - 10, 10);
    //this.getAllData(this.page * 10 - 10, 10)
  }

  getAllData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any ){

    var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
      a.user_id <>'${this.urlid}' AND a.user_gender <> '${this.gender}' AND a.marriage_status = 0
      LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}';
       `;
    }
   



    
    this.blockUI.start('Loading...')
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
        this.collectionSize = Math.round(res['data'][0].total_count);
        this.finaldata = res['data'];
        
      }else{
        this.collectionSize = 1;
        this.finaldata = [];
      }
    });
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

  combine(data:any){
    Swal.fire({
      html: `
      <textarea name="" id="success"  cols="30" rows="10" placeholder="Right if any success story"></textarea>
    `,
    }).then((con:any)=>{
      var val :any =document.getElementById('success');
      
      
      if(con.isConfirmed){
        let updateData = {
          "data": {
            "marriage_status": 1,
          },
          "whereConditions": { user_id: data }
        }
        this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {

        })
        let updateData1 = {
          "data": {
            "marriage_status": 1,
          },
          "whereConditions": { user_id: this.urlid }
        }
        this.ApiParameter.updatedata('user_info', updateData1).subscribe((res: any) => {

        })
          if(this.gender == 'male'){
            // let  marrieddata = {
            //   "data": {
            //     "male_userId": this.gotragroup.value.name,
            //     "female_userId": this.gotragroup.value.name,
            //     "story": this.gotragroup.value.name,
            //     "created_At": moment().toISOString()
            //   },
            // }

            this.ApiParameter.savedata('gotra', updateData).subscribe((res: any) => {
              
              if (res.success) {

              } })
          }else{

          }
      }



    })


  }

}
