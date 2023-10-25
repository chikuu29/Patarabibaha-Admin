import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiParameterScript } from 'src/app/script/api-parameter';
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
    tw: new FormControl('', [Validators.required]),
    wh: new FormControl('', [Validators.required]),
    yo: new FormControl('', [Validators.required]),
    li: new FormControl('', [Validators.required]),
    ai: new FormControl('', [Validators.required]),
  })



  
  constructor(
    private api:ApiService,
    private ApiParameter:ApiParameterScript
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
          }else{
            Swal.fire('No Data Upadated','No Data Upadated','warning')
          }
    });
  }
  show(){

    var apiData={
      "projection":['*']
    }

   this.ApiParameter.fetchdata("social_media_links",apiData).subscribe((res:any)=>{
       console.log(res['data'][0]);
       if(res.success){
        this.socialMediaForm.setValue({
          fb: res['data'][0].facebook_link,
          tw: res['data'][0].twitter_link,
          wh: res['data'][0].whatsapp_no,
          yo: res['data'][0].youtub_link,
          li: res['data'][0].linkedin_link,
          ai: res['data'][0].application_link
        })
        // this.socialMediaForm.setValue({
        //          fb: res['data'][0].facebook_link,
        //          tw: res['data'][0].twitter_link,
        //          wh: res['data'][0].whatsapp_no,
        //          yo: res['data'][0].youtub_link,
        //          li: res['data'][0].linkdin_link
        // })
       }
       
   })

    // this.api.getSocialMediaLink().subscribe((res:any)=>{
    //   console.log(res);
      
    //   if(res.status){
    //      this.socialMediaForm.setValue({
    //        fb: res['result'][0].facebook_link,
    //        tw: res['result'][0].twitter_link,
    //        wh: res['result'][0].whatsapp_no,
    //        yo: res['result'][0].youtub_link,
    //        li: res['result'][0].linkdin_link
    //      })
    //   }
      

    // });

  }

}
