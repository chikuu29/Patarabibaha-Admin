import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.scss'],
})
export class SocialmediaComponent implements OnInit {
  socialMediaForm = new FormGroup({
    id: new FormControl(''),
    facebook_link: new FormControl('', [Validators.required]),
    whatsapp_no: new FormControl('', [Validators.required]),
    twitter_link: new FormControl('', [Validators.required]),
    linkedin_link: new FormControl('', [Validators.required]),
    youtub_link: new FormControl('', [Validators.required]),
    application_link_ios: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [Validators.required]),
    gmail_id: new FormControl('', [Validators.required]),
    application_link_and: new FormControl('', [Validators.required]),
    insta_id: new FormControl('', [Validators.required]),
    updatedon: new FormControl(moment().toISOString()),
    updated_by: new FormControl('Admin'),
  });

  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) {}

  ngOnInit(): void {
    this.show();
  }

  socialMediaSubmit() {
    let updateData = {
      data: this.socialMediaForm.value,
      whereConditions: { id: 1 },
    };
    this.ApiParameter.updatedata('social_media_links', updateData).subscribe(
      (res: any) => {
        if (res.status) {
          Swal.fire({
            icon: 'success',
            text: res.message,
          }).then(() => {
            this.ngOnInit();
          });
        } else {
          this.socialMediaForm.patchValue({
            id:'1',
          })
          let updateData = {
            data: this.socialMediaForm.value,
          };
          this.ApiParameter.savedata('gotra', updateData).subscribe(
            (res: any) => {

            }
          );
        }
      }
    );

    // this.api
    //   .socialMediaLink(this.socialMediaForm.value)
    //   .subscribe((res: any) => {
    //     

    //     if (res.status) {
    //       Swal.fire({
    //         icon: 'success',
    //         text: res.message,
    //       }).then(() => {
    //         location.reload();
    //       });
    //     } else {
    //       Swal.fire('No Data Upadated', 'No Data Upadated', 'warning');
    //     }
    //   });
  }
  show() {
    var apiData = {
      projection: ['*'],
      whereConditions: { id: 1 },
    };
    this.ApiParameter.fetchdata('social_media_links', apiData).subscribe(
      (res: any) => {
        
        if (res.success) {
          this.socialMediaForm.patchValue(res['data'][0]);
        }
      }
    );
  }
}
