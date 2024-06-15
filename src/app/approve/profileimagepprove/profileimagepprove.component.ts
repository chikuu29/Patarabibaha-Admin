import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ImageViewOperationComponent } from 'src/app/shared/image-view-operation/image-view-operation.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profileimagepprove',
  templateUrl: './profileimagepprove.component.html',
  styleUrls: ['./profileimagepprove.component.scss'],
})
export class ProfileimagepproveComponent implements OnInit {
  profilephotodata: any;
  imageurl: any = environment.filePath + 'storage/';
  indivisulaimage: Promise<import('sweetalert2').SweetAlertResult<any>>;
  useradata: any;
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getProfileImageAprrove';
  tableData: any;
  filterText: any;
  totalDataCount: number = 0;
  totalFetchrecord: number = 10;
  constructor(
    private ApiParameter: ApiParameterScript,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProfileImageAprrove(0, this.totalFetchrecord);
  }
  getProfileImageAprrove(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let query;
if (loadSpecificData) {
    query = `
        SELECT user_profile_images.user_ID,
               MAX(user_profile_images.user_profile_images) AS user_profile_images,
               COUNT(*) OVER () AS total_count
        FROM user_profile_images
        JOIN user_info ON user_profile_images.user_ID = user_info.user_ID
        WHERE user_profile_images.status = 'pending'
          AND (user_info.user_id = '${search_text}'
               OR user_info.user_full_name = '${search_text}'
               OR user_info.user_email = '${search_text}'
               OR user_info.user_phone_no = '${search_text}')
        GROUP BY user_profile_images.user_ID
        ORDER BY MAX(user_profile_images.created_At) DESC
        LIMIT ${limit} OFFSET ${start};
    `;
} else {
    query = `
        SELECT user_profile_images.user_ID,
               MAX(user_profile_images.user_profile_images) AS user_profile_images,
               COUNT(*) OVER () AS total_count
        FROM user_profile_images
        WHERE status = 'pending'
        GROUP BY user_ID
        ORDER BY MAX(created_At) DESC
        LIMIT ${limit} OFFSET ${start};
    `;
}


    console.log(query);

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      console.log(res);

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        console.log(this.totalDataCount);
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        console.log(this.collectionSize);
        this.tableData = res['data'];
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });

    // this.ApiParameter.fetchdata('user_profile_images', {
    //   projection: ['*'],
    //   whereConditions: { user_profile_images_for_approval: 0 },
    // }).subscribe((res: any) => {
    //   if (res.success && res['data'].length > 0) {
    //     this.profilephotodata = res['data'];
    //   }
    // });
  }
  update(data: any, image: any) {
    const modalRef = this.modalService.open(ImageViewOperationComponent, {
      fullscreen: true,
      scrollable: true,
    });
    modalRef.componentInstance.user_id = data;
  }
  usershow(data: any) {
    this.ApiParameter.fetchdata('user_info', {
      projection: ['*'],
      whereConditions: { user_id: data },
    }).subscribe((res: any) => {
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
          imageAlt: 'A tall image',
        });
      }
    });
  }
  approve(data: any) {
    //this.router.navigate(['/user', data]);
  }
  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
  }
  getSearchText(event: any) {
    this.filterText = event;
  }
  search(search_text: any) {
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);
    // console.log(search_text);
    // this.getAllData(0, 10, true, search_text)
  }
  fillter(event: any) {
    // console.log("click fillter", event);
    var query = `SELECT *
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID`;
    if (event.isqueryGenerated) {
      query = `SELECT *
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID
    ${event.whereConditions}`;
    }
    console.log(query);

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['data'].length;
        // this.collectionSize=
        // console.log(this.collectionSize);

        this.tableData = res['data'];
        // console.log(this.tableData);
      }
    });
  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit,
      this.apiFetchRecordLimit
    );
    this.offset =
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit;
  }
}
