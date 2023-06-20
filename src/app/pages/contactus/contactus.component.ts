import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  insert = 1;
  privacypalicy = new FormGroup({
    privacy_policy_content: new FormControl('', [Validators.required])
  });
  allData :any;
  updateddata: any = [];
  data: any;
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
      this. getAllData();
  }
  submit() {
    if(this.privacypalicy.value.privacy_policy_content == ''){
        Swal.fire({
          icon:'error',
          text : 'Contact Us Filld Cant Be Empty'
        })
    }
   else if (this.insert == 1) {
      let param = {
        'status': 26,
        'contactus': this.privacypalicy.value.privacy_policy_content
      }
      this.api.contactus(param).subscribe((res: any) => {
        if (res.status) {
          Swal.fire({
            icon: 'success',
            text: res.message
          }).then((ress:any)=>{
            // this.privacypalicy = new FormGroup({
            //   privacy_policy_content: new FormControl('')
            // });
            // this.ngOnInit();
            location.reload();
          });
        } else {
          Swal.fire({
            icon: 'success',
            text: res.message
          });
        }
      })
    }else if(this.insert == 2){
      let param ={
        'contactus' : this.privacypalicy.value.privacy_policy_content ,
        'id' : this.data ,
        'status' : 27
      }
      this.api.contactus(param).subscribe((res:any)=>{
        if (res.status) {
          Swal.fire({
            icon: 'success',
            text: res.message
          }).then((ress:any)=>{
            // this.privacypalicy = new FormGroup({
            //   privacy_policy_content: new FormControl('')
            // });
            // this.ngOnInit();
            location.reload();
          });
        } else {
          Swal.fire({
            icon: 'success',
            text: res.message
          });
        }
      });
    }
  }
  getAllData(){
    let param = {
      'status' : 25
    }
    this.api.contactus(param).subscribe((res:any)=>{
      if(res.status){
        this.allData = res.message;
      }
    })
  }
  update(data:any){
    this.updateddata= [];
        for(let i = 0 ; i<this.allData.length ;i++){
           if(this.allData[i].id == data){
             this.updateddata.push(this.allData[i]);
           }
        }
        this.insert = 2;
        this.data = data;
        this.privacypalicy = new FormGroup({
          privacy_policy_content: new FormControl(this.updateddata[0].contact_us_content)
        });

  }

}
