import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Table } from 'primeng/table';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-view-operation',
  templateUrl: './image-view-operation.component.html',
  styleUrls: ['./image-view-operation.component.scss'],
})
export class ImageViewOperationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  user_id: string;
  allProfileImage_Data: any[] = [];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  constructor(
    public modal: NgbActiveModal,
    private ApiParameterScript: ApiParameterScript,
    private appservices: AppService
  ) {}

  ngOnInit() {
    var apiData = {
      projection: ['*'],
      whereConditions: { user_ID: this.user_id },
    };
    this.allProfileImage_Data = [];
    this.ApiParameterScript.fetchdata('user_profile_images', apiData).subscribe(
      (getprofile_res: any) => {
        this.loading = false;
        if (getprofile_res.success && getprofile_res['data'].length > 0) {
          getprofile_res.data.forEach((element: any) => {
            this.allProfileImage_Data.push({
              id: element.id,
              previewImageSrc: `${this.appservices.getFilePath()}storage/${
                element.user_profile_images
              }`,
              thumbnailImageSrc: `${this.appservices.getFilePath()}storage/${
                element.user_profile_images
              }`,
              alt: element.user_profile_images,
              title: element.user_profile_images,
              created_At: element.created_At,
              status: element.status,
              user_ID: element.user_ID,
            });
          });


        } else {
          this.allProfileImage_Data = [];
        }
      }
    );

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ];

    this.statuses = [
      { label: 'Pending', value: 'pending' },
      { label: 'Approved', value: 'approved' },
      { label: 'Cancled', value: 'cancled' },
      { label: 'Reject', value: 'reject' },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: any) {
    switch (status) {
      case 'cancled':
      case 'reject':
        return 'danger';

      case 'approved':
        return 'success';

      case 'new':
        return 'info';

      case 'pending':
        return 'warning';

      default:
        return 'success';
    }
  }

  approved(image: any) {
    this.blockUI.start('Please Wait...');
    var update_Dta = {
      data: { status: 'approved', user_profile_images_for_approval: 1 },
      whereConditions: { id: image.id, user_ID: image.user_ID },
    };
    this.ApiParameterScript.updatedata(
      'user_profile_images',
      update_Dta
    ).subscribe((res: any) => {

      this.blockUI.stop();
      if (res.success) {
        Swal.fire('Success', res.message, 'success').then(() => {
          this.ngOnInit();
        });
      } else [Swal.fire('Error', res.message, 'error')];
    });
  }

  delet(image: any) {
    // this.blockUI.start("Please Wait...");

    Swal.fire({
      title: 'Do You Want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ApiParameterScript.deletedata('user_profile_images', {
          whereConditions: { id: image.id },
        }).subscribe((res: any) => {
          this.blockUI.stop();
          if (res.status) {
            this.ngOnInit();
          }
        });
      }
    });
  }

  reject(image: any) {
    this.blockUI.start('Please Wait...');
    var update_Dta = {
      data: { status: 'reject', user_profile_images_for_approval: 0 },
      whereConditions: { id: image.id, user_ID: image.user_ID },
    };
    this.ApiParameterScript.updatedata(
      'user_profile_images',
      update_Dta
    ).subscribe((res: any) => {

      this.blockUI.stop();
      if (res.success) {
        Swal.fire('Success', res.message, 'success').then(() => {
          this.ngOnInit();
        });
      } else [Swal.fire('Error', res.message, 'error')];
    });
  }



  setProfile_picture(image: any) {
    this.blockUI.start('Please Wait...');
    var update_Dta = {
      data: { user_profile_image: image.title },
      whereConditions: { user_id: image.user_ID },
    };
    this.ApiParameterScript.updatedata('user_info', update_Dta).subscribe(
      (res: any) => {

        this.blockUI.stop();
        if (res.success) {
          Swal.fire('Success', res.message, 'success').then(() => {
            this.ngOnInit();
          });
        } else [Swal.fire('Error', res.message, 'error')];
      }
    );
  }
}
