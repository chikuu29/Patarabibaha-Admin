import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mobilenochange',
  templateUrl: './mobilenochange.component.html',
  styleUrls: ['./mobilenochange.component.scss'],
})
export class MobilenochangeComponent implements OnInit {
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getMobileApprove';
  tableData: any;
  filterText: any;
  totalDataCount: number = 0;
  totalFetchrecord: number = 10;
  allId: any[] = [];
  userdata: any;
  User_id: any = '';
  constructor(
    private ApiParameter: ApiParameterScript,
    private modalService: NgbModal,
    private ApiService: ApiService
  ) {}

  ngOnInit(): void {
    this.totalFetchrecord = 10;
    this.getMobileApprove(0, this.totalFetchrecord);
  }

  getMobileApprove(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let query;
    if (loadSpecificData) {
      query = `
      SELECT mobile_no_update.* ,user_info.user_full_name,user_info.user_phone_no,user_info.user_email,
      COUNT(*) OVER () AS total_count
      FROM mobile_no_update
      JOIN user_info ON mobile_no_update.user_id = user_info.user_id
             WHERE user_info.user_id = '${search_text}'
                   OR user_info.user_full_name = '${search_text}'
                   OR user_info.user_email = '${search_text}'
                   OR user_info.user_phone_no = '${search_text}'
                   ORDER BY mobile_no_update.user_id ASC, mobile_no_update.id ASC
            LIMIT ${limit} OFFSET ${start};
        `;
    } else {
      query = `
      SELECT mobile_no_update.* ,user_info.user_full_name,user_info.user_phone_no,user_info.user_email,
      COUNT(*) OVER () AS total_count
      FROM mobile_no_update
      JOIN user_info ON mobile_no_update.user_ID = user_info.user_id
      where mobile_no_update.change_states = 0
        ORDER BY mobile_no_update.change_states ASC, mobile_no_update.id ASC
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
  update(data: any, newgender: any, oldgender: any, ccode: any) {
    Swal.fire({
      icon: 'question',
      text: 'Do you want to Change Mobile Number Of ' + data,
      showCancelButton: true,
    }).then((ress: any) => {
      if (ress.isConfirmed) {
        let query = ` SELECT * FROM auth_user WHERE auth_phone_no = '${newgender}' `;

        this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
          console.log(res);
          if (res.success && res['data'].length > 0) {
            Swal.fire({
              text:
                'That Phone no already exists. For ' + res['data'][0].auth_ID,
            });
          } else {
            let updateData = {
              data: {
                user_phone_no: newgender,
                country_code: ccode,
              },
              whereConditions: { user_id: data },
            };
            this.ApiParameter.updatedata('user_info', updateData).subscribe(
              (resdata: any) => {
                if (resdata.success) {
                  let updateData = {
                    data: {
                      auth_phone_no: newgender,
                    },
                    whereConditions: { auth_ID: data },
                  };
                  this.ApiParameter.updatedata(
                    'auth_user',
                    updateData
                  ).subscribe((resdata: any) => {
                    if (resdata.success) {
                      let updateData1 = {
                        data: {
                          change_states: 1,
                        },
                        whereConditions: { user_id: data },
                      };

                      this.ApiParameter.updatedata(
                        'mobile_no_update',
                        updateData1
                      ).subscribe((resdata: any) => {
                        if (resdata.success) {
                          let params = {
                            user_id: data,
                            type: 'Mobile Number',
                            olddata: oldgender,
                            newdata: newgender,
                            filepath: environment.filePath,
                          };
                          this.ApiService.sendMailForChange(params).subscribe(
                            () => {}
                          );

                          Swal.fire({
                            icon: 'success',
                            text: 'Changed',
                          }).then(() => {
                            let updateData2 = {
                              data: {
                                user_email: newgender,
                              },
                              whereConditions: {
                                user_email: oldgender,
                              },
                            };
                            this.ApiParameter.updatedata(
                              'user_plan_deatils',
                              updateData2
                            ).subscribe((res: any) => {
                              if (res.success) {
                              }
                            });
                            this.ngOnInit();
                          });
                        }
                      });
                    }
                  });
                } else {
                  Swal.fire({
                    icon: 'warning',
                    text: resdata.message,
                  });
                }
              }
            );
          }
        });
      }
    });
  }
}
