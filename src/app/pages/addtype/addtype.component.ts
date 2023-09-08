import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtype',
  templateUrl: './addtype.component.html',
  styleUrls: ['./addtype.component.scss']
})
export class AddtypeComponent implements OnInit {
  alldata: any;

  constructor(
    private ApiParameter: ApiParameterScript
  ) { }
  type:any = new FormGroup({
    id: new FormControl('',[]),
    type_name :new FormControl('',[Validators.required]),
    name :new FormControl('',[])
  });
  button:any = 'Submit'
  ngOnInit(): void {
    this.button = 'Submit';
    this.fatchdata();
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

  fatchdata(){
    this.ApiParameter.fetchdata('type', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.alldata =  res['data'];
        console.log(this.alldata);
        
      }
    });
  }
  edit(alldata:any){
    this.ApiParameter.fetchdata('type', { "projection": ["*"], "whereConditions": { id: alldata } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.type.patchValue(res['data'][0]);
        this.button = "Update";
         console.log(this.type);

      }
    });
  }

}
