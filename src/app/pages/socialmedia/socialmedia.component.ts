import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResolveEnd } from '@angular/router';
// import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.scss']
})
export class SocialmediaComponent implements OnInit {
  socialMediaForm= new FormGroup({
    fb: new FormControl('', [Validators.required]),
    tw: new FormControl('', [Validators.required, Validators.email]),
    wh: new FormControl('', [Validators.required]),
    yo: new FormControl('', [Validators.required]),
    li: new FormControl('', [Validators.required]),
  })
  constructor(
    private api:ApiService
  ) { }

  ngOnInit(): void {
    this.show();
  }

  socialMediaSubmit(){
    this.api.socialMediaLink(this.socialMediaForm.value).subscribe((res:any)=>{
      console.log(res);
      
          if(res.status){
            Swal.fire({
              icon: 'success',
              text:res.message
            }).then(()=>{
              location.reload();
            });
          }
    });
  }
  show(){

    this.api.getSocialMediaLink().subscribe((res:any)=>{
      
      if(res.status){
        
      }
      console.log(res);
      

    });

  }

}
