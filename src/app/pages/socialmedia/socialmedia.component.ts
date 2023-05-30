import { Component, OnInit } from '@angular/core';
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
  fb:any;
  tw:any ;
  wh:any;
  yo:any ;
  li:any;
  constructor(
    private api:ApiService
  ) { }

  ngOnInit(): void {
    this.show();
  }

  socialMediaSubmit(){
    var apiData = {
      "fb": this.fb,
      "tw": this.tw,
      "wh": this.wh,
      "yo": this.yo,
      "li": this.li,
    }

    this.api.socialMediaLink(apiData).subscribe((res:any)=>{
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
        this.fb=res.result[0].facebook_link;
        this.tw = res.result[0].twitter_link;
        this.wh = res.result[0].whatsapp_no ;
        this.yo = res.result[0].youtub_link  ;
        this.li = res.result[0].linkedin_link;
      }
      console.log(res);
      

    });

  }

}
