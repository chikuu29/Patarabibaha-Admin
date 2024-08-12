import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { jsPDF } from 'jspdf';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/api';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ImageViewOperationComponent } from 'src/app/shared/image-view-operation/image-view-operation.component';
import { ImageCroperComponent } from 'src/app/shared/image-croper/image-croper.component';
import { AgePipe } from 'src/app/customPipe/age.pipe';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { EmailphonecheckComponent } from './emailphonecheck/emailphonecheck.component';

ApiService;
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  allowprofileUpdate: boolean = true;
  profile: any;
  email: string = '';
  name: string = '';
  phone: number;
  address: string = '';
  showupload: boolean = false;
  uloadedImageFile: any = [];
  urlofside: any = environment.application_url;
  profileCreatedBy: string[] = ['GUEST'];
  genderOptions: string[] = ['Male', 'Female'];
  profileOptions: string[] = [
    'myself',
    'my son',
    'my daughter',
    'my brother',
    'my sister',
    'my friend',
    'my relative',
  ];
  motherTounghOptions: any[] = [];
  maritalOptions: any = [
    { name: 'Single' },
    { name: 'Married' },
    { name: 'Divorced' },
    { name: 'Widowed' },
    { name: 'Separated' },
  ];
  stateOption1: any = [];
  cityOption1: any = [];

  religionOptions: any = [];
  religionCasteOptions: any = [];

  religionSubcasteOptions: any = [];

  aducationalOptions: any = [];
  aducationalOptions1: any = [];
  aducationalOptions2: any = [];

  ocupationOptions: any = [];

  employeeInOptions: any = [];

  anualIncomeOptions: any = [];

  familystatusOptions: any = [
    { name: 'Rich [ ଧନୀ ]', value: 'Rich' },
    { name: 'Middle Class [ମଧ୍ୟବିତ୍ତ]', value: 'Middle Class' },
    {
      name: 'Upper Middle Class [ଉଚ୍ଚ ମଧ୍ୟବିତ୍ତ]',
      value: 'Upper Middle Class',
    },
    { name: 'Upper Class [ଉଚ୍ଚ ଶ୍ରେଣୀ]', value: 'Upper Class' },
    {
      name: 'Lower Middle Class [ନିମ୍ନ ମଧ୍ୟବିତ୍ତ]',
      value: 'Lower Middle Class',
    },
    {
      name: 'Upper-Lower Class [ଉପର-ନିମ୍ନ ଶ୍ରେଣୀ]',
      value: 'Upper-Lower Class',
    },
    { name: 'Lower Class [ନିମ୍ନ ଶ୍ରେଣୀ]', value: 'Lower Class' },
  ];

  noofbrothersisterOptins: any = [
    { name: 0 },
    { name: 1 },
    { name: 2 },
    { name: 3 },
    { name: 4 },
    { name: 5 },
    { name: 6 },
    { name: 7 },
  ];
  familytypeOptions: any = [
    { name: 'Joint Family' },
    { name: 'Extended Family' },
    { name: 'Single-Parent Family' },
    { name: 'Blended Family' },
    { name: 'Intercultural Family' },
    { name: 'Intergenerational Family' },
    { name: 'Multigenerational Family' },
    { name: 'Stay-at-Home Parent Family' },
  ];
  familyvalueOptions: any = [
    { name: 'Traditional' },
    { name: 'Moderate' },
    { name: 'Doesnot Matter' },
    //{ name: 'Liberal' },
  ];

  countryOption: any = [{ name: 'India' }];

  stateOption: any = [];
  cityOption: any = [];

  dietOptions: any = [
    { name: 'Full Vegetarian' },
    { name: 'Non Vegetarian' },
    { name: 'Occasional Nonveg' },
    { name: 'Eggiterian' },
  ];
  smokingOptions: any = [
    { name: 'Yes' },
    { name: 'No' },
    { name: 'Occasionally' },
  ];
  drinkOptions: any = [
    { name: 'Yes' },
    { name: 'No' },
    { name: 'Occasionally' },
  ];

  heightOptions: any = [
    { name: 'Below 4ft 6in - 137cm', value: 137 },
    { name: '4ft 6in - 137cm', value: 137 },
    { name: '4ft 7in - 139cm', value: 139 },
    { name: '4ft 8in - 142cm', value: 142 },
    { name: '4ft 9in - 144cm', value: 144 },
    { name: '4ft 10in - 147cm', value: 147 },
    { name: '4ft 11in - 149cm', value: 149 },
    { name: '5ft - 152cm', value: 152 },
    { name: '5ft 1in - 154cm', value: 154 },
    { name: '5ft 2in - 157cm', value: 157 },
    { name: '5ft 3in - 160cm', value: 160 },
    { name: '5ft 4in - 162cm', value: 162 },
    { name: '5ft 5in - 165cm', value: 165 },
    { name: '5ft 6in - 167cm', value: 167 },
    { name: '5ft 7in - 170cm', value: 170 },
    { name: '5ft 8in - 172cm', value: 172 },
    { name: '5ft 9in - 175cm', value: 175 },
    { name: '5ft 10in - 177cm', value: 177 },
    { name: '5ft 11in - 180cm', value: 180 },
    { name: '6ft - 182cm', value: 182 },
    { name: '6ft 1in - 185cm', value: 185 },
    { name: '6ft 2in - 187cm', value: 187 },
    { name: '6ft 3in - 190cm', value: 190 },
    { name: '6ft 4in - 193cm', value: 193 },
    { name: '6ft 5in - 195cm', value: 195 },
    { name: '6ft 6in - 198cm', value: 198 },
    { name: '6ft 7in - 200cm', value: 200 },
    { name: '6ft 8in - 203cm', value: 203 },
    { name: '6ft 9in - 205cm', value: 205 },
    { name: '6ft 10in - 208cm', value: 208 },
    { name: '6ft 11in - 210cm', value: 210 },
    { name: '7ft - 213cm', value: 213 },
    { name: 'Above 7ft - 213cm', value: 213 },
  ];

  weightOptions: any = [
    { name: 40 },
    { name: 41 },
    { name: 42 },
    { name: 43 },
    { name: 44 },
    { name: 45 },
    { name: 46 },
    { name: 47 },
    { name: 48 },
    { name: 49 },
    { name: 50 },
    { name: 51 },
    { name: 52 },
    { name: 53 },
    { name: 54 },
    { name: 55 },
    { name: 56 },
    { name: 57 },
    { name: 58 },
    { name: 59 },
    { name: 60 },
    { name: 61 },
    { name: 62 },
    { name: 63 },
    { name: 64 },
    { name: 65 },
    { name: 66 },
    { name: 67 },
    { name: 68 },
    { name: 69 },
    { name: 70 },
    { name: 71 },
    { name: 72 },
    { name: 73 },
    { name: 74 },
    { name: 75 },
    { name: 76 },
    { name: 77 },
    { name: 78 },
    { name: 79 },
    { name: 80 },
    { name: 81 },
    { name: 82 },
    { name: 83 },
    { name: 84 },
    { name: 85 },
    { name: 86 },
    { name: 87 },
    { name: 88 },
    { name: 89 },
    { name: 90 },
    { name: 91 },
    { name: 92 },
    { name: 93 },
    { name: 94 },
    { name: 95 },
    { name: 96 },
    { name: 97 },
    { name: 98 },
    { name: 99 },
    { name: 100 },
    { name: 101 },
    { name: 102 },
    { name: 103 },
    { name: 104 },
    { name: 105 },
    { name: 106 },
    { name: 107 },
    { name: 108 },
    { name: 109 },
    { name: 110 },
    { name: 111 },
    { name: 112 },
    { name: 113 },
    { name: 114 },
    { name: 115 },
    { name: 116 },
    { name: 117 },
    { name: 118 },
    { name: 119 },
    { name: 120 },
    { name: 121 },
    { name: 122 },
    { name: 123 },
    { name: 124 },
    { name: 125 },
    { name: 126 },
    { name: 127 },
    { name: 128 },
    { name: 129 },
    { name: 130 },
    { name: 131 },
    { name: 132 },
    { name: 133 },
    { name: 134 },
    { name: 135 },
    { name: 136 },
    { name: 137 },
    { name: 138 },
    { name: 139 },
    { name: 140 },
    { name: 141 },
    { name: 142 },
    { name: 143 },
    { name: 144 },
  ];

  mothersac: any = [
    { name: 'Govt employee [State]' },
    { name: 'Govt employee [Central]' },
    { name: 'Retired Govt employee [State]' },
    { name: 'Retired Govt employee [Central]' },
    { name: 'Business Man' },
    { name: 'Farmer' },
    { name: 'Private Company Employee' },
    { name: 'Retired Private Company Employee' },
    { name: 'Late' },
    { name: 'Other' },
    { name: 'House Wife' },
  ];
  fathersoc: any = [
    { name: 'Govt employee [State]' },
    { name: 'Govt employee [Central] ' },
    { name: 'Retired Govt employee [State]' },
    { name: 'Retired Govt employee [Central]' },
    { name: 'Business Man' },
    { name: 'Farmer' },
    { name: 'Private Company Employee' },
    { name: 'Retired Private Company Employee' },
    { name: 'Late' },
    { name: 'Other' },
  ];

  // mothersac: any[] = [
  //   { name: 'Business Owner' },
  //   { name: 'Retired Business Owner' },
  //   { name: 'Entrepreneur' },
  //   { name: 'Retired Entrepreneur' },
  //   { name: 'Professional' },
  //   { name: 'Retired Professional' },
  //   { name: 'Doctor' },
  //   { name: 'Retired Doctor' },
  //   { name: 'Engineer' },
  //   { name: 'Retired Engineer' },
  //   { name: 'Employee' },
  //   { name: 'Retired Employee' },
  //   { name: 'Professor' },
  //   { name: 'Retired Professor' },
  //   { name: 'Accountant' },
  //   { name: 'Retired Accountant' },
  //   { name: 'Financial Advisor' },
  //   { name: 'Retired Financial Advisor' },
  //   { name: 'Architect' },
  //   { name: 'Retired Architect' },
  //   { name: 'Consultant' },
  //   { name: 'Retired Consultant' },
  //   { name: 'Artist' },
  //   { name: 'Retired Artist' },
  //   { name: 'Farmer' },
  //   { name: 'Retired Farmer' },
  //   { name: 'Pilot' },
  //   { name: 'Retired Pilot' },
  //   { name: 'Scientist' },
  //   { name: 'Retired Scientist' },
  //   { name: 'IT Professional' },
  //   { name: 'Retired IT Professional' },
  //   { name: 'Manager' },
  //   { name: 'Retired Manager' },
  //   { name: 'Salesperson' },
  //   { name: 'Retired Salesperson' },
  //   { name: 'Military Personnel' },
  //   { name: 'Retired Military Personnel' },
  //   { name: 'Police Officer' },
  //   { name: 'Retired Police Officer' },
  //   { name: 'Chef' },
  //   { name: 'Retired Chef' },
  //   { name: 'Musician' },
  //   { name: 'Retired Musician' },
  //   { name: 'Writer' },
  //   { name: 'Retired Writer' },
  //   { name: 'Actor' },
  //   { name: 'Retired Actor' },
  //   { name: 'Carpenter' },
  //   { name: 'Retired Carpenter' },
  //   { name: 'Electrician' },
  //   { name: 'Retired Electrician' },
  //   { name: 'Plumber' },
  //   { name: 'Retired Plumber' },
  //   { name: 'Mechanic' },
  //   { name: 'Retired Mechanic' },
  //   { name: 'Driver' },
  //   { name: 'Lete' },
  //   { name: 'House Wife' },
  //   { name: 'Other' },
  // ];

  // fathersoc: any[] = [
  //   { name: 'Business Owner' },
  //   { name: 'Retired Business Owner' },
  //   { name: 'Entrepreneur' },
  //   { name: 'Retired Entrepreneur' },
  //   { name: 'Professional' },
  //   { name: 'Retired Professional' },
  //   { name: 'Doctor' },
  //   { name: 'Retired Doctor' },
  //   { name: 'Engineer' },
  //   { name: 'Retired Engineer' },
  //   { name: 'Employee' },
  //   { name: 'Retired Employee' },
  //   { name: 'Professor' },
  //   { name: 'Retired Professor' },
  //   { name: 'Accountant' },
  //   { name: 'Retired Accountant' },
  //   { name: 'Financial Advisor' },
  //   { name: 'Retired Financial Advisor' },
  //   { name: 'Architect' },
  //   { name: 'Retired Architect' },
  //   { name: 'Consultant' },
  //   { name: 'Retired Consultant' },
  //   { name: 'Artist' },
  //   { name: 'Retired Artist' },
  //   { name: 'Farmer' },
  //   { name: 'Retired Farmer' },
  //   { name: 'Pilot' },
  //   { name: 'Retired Pilot' },
  //   { name: 'Scientist' },
  //   { name: 'Retired Scientist' },
  //   { name: 'IT Professional' },
  //   { name: 'Retired IT Professional' },
  //   { name: 'Manager' },
  //   { name: 'Retired Manager' },
  //   { name: 'Salesperson' },
  //   { name: 'Retired Salesperson' },
  //   { name: 'Military Personnel' },
  //   { name: 'Retired Military Personnel' },
  //   { name: 'Police Officer' },
  //   { name: 'Retired Police Officer' },
  //   { name: 'Chef' },
  //   { name: 'Retired Chef' },
  //   { name: 'Musician' },
  //   { name: 'Retired Musician' },
  //   { name: 'Writer' },
  //   { name: 'Retired Writer' },
  //   { name: 'Actor' },
  //   { name: 'Retired Actor' },
  //   { name: 'Carpenter' },
  //   { name: 'Retired Carpenter' },
  //   { name: 'Electrician' },
  //   { name: 'Retired Electrician' },
  //   { name: 'Plumber' },
  //   { name: 'Retired Plumber' },
  //   { name: 'Mechanic' },
  //   { name: 'Retired Mechanic' },
  //   { name: 'Driver' },
  //   { name: 'Retired Driver' },
  //   { name: 'Lete' },
  //   { name: 'Other' },
  // ];

  bodyTpeOptions: any = [
    { name: 'Athletic' },
    { name: 'Slim' },
    { name: 'Muscular' },
    { name: 'Curvy' },
    { name: 'Toned' },
    { name: 'Petite' },
    { name: 'Husky' },
    { name: 'Slim' },
  ];

  ComplextionOptions: any = [
    { name: 'Very Fair' },
    { name: 'Fair' },
    { name: 'Wheatish' },
    { name: 'Wheatish Brown' },
    { name: 'Dark' },
  ];

  physicalStatusOptions: any = [
    { name: 'Normal' },
    { name: 'Physical Chalenges' },
  ];
  likeOption: any = [];

  profileDetailsForm = new FormGroup({
    profile_id: new FormControl(''),
    profile_name: new FormControl(''),
    profile_email: new FormControl(''),
    profile_phone: new FormControl(''),
  });

  basicDetailsForm = new FormGroup({
    user_fname: new FormControl(''),
    user_lname: new FormControl(''),
    user_email: new FormControl(this.appservices.authStatus.profile_email),
    user_profileType: new FormControl(''),
    user_gender: new FormControl(''),
    user_mother_toungh: new FormControl(''),
    user_marital_status: new FormControl(''),
    user_dob: new FormControl(''),
    user_phone_no: new FormControl(''),
    user_whatsapp_no: new FormControl(''),
    country_code: new FormControl(''),
    whats_app_c_code: new FormControl('91'),
  });

  user_religionDetailsForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_religion: new FormControl(''),
    user_caste: new FormControl(''),
    user_subcaste: new FormControl(''),
  });
  education_occupationDetailsForm = new FormGroup({
    user_ID: new FormControl(''),
    user_occupation: new FormControl(''),
    user_employed_In: new FormControl(''),
    user_anual_income: new FormControl(''),
    user_additional_education: new FormControl(''),
    user_highest_education: new FormControl(''),
    user_occupation_details: new FormControl(''),
    user_occupation_location: new FormControl(''),
    completed: new FormControl(1),
    user_deg: new FormControl(''),
  });

  userFamilyDetailsForm = new FormGroup({
    user_ID: new FormControl(''),
    user_family_type: new FormControl(''),
    user_family_value: new FormControl(''),
    user_family_status: new FormControl(''),
    user_father_name: new FormControl(''),
    user_mother_name: new FormControl(''),
    user_father_occupation: new FormControl(''),
    user_mothers_occupation: new FormControl(0),
    user_no_of_unmarried_brother: new FormControl(0),
    user_no_of_unmarried_sister: new FormControl(0),
    user_no_of_married_sister: new FormControl(0),
    user_no_of_married_brother: new FormControl(0),
    completed: new FormControl(1),
  });

  locationDetailsForm = new FormGroup({
    user_ID: new FormControl(''),
    user_country: new FormControl(''),
    user_state: new FormControl(''),
    user_city: new FormControl(''),
    user_Address: new FormControl(''),
    user_Permanent_Address: new FormControl(''),
    user_current_and_permanent_address_same: new FormControl('No'),
    user_Permanent_city: new FormControl(''),
    user_Permanent_state: new FormControl(''),
    user_Permanent_country: new FormControl(''),
    completed: new FormControl(1),
  });
  userAboutDetailsForm = new FormGroup({
    user_ID: new FormControl(''),
    user_about: new FormControl(''),
    completed: new FormControl(1),
  });

  habitHobbiesForm = new FormGroup({
    user_ID: new FormControl(''),
    user_diet: new FormControl(''),
    user_smoking: new FormControl(''),
    user_drinking: new FormControl(''),
    user_like: new FormControl(''),
    completed: new FormControl(1, []),
  });

  physicalDeatilsForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_height: new FormControl(''),
    user_weight: new FormControl(''),
    user_body_type: new FormControl(''),
    user_complextion: new FormControl(''),
    user_physical_status: new FormControl(''),
    completed: new FormControl(1, []),
  });

  horoscopeForm = new FormGroup({
    user_id: new FormControl('', []),
    user_horoscope: new FormControl('Yes'),
    user_mangalik: new FormControl('Yes'),
    user_dateoftime: new FormControl(''),
    user_dateofplace: new FormControl(''),
    user_gotra: new FormControl(''),
    user_zodiacs: new FormControl(''),
    user_nakhyatra: new FormControl(''),
    completed: new FormControl(1, []),
  });
  nakhyatraOption: any = [];
  zodiacsOptions: any = [];
  gotraOption: any = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  uploadURL = 'http://localhost/waywala-admin-api/shop/upload.php';
  uploadedFiles: any = [];
  selecteduploadedFiles: any[] = [];

  images: any[] = [];
  displayBasic: boolean = false;
  profileImage: any;

  profile_id: string = '';
  userAllData: any;

  actualUploadedFiles: any[] = [];
  imageUrl = 'this.appservices.getFilePath()}storage/';
  finaldata: any;
  logo: any;
  countrycode: any;
  degOptions: any;
  constructor(
    private appservices: AppService,
    private ApiParameterScript: ApiParameterScript,
    private commonservice: CommonService,
    private router: Router,
    private _rout: ActivatedRoute,
    private api: ApiService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private AgePipe: AgePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fathersoc.sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.mothersac.sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.imageUrl = this.appservices.getFilePath() + 'storage/';
    this.uploadURL = `${this.appservices.getApipath()}upload?q=${
      this.profile_id
    }`;
    this.blockUI.start('Loading...');
    this._rout.params.subscribe((res: any) => {
      this.profile_id = res['profile_id'];
      this.getAllDataById(this.profile_id);
      this.ApiParameterScript.getprofile({ userid: this.profile_id }).subscribe(
        (res: any) => {
          this.blockUI.stop();
          if (res.success) {
            this.userAllData = res;

            if (this.userAllData.user_profile_status == 'Completed') {
              let updateData = {
                data: { user_all_table_complited: 1 },
                whereConditions: { user_id: this.profile_id },
              };
              this.ApiParameterScript.updatedata(
                'user_info',
                updateData
              ).subscribe((res: any) => {});
            }
            this.profileDetailsForm.patchValue({
              profile_id: res?.user_info?.user_id,
              profile_name:
                res?.user_info?.user_fname + ' ' + res?.user_info?.user_lname,
              profile_email: res?.user_info?.user_email,
              profile_phone: res?.user_info?.user_phone_no,
            });
            this.user_religionDetailsForm.patchValue(res['user_religion']);
            this.education_occupationDetailsForm.patchValue(
              res['user_education_occupations']
            );
            this.userAboutDetailsForm.patchValue(res['user_about']);
            this.locationDetailsForm.patchValue(res['user_locations']);
            this.horoscopeForm.patchValue(res['user_horoscope_deatils']);
            this.userFamilyDetailsForm.patchValue(res['user_family']);
            this.habitHobbiesForm.patchValue(res['user_diet_hobbies']);

            this.physicalDeatilsForm.patchValue(res['user_physical_details']);
            this.basicDetailsForm.patchValue(res['user_info']);
            if (
              res['user_info'].whats_app_c_code == null ||
              res['user_info'].whats_app_c_code == ''
            ) {
              this.basicDetailsForm.patchValue({
                whats_app_c_code: '91',
              });
            }

            this.getSubcaste(this.user_religionDetailsForm.value.user_caste);
            this.getstatefilter(this.locationDetailsForm.value.user_country);
            this.getcityfilter(this.locationDetailsForm.value.user_state);
          }
        }
      );

      var profileApiData = {
        projection: ['*'],
        whereConditions: { user_ID: this.profile_id },
        orderBy: 'id',
        orderType: 'desc',
      };
      this.ApiParameterScript.fetchdata(
        'user_profile_images',
        profileApiData
      ).subscribe((getprofile_res: any) => {
        if (getprofile_res.success && getprofile_res['data'].length > 0) {
          this.showupload = true;
          getprofile_res.data.forEach((element: any) => {
            this.actualUploadedFiles.push({
              previewImageSrc: `${this.appservices.getFilePath()}storage/${
                element.user_profile_images
              }`,
              thumbnailImageSrc: `${this.appservices.getFilePath()}storage/${
                element.user_profile_images
              }`,
              alt: element.user_profile_images,
              title: element.user_profile_images,
            });
            this.selecteduploadedFiles.push({
              previewImageSrc: `${this.appservices.getFilePath()}storage/${
                element.user_profile_images
              }`,
              thumbnailImageSrc: `${this.appservices.getFilePath()}storage/${
                element.user_profile_images
              }`,
              alt: element.user_profile_images,
              title: element.user_profile_images,
            });
          });
        } else {
        }
      });
    });
    this.ApiParameterScript.fetchdata(
      'country',
      { projection: ['*'] },
      0,
      250
    ).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.countryOption = res['data']
          .filter((obj: any) => obj.status == 1)
          .map((obj: any) => ({ name: obj.name }));
        this.countryOption.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
        this.countrycode = res['data'].map((obj: any) => {
          return { name: obj.name, value: obj.phonecode };
        });

        this.countrycode.sort((a: any, b: any) => a.name.localeCompare(b.name));
      }
    });
    this.ApiParameterScript.fetchdata('designation', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.degOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.designation };
          } else {
            return null;
          }
        });
        this.degOptions.sort((a: any, b: any) => a.name.localeCompare(b.name));
      }
    });

    this.ApiParameterScript.fetchdata('like_detalis', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      //
      if (res.success && res['data'].length > 0) {
        this.likeOption = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.Like_name };
          } else {
            return null;
          }
        });
        this.likeOption.sort((a: any, b: any) => a.name.localeCompare(b.name));
      }
    });

    this.ApiParameterScript.fetchdata('annual_income', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.anualIncomeOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return {
              name: obj.amount + ' ' + obj.annualincome_text,
              value: obj.annualincome,
            };
          } else {
            return null;
          }
        });
        this.anualIncomeOptions.sort((a: any, b: any) => a.value - b.value);
      }
    });

    // this.ApiParameterScript.fetchdata('annual_income', {
    //   projection: ['*'],
    // }).subscribe((res: any) => {
    //   if (res.success && res['data'].length > 0) {
    //     this.anualIncomeOptions = res['data'].map((obj: any) => {
    //       if (obj.status == 1) {
    //         return { name: obj.annualincome };
    //       } else {
    //         return null;
    //       }
    //     });
    //     this.anualIncomeOptions.sort((a: any, b: any) => a.name.localeCompare(b.name));
    //   }
    // });

    this.ApiParameterScript.fetchdata('additional_education', {
      projection: ['*'],
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.aducationalOptions2 = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.additional_education_name };
          } else {
            return null;
          }
        });
        this.aducationalOptions2.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });

    this.ApiParameterScript.fetchdata('mother_tongue', {
      projection: ['*'],
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.motherTounghOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.mother_tongue_name };
          } else {
            return null;
          }
        });
        this.motherTounghOptions.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });

    this.ApiParameterScript.fetchdata('highest_education', {
      projection: ['*'],
    }).subscribe((res: any) => {
      //
      if (res.success && res['data'].length > 0) {
        this.aducationalOptions1 = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.highest_education_name };
          } else {
            return null;
          }
        });
        this.aducationalOptions1.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });

    this.ApiParameterScript.fetchdata('employer_in', {
      projection: ['*'],
    }).subscribe((res: any) => {
      //

      if (res.success && res['data'].length > 0) {
        this.employeeInOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.Employer_in_name };
          } else {
            return null;
          }
        });
        this.employeeInOptions.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });

    this.ApiParameterScript.fetchdata('occupation', {
      projection: ['*'],
    }).subscribe((res: any) => {
      //
      if (res.success && res['data'].length > 0) {
        this.ocupationOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.occupation_name };
          } else {
            return null;
          }
        });
        this.ocupationOptions.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });

    // this.ApiParameterScript.fetchdata('country', { "projection": ["*"] }).subscribe((res: any) => {
    //   //
    //   if (res.success && res['data'].length > 0) {
    //     this.countryOption = res['data'].map((obj: any) => {
    //       if (obj.status == 1) {
    //         return { name: obj.name };
    //       } else {
    //         return null
    //       }
    //     });

    //   }
    // })

    this.ApiParameterScript.fetchdata('religion', {
      projection: ['*'],
    }).subscribe((res: any) => {
      //
      if (res.success && res['data'].length > 0) {
        this.religionOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.religion_name };
          } else {
            return null;
          }
        });
        this.religionOptions.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });

    this.ApiParameterScript.fetchdata('cast_table', {
      projection: ['*'],
    }).subscribe((res: any) => {
      //
      if (res.success && res['data'].length > 0) {
        this.religionCasteOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.cast_name };
          } else {
            return null;
          }
        });
        this.religionCasteOptions.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });

    this.ApiParameterScript.fetchdata('gotra', { projection: ['*'] }).subscribe(
      (res: any) => {
        //
        if (res.success && res['data'].length > 0) {
          this.gotraOption = res['data'].map((obj: any) => {
            if (obj.status == 1) {
              return { name: obj.name };
            } else {
              return null;
            }
          });
          this.gotraOption.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          );
        }
      }
    );
    this.ApiParameterScript.fetchdata('nakshatra', {
      projection: ['*'],
    }).subscribe((res: any) => {
      //
      if (res.success && res['data'].length > 0) {
        this.nakhyatraOption = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.nakshatra_name };
          } else {
            return null;
          }
        });
        this.nakhyatraOption.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });

    this.ApiParameterScript.fetchdata('zodiacs', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.zodiacsOptions = res['data'].map((obj: any) => {
          return { name: obj.name, display: `${obj.name} / ${obj.odia_name}` };
        });
        this.zodiacsOptions.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });
  }

  horoscopeForm_submit() {
    if (this.horoscopeForm.valid) {
      var updateData = {
        data: this.horoscopeForm.value,
        whereConditions: { user_id: this.profile_id },
      };

      if (this.horoscopeForm.value.user_id == '') {
        updateData['data']['user_id'] = this.profile_id;
        this.ApiParameterScript.savedata(
          'user_horoscope',
          updateData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      } else {
        this.ApiParameterScript.updatedata(
          'user_horoscope',
          updateData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      }
    } else {
      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning');
    }
  }

  updatebasicDetailsForm() {
    var updateData = {
      data: {
        user_fname: this.basicDetailsForm.value.user_fname,
        user_lname: this.basicDetailsForm.value.user_lname,
        user_email: this.basicDetailsForm.value.user_email,
        user_profileType: this.basicDetailsForm.value.user_profileType,
        user_gender: this.basicDetailsForm.value.user_gender,
        user_full_name:
          this.basicDetailsForm.value.user_fname +
          ' ' +
          this.basicDetailsForm.value.user_lname,
        user_mother_toungh: this.basicDetailsForm.value.user_mother_toungh,
        user_marital_status: this.basicDetailsForm.value.user_marital_status,
        user_dob: moment(this.basicDetailsForm.value.user_dob)
          .format('YYYY-MM-DD')
          .toString(),
        user_has_complete_profile: 1,
        user_phone_no: this.basicDetailsForm.value.user_phone_no,
        user_whatsapp_no: this.basicDetailsForm.value.user_whatsapp_no,
        country_code: this.basicDetailsForm.value.country_code,
        whats_app_c_code: this.basicDetailsForm.value.whats_app_c_code,
        user_age: moment().diff(this.basicDetailsForm.value.user_dob, 'years'),
      },
      whereConditions: {
        user_id: this.profile_id,
      },
    };
    this.ApiParameterScript.updatedata('user_info', updateData).subscribe(
      (res: any) => {
        if (res.success) {
          // Swal.fire('', res.message, 'success').then(() => {
          //   this.ngOnInit();
          // });
          var updateData1 = {
            data: {
              auth_name:
                this.basicDetailsForm.value.user_fname +
                ' ' +
                this.basicDetailsForm.value.user_lname,
            },
            whereConditions: {
              auth_ID: this.profile_id,
            },
          };
          this.ApiParameterScript.updatedata(
            'auth_user',
            updateData1
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire('', res.message, 'success').then(() => {
                this.ngOnInit();
              });
            }
          });
        } else {
          Swal.fire('No Data Updated', res.message, 'error');
        }
      }
    );
  }
  religionDetailsForm() {
    if (this.user_religionDetailsForm.valid) {
      var updateData = {
        data: {
          user_religion: this.user_religionDetailsForm.value.user_religion,
          user_caste: this.user_religionDetailsForm.value.user_caste,
          user_subcaste: this.user_religionDetailsForm.value.user_subcaste,
          user_ID: this.profile_id,
          completed: 1,
        },
        whereConditions: { user_ID: this.profile_id },
      };

      if (this.user_religionDetailsForm.value.user_ID == '') {
        this.ApiParameterScript.savedata('user_religion', updateData).subscribe(
          (res: any) => {
            if (res.success) {
              Swal.fire('', res.message, 'success').then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire('No Data Updated', res.message, 'error');
            }
          }
        );
      } else {
        this.ApiParameterScript.updatedata(
          'user_religion',
          updateData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      }
    } else {
      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning');
    }
  }
  updateEducation_ocupation() {
    if (this.education_occupationDetailsForm.valid) {
      this.education_occupationDetailsForm.value['completed'] = 1;

      if (this.education_occupationDetailsForm.value.user_ID == '') {
        this.education_occupationDetailsForm.value['user_ID'] = this.profile_id;
        var saveData = {
          data: this.education_occupationDetailsForm.value,
        };

        this.ApiParameterScript.savedata(
          'user_education_occupations',
          saveData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      } else {
        var updateData = {
          data: this.education_occupationDetailsForm.value,
          whereConditions: { user_ID: this.profile_id },
        };
        this.education_occupationDetailsForm.value['user_ID'] = this.profile_id;
        this.ApiParameterScript.updatedata(
          'user_education_occupations',
          updateData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      }
    } else {
      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning');
    }
  }

  updateLocationForm() {
    if (this.locationDetailsForm.valid) {
      this.locationDetailsForm.value['completed'] = 1;

      if (this.locationDetailsForm.value.user_ID == '') {
        this.locationDetailsForm.value['user_ID'] = this.profile_id;
        var saveData = {
          data: this.locationDetailsForm.value,
        };
        this.ApiParameterScript.savedata('user_locations', saveData).subscribe(
          (res: any) => {
            if (res.success) {
              Swal.fire('', res.message, 'success').then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire('No Data Updated', res.message, 'error');
            }
          }
        );
      } else {
        var updateData = {
          data: this.locationDetailsForm.value,
          whereConditions: { user_ID: this.profile_id },
        };
        this.locationDetailsForm.value['user_ID'] = this.profile_id;
        this.ApiParameterScript.updatedata(
          'user_locations',
          updateData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      }
    } else {
      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning');
    }
  }

  onchangeAddress() {
    if (
      this.locationDetailsForm.value.user_current_and_permanent_address_same ==
      'Yes'
    ) {
      this.locationDetailsForm.value['user_Permanent_city'] =
        this.locationDetailsForm.value['user_city'];
      this.locationDetailsForm.value['user_Permanent_state'] =
        this.locationDetailsForm.value['user_state'];
      this.locationDetailsForm.value['user_Permanent_country'] =
        this.locationDetailsForm.value['user_country'];
      this.locationDetailsForm.value['user_Permanent_Address'] =
        this.locationDetailsForm.value['user_Address'];
    } else {
      this.locationDetailsForm.value['user_Permanent_city'] = null;
      this.locationDetailsForm.value['user_Permanent_state'] = null;
      this.locationDetailsForm.value['user_Permanent_country'] = null;
      this.locationDetailsForm.value['user_Permanent_Address'] = null;
    }

    this.locationDetailsForm.patchValue(this.locationDetailsForm.value);
  }

  updatefamilyDetailsForm() {
    if (this.userFamilyDetailsForm.valid) {
      this.userFamilyDetailsForm.value['completed'] = 1;
      if (this.userFamilyDetailsForm.value.user_ID == '') {
        this.userFamilyDetailsForm.value['user_ID'] = this.profile_id;
        var updateData = {
          data: this.userFamilyDetailsForm.value,
          whereConditions: { user_ID: this.profile_id },
        };

        this.ApiParameterScript.savedata('user_family', updateData).subscribe(
          (res: any) => {
            if (res.success) {
              Swal.fire('', res.message, 'success').then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire('No Data Updated', res.message, 'error');
            }
          }
        );
      } else {
        var updateData = {
          data: this.userFamilyDetailsForm.value,
          whereConditions: { user_ID: this.profile_id },
        };
        this.ApiParameterScript.updatedata('user_family', updateData).subscribe(
          (res: any) => {
            if (res.success) {
              Swal.fire('', res.message, 'success').then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire('No Data Updated', res.message, 'error');
            }
          }
        );
      }
    } else {
      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning');
    }
  }

  diethobbiesForm() {
    if (this.habitHobbiesForm.valid) {
      this.habitHobbiesForm.value['completed'] = 1;
      if (this.habitHobbiesForm.value.user_ID == '') {
        this.habitHobbiesForm.value['user_ID'] = this.profile_id;

        var updateData = {
          data: this.habitHobbiesForm.value,
          whereConditions: { user_ID: this.profile_id },
        };

        this.ApiParameterScript.savedata(
          'user_diet_hobbies',
          updateData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      } else {
        var updateData = {
          data: this.habitHobbiesForm.value,
          whereConditions: { user_ID: this.profile_id },
        };
        this.ApiParameterScript.updatedata(
          'user_diet_hobbies',
          updateData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      }
    } else {
      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning');
    }
  }

  userAboutFormSubmit() {
    if (this.userAboutDetailsForm.valid) {
      this.userAboutDetailsForm.value['completed'] = 1;
      var updateData = {
        data: {
          user_ID: this.profile_id,
          completed: 1,
          user_about: this.userAboutDetailsForm.value.user_about,
        },
        whereConditions: { user_ID: this.profile_id },
      };

      if (this.userAboutDetailsForm.value.user_ID == '') {
        this.ApiParameterScript.savedata('user_about', updateData).subscribe(
          (res: any) => {
            if (res.success) {
              Swal.fire('', res.message, 'success').then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire('No Data Updated', res.message, 'error');
            }
          }
        );
      } else {
        this.ApiParameterScript.updatedata('user_about', updateData).subscribe(
          (res: any) => {
            if (res.success) {
              Swal.fire('', res.message, 'success').then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire('No Data Updated', res.message, 'error');
            }
          }
        );
      }
    } else {
      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning');
    }
  }

  userPhysicaldetalsForm() {
    if (this.physicalDeatilsForm.valid) {
      this.physicalDeatilsForm.value['completed'] = 1;
      if (this.physicalDeatilsForm.value.user_ID == '') {
        this.physicalDeatilsForm.value['user_ID'] = this.profile_id;
        var updateData = {
          data: this.physicalDeatilsForm.value,
          whereConditions: { user_ID: this.profile_id },
        };

        this.ApiParameterScript.savedata(
          'user_physical_details',
          updateData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      } else {
        var updateData = {
          data: this.physicalDeatilsForm.value,
          whereConditions: { user_ID: this.profile_id },
        };
        this.ApiParameterScript.updatedata(
          'user_physical_details',
          updateData
        ).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('No Data Updated', res.message, 'error');
          }
        });
      }
    } else {
      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning');
    }
  }

  onUpload(event: any) {
    var res = event.originalEvent['body'];

    if (res.success) {
      this.selecteduploadedFiles = [];
      var getAllFile = res['data'] ? res['data'] : '';
      var uloadedImageFile = getAllFile.split(',');

      this.profileImage = `${this.appservices.getFilePath()}storage/${
        uloadedImageFile[0]
      }`;
      uloadedImageFile.forEach((img: any) => {
        this.images.push({
          previewImageSrc: `${this.appservices.getFilePath()}storage/${img}`,
          thumbnailImageSrc: `${this.appservices.getFilePath()}storage/${img}`,
          alt: '01673172483.jpg',
          title: '01673172483.jpg',
        });
      });
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }

      Swal.fire('Success', res.message, 'success');

      // this.messageService.add({ severity: 'success', summary: 'success', detail: res.msg });
    } else {
      Swal.fire(res.message, 'Please Try After Follow Instruction', 'error');
      // this.messageService.add({ severity: 'error', summary: 'error', detail: res.msg });
    }
  }

  previewImage() {
    this.displayBasic = true;
  }

  onSelectFile(event: any) {
    event.currentFiles.forEach((element: any) => {
      this.selecteduploadedFiles.push({
        previewImageSrc:
          element.objectURL.changingThisBreaksApplicationSecurity,
        thumbnailImageSrc:
          element.objectURL.changingThisBreaksApplicationSecurity,
        alt: '01673172483.jpg',
        title: '01673172483.jpg',
      });
    });
  }

  onClearSelectedFile() {
    this.selecteduploadedFiles = this.images;
  }

  onRemoveFile(event: any) {
    _.remove(
      this.selecteduploadedFiles,
      (item) =>
        item.previewImageSrc ===
        event.file.objectURL.changingThisBreaksApplicationSecurity
    );
  }
  activeAccount() {
    // if (this.userAllData?.user_profile_status == 'Completed') {
    this.blockUI.start('Please Wait...');
    let param = {
      id: this.profile_id,
    };
    this.api.userActivation(param).subscribe((res: any) => {
      this.blockUI.stop();
      this.ngOnInit();
    });
    // } else {
    //   Swal.fire({
    //     text: 'Please Complete User Profile'
    //   })
    // }
  }

  public viewMemberimages() {
    const modalRef = this.modalService.open(ImageViewOperationComponent, {
      size: 'xl',
      scrollable: true,
    });
    modalRef.componentInstance.user_id = this.profile_id;
  }

  getSubcaste(caste: any) {
    this.ApiParameterScript.fetchdata('sub_cast', {
      projection: ['*'],
      whereConditions: { cast_name: caste },
    }).subscribe((res: any) => {
      //
      if (res.success && res['data'].length > 0) {
        this.religionSubcasteOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.sub_cast_name };
          } else {
            return null;
          }
        });
      } else {
        this.religionSubcasteOptions = [];
      }
    });
  }

  getstatefilter(country_name: any) {
    this.ApiParameterScript.fetchdata('state', {
      projection: ['*'],
      whereConditions: { country_name: country_name, status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.stateOption = res['data'].map((obj: any) => {
          return { name: obj.name };
        });
      } else {
        this.stateOption = [];
        this.cityOption = [];
      }
    });
  }

  getcityfilter(state_name: any) {
    this.ApiParameterScript.fetchdata('city', {
      projection: ['*'],
      whereConditions: { state_name: state_name },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.cityOption = res['data'].map((obj: any) => {
          return { name: obj.city_name };
        });
      } else {
        this.cityOption = [];
      }
    });
  }

  loadUploadComponent() {
    const modalRef = this.modalService.open(ImageCroperComponent, {
      // size: 'xl',
      // backdrop: false,
      // scrollable: true,
      size: 'xl',
      centered: true,
      scrollable: true,
      backdrop: false,
      windowClass: 'custom-backdrop',
      backdropClass: 'custom-backdrop-border',
    });
    modalRef.componentInstance.user_id = this.profile_id;
  }
  getAllDataById(id: any) {
    let params = {
      id: id,
    };
    this.commonservice.getAllDataById(params).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = res['data'][0];
      }
    });
  }

  icone() {
    this.ApiParameterScript.fetchdata('logo_table', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.logo = res['data'][0].image;
      }
    });
  }

  calculateAge(birthday: Date): number {
    birthday = new Date(birthday);
    const ageDifMs: number = Date.now() - birthday.getTime();
    const ageDate: Date = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  public generatePDF() {
    let param = {
      user_id: this.profile_id,
      filepath: environment.filePath,
    };
    this.commonservice.generatepdf(param).subscribe((res: any) => {
      saveAs(res, this.profile_id + '.pdf');
    });
  }
  shareData() {
    let query = `SELECT phone_no FROM social_media_links WHERE id = 1`;
    this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        let firstdob = _.split(this.finaldata.user_dob, '-');
        let dob = firstdob[2] + '-' + firstdob[1] + '-' + firstdob[0];
        console.log(this.finaldata);
        console.log(this.cmToFeetInches(this.finaldata.user_height));

        let type1 = this.finaldata.user_gender == 'Female' ? 'Bride' : 'Groom';
        let type2 = this.finaldata.user_gender == 'Female' ? 'Groom' : 'Bride';
        let link =
          'https://choicemarriage.com/v1/member-profile/' +
          this.finaldata.auth_ID;

        let details = `
Required ${type2}
<br><br>
<i class="fa fa-arrow-down" aria-hidden="true"></i> Details Of ${type1} <i class="fa fa-arrow-down" aria-hidden="true"></i>
<br>
DOB:- ${this.finaldata.user_dob == null ? 'NOT UPDATE' : dob}
<br>
MOBILE NUMBER:- ${res['data'][0].phone_no}
<br>
HEIGHT:- ${
          this.finaldata.user_height == null
            ? 'NOT UPDATE'
            : this.cmToFeetInches(this.finaldata.user_height).feet +
              ' ft ' +
              this.cmToFeetInches(this.finaldata.user_height).inches +
              ' in'
        }
<br>
COLOUR:- ${
          this.finaldata.user_complextion == null
            ? 'NOT UPDATE'
            : this.finaldata.user_complextion
        }
<br>
CAST:- ${
          this.finaldata.user_caste == null
            ? 'NOT UPDATE'
            : this.finaldata.user_caste
        }\n
<br>
RASI:- ${
          this.finaldata.user_zodiacs == null
            ? 'NOT UPDATE'
            : this.finaldata.user_zodiacs
        }
<br>
QUALIFICATION:- ${
          this.finaldata.user_highest_education == null
            ? 'NOT UPDATE'
            : this.finaldata.user_highest_education
        }
<br>
OCCUPATION:- ${
          this.finaldata.user_occupation == null
            ? 'NOT UPDATE'
            : this.finaldata.user_occupation
        }
<br>
JOB LOCATION:- ${
          this.finaldata.user_occupation_location == null
            ? 'NOT UPDATE'
            : this.finaldata.user_occupation_location
        }
<br>
ANNUAL INCOME:- ${
          this.finaldata.user_anual_income == null
            ? 'NOT UPDATE'
            : this.finaldata.user_anual_income == 0
            ? 'NO INCOME'
            : this.formatIncome(this.finaldata.user_anual_income * 100000)
        }
<br>
HOME TOWN:- ${
          this.finaldata.user_Permanent_city == null
            ? 'NOT UPDATE'
            : this.finaldata.user_Permanent_city
        }
<br><br>
CLICK HERE FOR MORE INFORMATION WITH PHOTO
<br>
<a href="https://wa.me?text=${link}">${link}</a>
`;

        Swal.fire({
          html: `<div>${details}</div>`,
          showCancelButton: true,
          confirmButtonText: 'Copy Details',
        }).then((result) => {
          if (result.isConfirmed) {
            // let  textToCopy= details;
            let textToCopy = `
Required ${type2}\n
Details of ${type1}\n
MOBILE NUMBER:- ${res['data'][0].phone_no}
DOB:- ${this.finaldata.user_dob == null ? 'NOT UPDATE' : dob}
HEIGHT:- ${
              this.finaldata.user_height == null
                ? 'NOT UPDATE'
                : this.cmToFeetInches(this.finaldata.user_height).feet +
                  ' ft ' +
                  this.cmToFeetInches(this.finaldata.user_height).inches +
                  ' in'
            }
COLOUR:- ${
              this.finaldata.user_complextion == null
                ? 'NOT UPDATE'
                : this.finaldata.user_complextion
            }
CAST:- ${
              this.finaldata.user_caste == null
                ? 'NOT UPDATE'
                : this.finaldata.user_caste
            }
RASI:- ${
              this.finaldata.user_zodiacs == null
                ? 'NOT UPDATE'
                : this.finaldata.user_zodiacs
            }
QUALIFICATION:-${
              this.finaldata.user_highest_education == null
                ? 'NOT UPDATE'
                : this.finaldata.user_highest_education
            }
OCCUPATION:- ${
              this.finaldata.user_occupation == null
                ? 'NOT UPDATE'
                : this.finaldata.user_occupation
            }
JOB LOCATION:- ${
              this.finaldata.user_occupation_location == null
                ? 'NOT UPDATE'
                : this.finaldata.user_occupation_location
            }
ANNUAL INCOME:- ${
              this.finaldata.user_anual_income == null
                ? 'NOT UPDATE'
                : this.finaldata.user_anual_income == 0
                ? 'NO INCOME'
                : this.formatIncome(this.finaldata.user_anual_income * 100000)
            }
HOME TOWN:- ${
              this.finaldata.user_Permanent_city == null
                ? 'NOT UPDATE'
                : this.finaldata.user_Permanent_city
            }
CLICK HERE FOR MORE INFORMATION WITH PHOTO
${link}
    `;
            navigator.clipboard
              .writeText(textToCopy)
              .then(() => {
                Swal.fire(
                  'Copied!',
                  'Details have been copied to the clipboard',
                  'success'
                );
              })
              .catch((err) => {
                Swal.fire('Error', 'Failed to copy details', 'error');
              });
          }
        });
      }
    });
  }

  getstatefilter1(country_name: any) {
    if (_.isArray(country_name)) {
      let query = `SELECT * FROM state WHERE status=1 AND country_name IN (${
        "'" + country_name.join("', '") + "'"
      })`;
      this.ApiParameterScript.fetchDataFormQuery(query).subscribe(
        (res: any) => {
          if (res.success && res['data'].length > 0) {
            this.stateOption1 = res['data'].map((obj: any) => {
              return { name: obj.name };
            });
          } else {
            this.stateOption1 = [];
            // this.partnerPreferenceForm.controls.user_state.reset();
          }
        }
      );
    } else {
      this.ApiParameterScript.fetchdata(
        'state',
        {
          projection: ['*'],
          whereConditions: { country_name: country_name, status: 1 },
        },
        0,
        10000000
      ).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {
          this.stateOption1 = res['data'].map((obj: any) => {
            return { name: obj.name };
          });
        } else {
          this.stateOption1 = [];
          // this.partnerPreferenceForm.controls.user_state.reset();
        }
      });
    }
  }
  getcityfilter1(state_name: any) {
    if (_.isArray(state_name)) {
      let query = `SELECT * FROM city WHERE state_name IN (${
        "'" + state_name.join("', '") + "'"
      })`;

      this.ApiParameterScript.fetchDataFormQuery(query).subscribe(
        (res: any) => {
          if (res.success && res['data'].length > 0) {
            this.cityOption1 = res['data'].map((obj: any) => {
              return { name: obj.city_name };
            });
          } else {
            this.cityOption1 = [];
            // this.partnerPreferenceForm.controls.user_city.reset();
          }
        }
      );
    } else {
      this.ApiParameterScript.fetchdata(
        'city',
        {
          projection: ['*'],
          whereConditions: { state_name: state_name, status: 1 },
        },
        0,
        100000000000
      ).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {
          this.cityOption1 = res['data'].map((obj: any) => {
            return { name: obj.city_name };
          });
        } else {
          this.cityOption1 = [];
          // this.partnerPreferenceForm.controls.user_city.reset();
        }
      });
    }
  }
  check() {
    //alert(this.profileDetailsForm.value.profile_id)

    const dialogRef = this.dialog.open(EmailphonecheckComponent, {
      width: '400px',
      data: {
        id: this.profileDetailsForm.value.profile_id,
        phone: this.profileDetailsForm.value.profile_phone,
        email: this.profileDetailsForm.value.profile_email,
        c_code: this.basicDetailsForm.value.country_code,
      },
      disableClose: true,
    });
  }
  cmToFeetInches(cm: any) {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return { feet: feet, inches: remainingInches.toFixed(0) };
  }
  generateAboutUs(): void {
    // Generate the content for the "About Me" textarea (replace this with your actual content generation logic)
    let aboutMeContent =
      "I'm a [Your Age] year old [Your Gender], residing in [Your Current Location]. Professionally, I'm a [Your Occupation] with [Number of Years] years of experience. I'm passionate about [Your Interests/Hobbies] and value spending quality time with loved ones. I'm [Personality Trait 1], [Personality Trait 2], and [Personality Trait 3]. Seeking a life partner who shares similar values, respects traditions, and believes in mutual understanding. I believe in the sanctity of marriage and look forward to building a loving, respectful, and fulfilling relationship based on trust and companionship.";
    this.userAboutDetailsForm.patchValue({
      user_about: aboutMeContent,
    });
  }
  formatIncome(income: any) {
    const incomeInLakhs = income / 100000;
    if (incomeInLakhs >= 1) {
      return `${incomeInLakhs.toFixed(0)} lakh`;
    } else {
      const incomeInThousands = income / 1000;
      return `${incomeInThousands.toFixed(0)} thousand`;
    }
  }
}
