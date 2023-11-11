import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homeicon',
  templateUrl: './homeicon.component.html',
  styleUrls: ['./homeicon.component.scss']
})
export class HomeiconComponent implements OnInit  {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  img: any;
  image: any;
  filterText: any
  url: any = environment.filePath + 'storage/logo_image/';
  public imageSrc: string = '';
  constructor(
    private CommonService: CommonService,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
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
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }

  submit() {
    this.CommonService.homeLogoUplode({ "image": this.imageSrc, 'date': moment().toISOString() }).subscribe((res: any) => {
      if (res.success) {
        Swal.fire({
          icon: 'success',
          text: res.message
        }).then(() => {
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
    this.ApiParameter.fetchdata('homepage_icon', { "projection": ["*"] }).subscribe((res: any) => {
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
        this.ApiParameter.deletedata('homepage_icon', { "whereConditions": { id: id } }).subscribe((res: any) => {
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
          this.ApiParameter.updatedata('homepage_icon', updateData).subscribe((res: any) => {
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
          this.ApiParameter.updatedata('homepage_icon', updateData).subscribe((res: any) => {
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
