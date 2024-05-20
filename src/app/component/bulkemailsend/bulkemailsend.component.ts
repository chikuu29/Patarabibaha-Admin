import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bulkemailsend',
  templateUrl: './bulkemailsend.component.html',
  styleUrls: ['./bulkemailsend.component.scss'],
})
export class BulkemailsendComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  alldata: any;
  filepath:any = environment.filePath+'storage/event_img/';
  tableData: any = [];
  filterText: string;
  allId: any[] = [];
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getAllData';
  message: any;
  Subject: any;
  imgview:boolean = false;
  kpiTileConfig: any[] = [
    {
      text: 'All Data',
      iconClass: 'fa-solid fa-users text-primary',
      methodName: 'getAllData',
      selectedStatus: false,
      class: '#FF9700',
    },
    {
      text: 'Online',
      iconClass: 'fa-solid fa-wifi text-success',
      methodName: 'getAllOnlineData',
      selectedStatus: false,
      class: '#009788',
    },
    {
      text: 'Free',
      iconClass: 'fa-solid fa-check-circle text-success',
      methodName: 'getAllFreedata',
      selectedStatus: false,
      class: '#FF1A0A',
    },
    {
      text: 'Published',
      iconClass: 'fa-solid fa-check-circle text-success',
      methodName: 'getAllPublishedData',
      selectedStatus: false,
      class: '#0E47A1',
    },
    {
      text: 'Expired',
      iconClass: 'fa-solid fa-times-circle text-danger',
      methodName: 'getExpireData',
      selectedStatus: false,
      class: '#0E47A1',
    },
    {
      text: 'Pending',
      iconClass: 'fas fa-clock text-warning',
      methodName: 'getAllPendingData',
      selectedStatus: false,
      class: '#CFC160',
    },
    {
      text: 'Horoscope NA',
      iconClass: 'fas fa-trash text-danger',
      methodName: 'getHoroscopeNotUplodedData',
      selectedStatus: false,
      class: '#4CB050',
    },
    {
      text: 'Payment Shlip NA',
      iconClass: 'fas fa-ban text-danger',
      methodName: 'getPaymentShlipNotUplodedData',
      selectedStatus: false,
      class: '#9C28B1',
    },
    {
      text: 'Male',
      iconClass: 'fas fa-thumbs-up text-primary',
      methodName: 'getAllMaleData',
      selectedStatus: false,
      class: '#0E47A1',
    },
    {
      text: 'Female',
      iconClass: 'fas fa-clock text-warning',
      methodName: 'getAllFemaleData',
      selectedStatus: false,
      class: '#CFC160',
    },
    {
      text: 'Cast',
      iconClass: 'fas fa-user-check text-success',
      methodName: 'getAllDataByCast',
      selectedStatus: false,
      class: '#9C28B1',
    },
  ];

  totalDataCount: number = 0;
  totalFetchrecord: number = 0;
  date: any;
  selectedOption: string = '';
  selectedImage: any;
  filenameints: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private alert: ToastrService,
    private ApiService: ApiService
  ) {}

  ngOnInit(): void {
    this.allId = [];
    this.page = 1;
    this.collectionSize = 10;
    this.date = new Date();
    this.loadKpi('getAllData', 0);
  }

  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
  }
  loadKpi(functionName: string, kpiNum: number) {
    this.kpiTileConfig.forEach((e: any, index: number) => {
      if (kpiNum != index) {
        e.selectedStatus = false;
      }
    });
    this.kpiTileConfig[kpiNum]['selectedStatus'] = true;

    this.currentFunction = functionName;
    this.page = 1;
    this.collectionSize = 10;
    this.pegination_required = true;
    let _this: any = this;
    _this[functionName](0, this.apiFetchRecordLimit);
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
  checkAll(e: any) {
    let check = document.querySelectorAll('.check');
    console.log(check);

    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any, key: any) => {
        console.log('p');

        this.allId.push(this.tableData[key].user_email);
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
      this.allId.push(id);
    } else {
      let index = this.allId.indexOf(id);
      this.allId.splice(index, 1);
      let k = <any>document.getElementById('all');
      k.checked = false;
    }
    console.log(this.allId);
  }
  fillter(event: any) {
    //this.pegination_required = false;
    //this.currentFunction = 'fillter';
    console.log('click fillter', event);
    var query = `SELECT * , COUNT(*) OVER () AS total_count
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_horoscope ON user_info.user_id = user_horoscope.user_id
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID`;
    if (event.isqueryGenerated) {
      query = `SELECT * , COUNT(*) OVER () AS total_count
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_horoscope ON user_info.user_id = user_horoscope.user_id
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID
    ${event.whereConditions}`;
    }

    console.log(query);

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      console.log('Filtter Record', res);
      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['data'].length;
        this.offset = 1;
        this.totalFetchrecord = this.collectionSize;
        this.tableData = res['data'];
        // console.log(this.tableData);
      } else {
        this.offset = 0;
        this.totalFetchrecord = 0;
        this.collectionSize = 0;
        this.tableData = [];
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
  getAllData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      ORDER BY a.user_creation_date_time DESC
      LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         ORDER BY a.user_creation_date_time DESC
       `;
    }

    // console.log("query",quary);

    this.blockUI.start('Loading...');

    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop();

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
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
  getAllFreedata(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_membership_plan_type = 'Free'
      ORDER BY a.user_creation_date_time DESC
      LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         AND a.user_membership_plan_type = 'Free'
         ORDER BY a.user_creation_date_time DESC
       `;
    }

    // console.log("query",quary);

    this.blockUI.start('Loading...');

    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop();

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
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
  getAllPublishedData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
          FROM user_info AS a
          LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
          a.status=1
          ORDER BY a.user_creation_date_time DESC
          LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
            FROM user_info AS a
            LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
            WHERE
                a.online_status=1
                AND a.user_id = '${search_text}'
               OR b.auth_ID = '${search_text}'
               OR a.user_fname = '${search_text}'
               OR a.user_lname = '${search_text}'
               ORDER BY a.user_creation_date_time DESC;
             `;
    }
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.status=0';
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        // alert('ll')
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.round(res['data'][0].total_count / this.apiFetchRecordLimit) *
          10;

        this.tableData = res['data'];
        // console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
        // console.log(this.tableData);
      }
    });
  }
  getAllMaleData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
    a.user_gender='Male'
    ORDER BY a.user_creation_date_time DESC
    LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE
      a.user_gender='Male'
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         ORDER BY a.user_creation_date_time DESC;
       `;
    }
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.status=0';
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        // alert('ll')
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.round(res['data'][0].total_count / this.apiFetchRecordLimit) *
          10;

        this.tableData = res['data'];
        // console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
        // console.log(this.tableData);
      }
    });
  }
  getAllFemaleData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
    a.user_gender='Female'
    ORDER BY a.user_creation_date_time DESC
    LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE
      a.user_gender='Male'
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         ORDER BY a.user_creation_date_time DESC;
       `;
    }
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.status=0';
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        // alert('ll')
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.round(res['data'][0].total_count / this.apiFetchRecordLimit) *
          10;

        this.tableData = res['data'];
        // console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
        // console.log(this.tableData);
      }
    });
  }
  getAllPendingData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
    a.user_status='Pending'
    ORDER BY a.user_creation_date_time DESC
    LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE
      a.user_status='Pending'
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         ORDER BY a.user_creation_date_time DESC;
       `;
    }
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.status=0';
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        // alert('ll')
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.round(res['data'][0].total_count / this.apiFetchRecordLimit) *
          10;

        this.tableData = res['data'];
        // console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
        // console.log(this.tableData);
      }
    });
  }
  getHoroscopeNotUplodedData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
    LEFT JOIN use_horoscope_upload as d ON a.user_id = d.user_ID
    WHERE d.user_ID IS NULL
    ORDER BY a.user_creation_date_time DESC
    LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      LEFT JOIN use_horoscope_upload as d ON a.user_id = d.user_ID
      WHERE d.user_ID IS NULL
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         ORDER BY a.user_creation_date_time DESC;
       `;
    }
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.status=0';
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        // alert('ll')
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.round(res['data'][0].total_count / this.apiFetchRecordLimit) *
          10;

        this.tableData = res['data'];
        // console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
        // console.log(this.tableData);
      }
    });
  }
  getPaymentShlipNotUplodedData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
    LEFT JOIN use_payment_slip_upload as d ON a.user_id = d.user_ID
    WHERE d.user_ID IS NULL
    ORDER BY a.user_creation_date_time DESC
    LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      LEFT JOIN use_payment_slip_upload as d ON a.user_id = d.user_ID
      WHERE d.user_ID IS NULL
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         ORDER BY a.user_creation_date_time DESC;
       `;
    }
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.status=0';
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        // alert('ll')
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.round(res['data'][0].total_count / this.apiFetchRecordLimit) *
          10;

        this.tableData = res['data'];
        // console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
        // console.log(this.tableData);
      }
    });
  }
  getExpireData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let Quary = `select * , COUNT(*) OVER () AS total_count from auth_user as a
    Join user_info as b join user_plan_deatils as c on
        a.auth_ID = b.user_id
    AND b.user_id = c.user_id
    where c.active_status = 1 AND c.plan_ending_date < now()
    ORDER BY b.user_creation_date_time DESC
    LIMIT ${limit} OFFSET ${start}
    `;
    if (loadSpecificData) {
      Quary = `select * , COUNT(*) OVER () AS total_count from auth_user as a
      Join user_info as b join user_plan_deatils as c on
          a.auth_ID = b.user_id
      AND b.user_id = c.user_id
      where c.active_status = 1 AND c.plan_ending_date < now()
      WHERE b.user_id = '${search_text}'
      OR a.auth_ID = '${search_text}'
      OR b.user_fname = '${search_text}'
      OR b.user_lname = '${search_text}'
      OR a.auth_phone_no like '%${search_text}%'
      ORDER BY b.user_creation_date_time DESC
      `;
    }
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        this.tableData = res['data'];
        //console.log(this.tableData);
      }
    });
  }
  getAllDataByCast(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {

    if (this.selectedOption == '') {
      let Quary = `select * From cast_table WHERE status = 1`;
      this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {
          console.log(res['data']);
          const optionsHtml = res['data']
            .map(
              (option: any) => `
        <option value="${option.cast_name}">${option.cast_name}</option>
      `
            )
            .join('');

          Swal.fire({
            title: 'Select a Cast',
            html: `
        <select id="dropdown" class="swal2-input">
          <option value="" hidden>Select an option</option>
          ${optionsHtml}
        </select>
      `,
            focusConfirm: false, // Ensure focus is not on the confirm button
            preConfirm: () => {
              const dropdown = Swal.getPopup()?.querySelector(
                '#dropdown'
              ) as HTMLSelectElement;
              const dropdownValue = dropdown?.value;
              if (!dropdownValue) {
                Swal.showValidationMessage(`Please select an option`);
                return null;
              }
              return dropdownValue;
            },
            allowOutsideClick: false, // Disable outside click to close the modal
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed && result.value) {
              this.selectedOption = result.value; // Synchronize the selected value with the component property
              this.pegination_required = true;
              var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
                FROM user_info AS a
                LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
                LEFT JOIN user_religion AS d ON a.user_id = d.user_ID
                WHERE d.user_caste = '${this.selectedOption}'
                ORDER BY a.user_creation_date_time DESC
                LIMIT ${limit} OFFSET ${start}`;

              if (loadSpecificData) {
                quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
                FROM user_info AS a
                LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
                LEFT JOIN user_religion AS d ON a.user_id = d.user_ID
                WHERE d.user_caste = '${this.selectedOption}'
                WHERE a.user_id = '${search_text}'
                   OR b.auth_ID = '${search_text}'
                   OR a.user_fname = '${search_text}'
                   OR a.user_lname = '${search_text}'
                   ORDER BY a.user_creation_date_time DESC
                 `;
              }

              // console.log("query",quary);

              this.blockUI.start('Loading...');

              this.ApiParameter.fetchDataFormQuery(quary).subscribe(
                (res: any) => {
                  this.blockUI.stop();

                  if (res.success && res['data'].length > 0) {
                    this.totalDataCount = res['data'][0].total_count;
                    this.totalFetchrecord = start + res['data'].length;
                    this.collectionSize =
                      Math.ceil(
                        res['data'][0].total_count / this.apiFetchRecordLimit
                      ) * 10;
                    console.log(this.collectionSize);
                    this.tableData = res['data'];
                  } else {
                    this.collectionSize = 1;
                    this.tableData = [];
                  }
                }
              );
            }
          });
        }
      });
    } else {
      this.pegination_required = true;
      var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
                FROM user_info AS a
                LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
                LEFT JOIN user_religion AS d ON a.user_id = d.user_ID
                WHERE d.user_caste = '${this.selectedOption}'
                ORDER BY a.user_creation_date_time DESC
                LIMIT ${limit} OFFSET ${start}`;

      if (loadSpecificData) {
        quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
                FROM user_info AS a
                LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
                LEFT JOIN user_religion AS d ON a.user_id = d.user_ID
                WHERE d.user_caste = '${this.selectedOption}'
                WHERE a.user_id = '${search_text}'
                   OR b.auth_ID = '${search_text}'
                   OR a.user_fname = '${search_text}'
                   OR a.user_lname = '${search_text}'
                   ORDER BY a.user_creation_date_time DESC
                 `;
      }

      // console.log("query",quary);

      this.blockUI.start('Loading...');

      this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
        this.blockUI.stop();

        if (res.success && res['data'].length > 0) {
          this.totalDataCount = res['data'][0].total_count;
          this.totalFetchrecord = start + res['data'].length;
          this.collectionSize =
            Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) *
            10;
          console.log(this.collectionSize);
          this.tableData = res['data'];
        } else {
          this.collectionSize = 1;
          this.tableData = [];
        }
      });
    }
  }
  resetcast(){
      this.selectedOption = '';
  }

  sendemail() {
    let imagedata
    if(this.filenameints == '' || this.filenameints == undefined){
      imagedata = '200'
    }else{
      imagedata = this.filepath+this.filenameints
    }
    if (this.Subject == '' || this.Subject == undefined) {
      this.alert.error('Subject Not Given', 'Error');
    } else if (this.message == '' || this.message == undefined) {
      this.alert.error('Please enter a message before sending.', 'Error');
    } else if (this.allId.length == 0) {
      this.alert.error('Email Not Selected', 'Error');
    }
    else {
      let param = {
        Subject: this.Subject,
        message: this.message,
        mailIds: this.allId,
        filepath: environment.filePath,
        imgpath : imagedata
      };

      console.log(param);
      this.alert.success('Email Sent', 'Success');
      this.ngOnInit();
      this.ApiService.sendCustmMail(param).subscribe((res: any) => {
        // this.alert.success('Email Sent', 'Success');
        // this.ngOnInit();
      });
    }
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
  triggerFileInput(){
    let param ={
      data:this.selectedImage
    }
    this.ApiService.eventImageUplode(param).subscribe((res:any)=>{
      if(res.success){
        this.filenameints = res.Filename;
        this.imgview = true;
        this.selectedImage = undefined;
      }
    })
  }
}
