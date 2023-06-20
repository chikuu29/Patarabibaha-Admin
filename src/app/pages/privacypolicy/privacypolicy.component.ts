import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent implements OnInit {
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
          text : 'Privacypalicy Filld Cant Be Empty'
        })
    }
   else if (this.insert == 1) {
      let param = {
        'status': 26,
        'privacypolicy': this.privacypalicy.value.privacy_policy_content
      }
      this.api.privacypolicy(param).subscribe((res: any) => {
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
        'privacypolicy' : this.privacypalicy.value.privacy_policy_content ,
        'id' : this.data ,
        'status' : 27
      }
      this.api.privacypolicy(param).subscribe((res:any)=>{
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
    this.api.privacypolicy(param).subscribe((res:any)=>{
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
          privacy_policy_content: new FormControl(this.updateddata[0].privacy_policy_content)
        });

  }


}
