import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner-adv',
  templateUrl: './banner-adv.component.html',
  styleUrls: ['./banner-adv.component.scss'],
})
export class BannerAdvComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  img: any;
  image: any;
  filepath: string = environment.filePath + 'storage/Advertisement/banner/';
  type: any = '';
  public imageSrc: string = '';
  filterText: any;
  gotraalldata: any;
  collectionSize: number = 0;
  page: number = 1;
  totalCount: number = 0;
  totalFetchrecord: number = 0;
  tabledata: any;
  action: any = 'Submit';
  rdata: any;
  originaldata: any;
  searchincome: any;
  allannualincome: any;
  alldata: any;
  tableData: any = [];
  allId: any[] = [];
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'showAdvertisement';
  totalDataCount: number = 0;
  editedcast: any;
  isGlobal: boolean = false;
  isCityWise: boolean = false;
  country: any[] = [];
  state: any[] = [];
  city: any[] = [];
  countrydata: any;
  sataedata: any[] = [];
  citydata: any[] = [];
  global: any = 0;
  expierDate = Date();
  minDate: string;
  constructor(
    private CommonService: CommonService,
    private ApiParameter: ApiParameterScript
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.image = '';
    this.imageSrc = '';
    this.type = '';
    this.city = [];
    this.state = [];
    this.country = [];
    this.isGlobal = false;
    this.isCityWise = false;
    this.showAdvertisement(0, this.apiFetchRecordLimit);
    this.getCountry();
  }
  onGlobalChange(): void {
    if (this.isGlobal) {
      this.global = 1;
      this.isCityWise = false; // Deselect City-wise if Global is selected
    }
  }
  onCityWiseChange(): void {
    if (this.isCityWise) {
      this.global = 0;
      this.isGlobal = false; // Deselect Global if City-wise is selected
    }
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
  }
  submit() {
    if (this.imageSrc == '') {
      Swal.fire('Uplode Image');
    } else if (this.type == '') {
      Swal.fire('Select Type');
    } else if (!(this.isCityWise || this.isGlobal)) {
      Swal.fire('Select Global or city Wise');
    } else if (this.isCityWise) {
      if (this.country.length == 0) {
        Swal.fire('Select Country');
      } else if (this.state.length == 0) {
        Swal.fire('Select State');
      } else if (this.city.length == 0) {
        Swal.fire('Select City');
      } else {
        let finalcity = this.city.map((els: any) => {
          return els.city_name;
        });
        this.CommonService.bannerAdv({
          image: this.imageSrc,
          date: moment().toISOString(),
          type: this.type,
          global: this.global,
          country: this.country.length == 0 ? '' : this.country,
          state: this.state.length == 0 ? '' : this.state,
          city: finalcity,
          expirydate:this.expierDate
        }).subscribe((res: any) => {
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: res.message,
            }).then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: res.message,
            });
          }
        });
      }
    } else {
      let finalcity: any[] = this.city.map((els: any) => {
        return els.city_name;
      });
      finalcity.length == 0 ? [] : finalcity;
      this.CommonService.bannerAdv({
        image: this.imageSrc,
        date: moment().toISOString(),
        type: this.type,
        global: this.global,
        country:  '' ,
        state:  '' ,
        city: [],
        expirydate:this.expierDate
      }).subscribe((res: any) => {
        if (res.success) {
          Swal.fire({
            icon: 'success',
            text: res.message,
          }).then(() => {
            this.ngOnInit();
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: res.message,
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
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 1,
            },
            type: 'Publish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'advertisement',
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
            'advertisement',
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
  deletedata() {
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to Delete',
        showCancelButton: true,
      }).then((r: any) => {
        if (r.isConfirmed) {
          let updateData = {
            deleted: 'Delete',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipuldeleteData(
            'advertisement',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'Deleted',
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

    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any, key: any) => {
        this.allId.push(parseInt(this.tableData[key].id));
        checkbox.checked = true;
      });
    } else {
      check.forEach((checkbox: any, key: any) => {
        this.allId = [];
        checkbox.checked = false;
      });
    }
  }
  getId(id: any, e: any) {
    if (e.target.checked) {
      this.allId.push(parseInt(id));
    } else {
      let index = this.allId.indexOf(parseInt(id));
      this.allId.splice(index, 1);
      let k = <any>document.getElementById('all');
      k.checked = false;
    }
  }
  showAdvertisement(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT *, COUNT(*) OVER () AS total_count
        FROM advertisement
        ORDER BY created_At ASC
        LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT *,
      COUNT(*) OVER () AS total_count
       FROM advertisement
          WHERE name LIKE '%${search_text}%'
          ORDER BY name ASC;
         `;
    }

    this.blockUI.start('Loading...');

    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop();

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        this.tableData = res['data'];
        console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }
  getSearchText(event: any) {
    this.filterText = event;
  }
  search(search_text: any) {
    //alert(this.currentFunction)
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);

    // this.getAllData(0, 10, true, search_text)
  }
  fillter(event: any) {
    //this.pegination_required = false;
    //this.currentFunction = 'fillter';

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

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['data'].length;
        this.offset = 1;
        this.totalFetchrecord = this.collectionSize;
        this.tableData = res['data'];
      } else {
        this.offset = 0;
        this.totalFetchrecord = 0;
        this.collectionSize = 0;
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
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit,
      this.apiFetchRecordLimit
    );
    this.offset =
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit;
  }
  getCountry() {
    var quary = `SELECT name FROM country`;
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.countrydata = res['data'];
      }
    });
  }
  selectState(country: any) {
    console.log(country);

    var quary = `SELECT name FROM state where country_name = '${country}'`;
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.sataedata = res['data'];
      }
    });
  }
  selectCity(state: any) {
    var quary = `SELECT city_name FROM city where state_name = '${state}'`;
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.citydata = res['data'];
      }
    });
  }
  getDaysLeft(expirydate: string): number {
    const today = new Date();
    const expDate = new Date(expirydate);
    const timeDiff = expDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  }
}
