import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  imageSrc: any ='';
  url: any = environment.filePath + 'storage/banner/'
    banner = new FormGroup({
      image : new FormControl('',[Validators.required]),
      index : new FormControl('',[Validators.required]),
      date : new FormControl(moment().toISOString())
    });
  image: any;
  filterText :any;
  constructor(
    private CommonService: CommonService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.imageSrc=''
    this.fatchdata();
  }
  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.banner.patchValue({
      image : reader.result
    })
    this.imageSrc = reader.result;
  }

  submit() {
    this.blockUI.start("Please wait...")
    this.CommonService.bannerUplode(this.banner.value).subscribe((res: any) => {
      this.blockUI.stop()
      if (res.success) {
        Swal.fire({
          icon: 'success',
          text: res.message
        }).then(() => {
          this.banner.reset()
          this.ngOnInit();
        })
      } else {
        Swal.fire({
          icon: 'error',
          text: res.message
        })
      }
    })
  }

  fatchdata() {
    this.ApiParameter.fetchdata('banner_image', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.image = res['data'];
      }
    })
  }

  delete(id: any) {

    Swal.fire({
      icon: 'question',
      text: 'Do You Want to Delete'
    }).then((r: any) => {
      console.log(r);
      if (r.isConfirmed) {
        this.blockUI.start('Deleting...')
        this.ApiParameter.deletedata('banner_image', { "whereConditions": { id: id } }).subscribe((res: any) => {
          this.blockUI.stop();
          if (res.success) {
            Swal.fire('Success', res.message, 'success').then(() => {
              this.ngOnInit()
            });
          } else {
            Swal.fire('Error', res.message, 'error')
          }
        });
      }
    });
  }
  publish(id: any, status: any) {
    if (status == 1) {

      Swal.fire({
        icon: 'question',
        text: 'Do You Want to Unpublish'
      }).then((r: any) => {

        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "status": 0,
            },
            "whereConditions": { id: id }
          }
          this.ApiParameter.updatedata('banner_image', updateData).subscribe((res: any) => {
            // console.log(res);
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "Unpublished"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })

        }
      });

    } else if (status == 0) {
      Swal.fire({
        icon: 'question',
        text: 'Do You Want to Publish'
      }).then((r: any) => {

        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "status": 1,
            },
            "whereConditions": { id: id }
          }
          this.ApiParameter.updatedata('banner_image', updateData).subscribe((res: any) => {
            // console.log(res);
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "Published"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })
        }
      });


    }

  }


}
