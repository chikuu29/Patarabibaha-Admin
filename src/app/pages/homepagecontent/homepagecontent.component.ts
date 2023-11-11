import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepagecontent',
  templateUrl: './homepagecontent.component.html',
  styleUrls: ['./homepagecontent.component.scss']
})
export class HomepagecontentComponent implements OnInit {

  homepagecontent = new FormGroup({
    id: new FormControl('', []),
    home_page_content: new FormControl('', [Validators.required])
  });
  allData: any;
  updateddata: any = [];
  data: any;
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  public() {

    if (this.homepagecontent.valid) {


      var updateData={
        "data":{
          "home_page_content":this.homepagecontent.value.home_page_content,
          "created_At":moment().toISOString()
        },
        "whereConditions": { id: this.homepagecontent.value.id }
      }

      this.ApiParameter.updatedata('homepage_content',updateData).subscribe((res: any) => {
        console.log(res);
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
        text: 'Please Enter Your Privacy Policy'
      })
    }
   
  }
  getAllData() {


    this.ApiParameter.fetchdata('homepage_content', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.homepagecontent.patchValue(res['data'][0])
      }


    })

  }

}
