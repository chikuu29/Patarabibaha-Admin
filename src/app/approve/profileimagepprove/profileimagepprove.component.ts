import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ImageViewOperationComponent } from 'src/app/shared/image-view-operation/image-view-operation.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profileimagepprove',
  templateUrl: './profileimagepprove.component.html',
  styleUrls: ['./profileimagepprove.component.scss']
})
export class ProfileimagepproveComponent implements OnInit {
  profilephotodata: any;
  imageurl: any = environment.filePath + 'storage/'
  indivisulaimage: Promise<import("sweetalert2").SweetAlertResult<any>>;

  constructor(
    private ApiParameter: ApiParameterScript,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getProfileImageAprrove()
  }
  getProfileImageAprrove() {
    this.ApiParameter.fetchdata('user_profile_images', { "projection": ["*"], "whereConditions": { user_profile_images_for_approval: 0 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.profilephotodata = res['data']
      }
    });
  }
  update(data: any,image:any) {


    const modalRef = this.modalService.open(ImageViewOperationComponent,{ fullscreen: true , scrollable: true });
    modalRef.componentInstance.user_id=data
    // let updateData = {
    //   "data": {
    //     "user_profile_images_for_approval": 1,
    //   },
    //   "whereConditions": { user_ID: data }
    // }
    // this.ApiParameter.updatedata('user_profile_images', updateData).subscribe((res: any) => {
    //   // console.log(res);
    //   if (res.success) {
    //     let updateDataforuser = {
    //       "data": {
    //         "user_profile_image": image,
    //       },
    //       "whereConditions": { user_id: data }
    //     }
    //     this.ApiParameter.updatedata('user_info', updateDataforuser).subscribe((res: any) => {
    //       if (res.success) {
    //       Swal.fire({
    //         icon: 'success',
    //         text: res.message
    //       }).then((ress: any) => {
    //         location.reload();
    //       });
    //     }else {
    //       Swal.fire({
    //         icon: 'error',
    //         text: res.message
    //       });
    //     }
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: 'error',
    //       text: res.message
    //     });
    //   }

    // });
  }

  usershow(data: any) {
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_id: data } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        let indivisulaimage = this.profilephotodata.filter((image: any) => {
          if (image.user_ID == data) {
            return image;
          }
        });
        Swal.fire({
          text: res['data'][0].user_fname + ' ' + res['data'][0].user_lname,
          imageUrl: this.imageurl + indivisulaimage[0].user_feature_images,
          imageHeight: 150,
          imageAlt: 'A tall image'
        })

      }
    });
  }

}
