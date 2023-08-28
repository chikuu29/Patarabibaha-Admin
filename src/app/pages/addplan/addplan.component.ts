import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addplan',
  templateUrl: './addplan.component.html',
  styleUrls: ['./addplan.component.scss']
})
export class AddplanComponent implements OnInit {
  memberplan = new FormGroup({
    'membership_plan_type': new FormControl('', [Validators.required]),
    'membership_plan_name': new FormControl('', [Validators.required]),
    'membership_plan_amount': new FormControl('', [Validators.required]),
    'membership_plan_currency': new FormControl('', [Validators.required]),
    'membership_plan_dicount': new FormControl('', [Validators.required]),//,Validators.max(100),Validators.min(1)
    'membership_plan_validity_date': new FormControl('', [Validators.required]),
    'membership_plan_visibility': new FormControl('', [Validators.required]),
    'membership_plan_of_send_message': new FormControl('', [Validators.required]),
    'membership_plan_chating': new FormControl('', [Validators.required]),
    'membership_plan_no_of_photo': new FormControl('', [Validators.required]),
    'membership_plan_no_of_contact': new FormControl('', [Validators.required]),
    'membership_plan_show_contact_number_other': new FormControl('', [Validators.required]),
  });
  constructor(
    private api :ApiService,
    private activatedroute :ActivatedRoute,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((res:any)=>{
      console.log(res.id);
      if(res.id == undefined){

      }else{
        this.getdatafromedit(res.id);
      }
      
    })
  }

  get type() {
    return this.memberplan.get('membership_plan_type')
  }
  get name() {
    return this.memberplan.get('membership_plan_name')
  }
  get amount() {
    return this.memberplan.get('membership_plan_amount')
  }
  get curency() {
   
    
    return this.memberplan.get('membership_plan_currency')
  }
  get discount() {
    return this.memberplan.get('membership_plan_dicount')
  }
  get validity() {
    return this.memberplan.get('membership_plan_validity_date')
  }
  get profilecount() {
    return this.memberplan.get('membership_plan_visibility')
  }
  get messagecount() {
    return this.memberplan.get('membership_plan_of_send_message')
  }
  get chatcount() {
    return this.memberplan.get('membership_plan_chating')
  } get photocount() {
    return this.memberplan.get('membership_plan_no_of_photo')
  }
  get contactcount() {
    return this.memberplan.get('membership_plan_no_of_contact')
  }
  get contactothercount() {
    return this.memberplan.get('membership_plan_show_contact_number_other')
  }


  insertdata() {
     if (this.name?.invalid) {
      Swal.fire({
        icon: 'error',
        text: "Name Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }
    else if (this.type?.invalid) {
      Swal.fire({
        icon: 'error',
        text: "Type Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    } else if (this.amount?.invalid) {
      Swal.fire({
        icon: 'error',
        text: "Amount Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }else if(this.curency?.invalid){
      Swal.fire({
        icon: 'error',
        text: "Curency Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }
    // else if(this.discount?.invalid){
    //   Swal.fire({
    //     icon: 'error',
    //     text: "Discount Can't be Empty",
    //     background:'#191c24',
    //     color:'white',
    //     confirmButtonColor:'#0090e7'
    //   });
    // }
    // else if(this.memberplan.value.discount > 1 && this.memberplan.value.discount < 100 ){
    //   Swal.fire({
    //     icon: 'error',
    //     text: "Discount Can't be Empty",
    //     background:'#191c24',
    //     color:'white',
    //     confirmButtonColor:'#0090e7'
    //   });
    // }
    else if(this.validity?.invalid){
      Swal.fire({
        icon: 'error',
        text: "Plan Validity Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }else if(this.profilecount?.invalid){
      Swal.fire({
        icon: 'error',
        text: "View Opposite Member 's Profile Count Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }else if(this.messagecount?.invalid){
      Swal.fire({
        icon: 'error',
        text: "Message Count Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }else if(this.chatcount?.invalid){
      Swal.fire({
        icon: 'error',
        text: "Chat Count Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }else if(this.photocount?.invalid){
      Swal.fire({
        icon: 'error',
        text: "Visible Opposite Member's Photo Count Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }else if(this.contactcount?.invalid){
      Swal.fire({
        icon: 'error',
        text: "Visible Opposite Member's Contact Count Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }else if(this.contactothercount?.invalid){
      Swal.fire({
        icon: 'error',
        text: "Visible Contact To Other Count Can't be Empty",
        background:'#191c24',
        color:'white',
        confirmButtonColor:'#0090e7'
      });
    }else{
      let param = {
         'value' : this.memberplan.value
      }
      console.log(param);
      this.api.memberpaln(param).subscribe((res:any)=>{
          if(res.status){
            Swal.fire({
              icon: 'success',
              text: res.message,
              background:'#191c24',
              color:'white',
              confirmButtonColor:'#0090e7'
            });
          }
      });
      
    }

  }
  getdatafromedit(id:any){
    this.ApiParameter.fetchdata('membership_plan', { "projection": ["*"],"whereConditions": { Id: id } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.memberplan.patchValue(res['data'][0])
      }
    })
  }


}
