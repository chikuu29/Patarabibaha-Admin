import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ImageViewOperationComponent } from 'src/app/shared/image-view-operation/image-view-operation.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import {
  FormControl,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-horoscopeapproval',
  templateUrl: './horoscopeapproval.component.html',
  styleUrls: ['./horoscopeapproval.component.scss'],
})
export class HoroscopeapprovalComponent implements OnInit {
  useradata: any;
  imageurl: any = environment.filePath + 'storage/horoscope/';
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getsalslip';
  tableData: any;
  filterText: any;
  totalDataCount: number = 0;
  totalFetchrecord: number = 10;
  allId: any[] = [];
  userdata: any;
  selectedImage: string | ArrayBuffer | null;
  User_id: any = '';
  searchControl1 = new FormControl('');
  filteredOptions1: any[] = [];
  constructor(
    private ApiParameter: ApiParameterScript,
    private modalService: NgbModal,
    private ApiService: ApiService
  ) {}

  ngOnInit(): void {
    this.totalFetchrecord = 10;
    this.getsalslip(0, this.totalFetchrecord);
    this.getalluser();
    this.searchControl1.valueChanges.subscribe((value: any) => {
      this.filteredOptions1=[];
      this.filteredOptions1 = this.filterOptions(value, this.userdata);
    });
  }

  filterOptions(value: string, options: any[]): any[] {
    const filterValue = value.toLowerCase();
    return options.filter(
      (option) =>
        (option.user_full_name &&
          option.user_full_name.toLowerCase().includes(filterValue)) ||
        (option.user_phone_no && option.user_phone_no.includes(value)) ||
        (option.user_id && option.user_id.includes(value))
    );
  }

  getsalslip(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let query;
    if (loadSpecificData) {
      query = `
      SELECT use_horoscope_upload.* ,user_info.user_full_name,user_info.user_phone_no,user_info.user_email,
      COUNT(*) OVER () AS total_count
      FROM use_horoscope_upload
      JOIN user_info ON use_horoscope_upload.user_ID = user_info.user_id
              WHERE user_info.user_id = '${search_text}'
                   OR user_info.user_full_name = '${search_text}'
                   OR user_info.user_email = '${search_text}'
                   OR user_info.user_phone_no = '${search_text}'
                   ORDER BY use_horoscope_upload.status ASC, use_horoscope_upload.id DESC
            LIMIT ${limit} OFFSET ${start};
        `;
    } else {
      query = `
      SELECT use_horoscope_upload.* ,user_info.user_full_name,user_info.user_phone_no,user_info.user_email,
      COUNT(*) OVER () AS total_count
      FROM use_horoscope_upload
      JOIN user_info ON use_horoscope_upload.user_ID = user_info.user_id
        ORDER BY use_horoscope_upload.status ASC, use_horoscope_upload.id DESC
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

  update(data: any) {
    Swal.fire({
      icon: 'question',
      text: 'Do you want to Published',
      showCancelButton: true,
    }).then((ress: any) => {
      if (ress.isConfirmed) {
        let updateData = {
          data: {
            status: 1,
          },
          whereConditions: { user_id: data },
        };
        this.ApiParameter.updatedata(
          'use_horoscope_upload',
          updateData
        ).subscribe((resdata: any) => {
          if (resdata.success) {
            Swal.fire({
              icon: 'success',
              text: 'Published',
            }).then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: resdata.message,
            });
          }
        });
      }
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
            'use_horoscope_upload',
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
            'use_horoscope_upload',
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
        
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 0,
            },
            type: 'UnPublish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'use_horoscope_upload',
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

  getalluser() {
    let quary = `SELECT user_id,user_full_name,user_phone_no FROM user_info WHERE user_status = 'Approved'`;
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.userdata = res['data'];
        this.filteredOptions1 = res['data'];
      }
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      if (file.size >= 3 * 1024 * 1024) {
        Swal.fire('Error', 'File size exceeds 3MB limit.', 'error');
      } else if (
        !(
          file.type === 'image/jpeg' ||
          file.type === 'image/gif' ||
          file.type === 'image/png'
        )
      ) {
        Swal.fire(
          'Error',
          'Invalid file type. Please upload JPG, GIF, or PNG.',
          'error'
        );
      } else {
        reader.onload = () => {
          this.selectedImage = reader.result;
          // Log the selectedImage after it's loaded
        };
        reader.readAsDataURL(file);
      }
    }
  }
  addimg() {
    let param = {
      data: this.selectedImage,
      user_Id: this.User_id,
    };
    this.ApiService.horoscopeUplode(param).subscribe((res: any) => {
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Uplode photo',
          text: res.message,
        });
        this.ngOnInit();
        this.selectedImage = null;
      }
    });
  }
  edit(userID: any) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    let quary = `SELECT user_id,user_full_name FROM user_info WHERE user_id = '${userID}'`;
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.User_id = res['data'][0].user_id;
        let _this: any = this;
        _this[this.currentFunction](0, 10, true, this.User_id);
      }
    });
  }
}
