import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApprovalviweComponent } from 'src/app/shared/approvalviwe/approvalviwe.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-successstotyapprovel',
  templateUrl: './successstotyapprovel.component.html',
  styleUrls: ['./successstotyapprovel.component.scss']
})
export class SuccessstotyapprovelComponent implements OnInit {

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
  allId: any[] = [];
  constructor(
    private ApiParameter: ApiParameterScript,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.totalFetchrecord = 10;
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
        SELECT *,COUNT(*) OVER () AS total_count
        FROM success_story_by_user
          AND (OR login_name = '${search_text}'
               OR partner_name = '${search_text}')
        ORDER BY  status  ASC , id DESC
        LIMIT ${limit} OFFSET ${start};
    `;
} else {
    query = `
        SELECT *,COUNT(*) OVER () AS total_count
        FROM success_story_by_user
        ORDER BY  status  ASC , id DESC
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
      //console.log(res);
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
  View(data:any){
    const modalRef = this.modalService.open(ApprovalviweComponent, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.id = data;
    modalRef.closed.subscribe(() => {
      this.ngOnInit(); // Call ngOnInit when the modal is closed
    });
  }

  deletedata() {
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to Delete',
        showCancelButton: true,
      }).then((r: any) => {
        console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            data: {
              deleted: 0,
            },
            type: 'Delete',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipuldeleteData(
            'success_story_by_user',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'deleted',
              }).then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          });
        }
      });
    }
  }
  publishuser() {
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to publish',
        showCancelButton: true,
      }).then((r: any) => {
        console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 1,
            },
            type: 'Publish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'success_story_by_user',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'publish',
              }).then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          });
        }
      });
    }
  }
  unpublishuser() {
    // alert(data);
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to  Unpublish',
        showCancelButton: true,
      }).then((r: any) => {
        //console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 0,
            },
            type: 'UnPublish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'success_story_by_user',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'Unpublish',
              }).then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          });
        }
      });
    }
  }

  checkAll(e: any) {
    let check = document.querySelectorAll('.check');
    console.log(check);

    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any, key: any) => {
        console.log('p');

        this.allId.push(parseInt(this.tableData[key].id));
        checkbox.checked = true;
      });
    } else {
      check.forEach((checkbox: any, key: any) => {
        this.allId = [];
        checkbox.checked = false;
      });
    }
    console.log(this.allId);
  }
  getId(id: any, e: any) {
    console.log('hii', e);

    if (e.target.checked) {
      this.allId.push(parseInt(id));
    } else {
      let index = this.allId.indexOf(parseInt(id));
      this.allId.splice(index, 1);
      let k = <any>document.getElementById('all');
      k.checked = false;
    }
    console.log(this.allId);
  }
  add(){
    const modalRef = this.modalService.open(ApprovalviweComponent, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.id = '';
    modalRef.closed.subscribe(() => {
      this.ngOnInit(); // Call ngOnInit when the modal is closed
    });
  }


}
