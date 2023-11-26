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
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewOperationComponent } from 'src/app/shared/image-view-operation/image-view-operation.component';
import { ImageCroperComponent } from 'src/app/shared/image-croper/image-croper.component';
import { AgePipe } from 'src/app/customPipe/age.pipe';

ApiService
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  // **************************
  allowprofileUpdate: boolean = true
  profile: any;
  email: string = '';
  name: string = '';
  phone: number;
  address: string = '';
  showupload: boolean = false
  uloadedImageFile: any = []


  profileCreatedBy: string[] = ['GUEST']
  genderOptions: string[] = ['male', 'female'];
  profileOptions: string[] = ['myself', 'my son', 'my daughter', 'my brother', 'my sister', 'my friend', 'my relative'];
  motherTounghOptions: any[] = [];
  maritalOptions: any = [
    { "name": "Single" },
    { "name": "Married" },
    { "name": "Divorced" },
    { "name": "Widowed" },
    { "name": "Separated" }
  ]


  religionOptions: any = []
  religionCasteOptions: any = [

  ]

  religionSubcasteOptions: any = [

  ]

  aducationalOptions: any = []
  aducationalOptions1: any = [];
  aducationalOptions2: any = [];

  ocupationOptions: any = []

  employeeInOptions: any = [];

  anualIncomeOptions: any = [];


  familytypeOptions: any = [
    { name: 'joint' },
    { name: 'juclear' }
  ]


  familyvalueOptions: any = [
    { name: 'Orthodox' },
    { name: 'Traditional' },
    { name: 'Moderate' },
    { name: 'Liberal' }
  ]

  familystatusOptions: any = [
    { "name": "reach" },
    { "name": "Affluent" },
    { "name": "middle class" },
    { "name": "upper middle class" },
    { "name": "upper lower class" },
    { "name": "upper class" },
    { "name": "lower class" },
    { "name": "working class" },
    { "name": "single-parent" },
    { "name": "blended" },
    { "name": "divorced" },
    { "name": "widowed" }
  ]

  noofbrothersisterOptins: any = [
    { "name": 0 },
    { "name": 1 },
    { "name": 2 },
    { "name": 3 },
    { "name": 4 },
    { "name": 5 },
    { "name": 6 },
    { "name": 7 },

  ]


  countryOption: any = [
    { 'name': 'India' }

  ]

  stateOption: any = []
  cityOption: any = []


  dietOptions: any = [
    { 'name': 'Vegetarian' },
    { 'name': 'Non-Vegetarian' }
  ]
  smokingOptions: any = [
    { 'name': 'Yes' },
    { 'name': 'No' },
    { 'name': 'Occasionally' }
  ]
  drinkOptions: any = [
    { 'name': 'Yes' },
    { 'name': 'No' },
    { 'name': 'Occasionally' }
  ]


  heightOptions: any = [
    { "name": "Below 4ft 6in - 137cm" },
    { "name": "4ft 6in - 137cm" },
    { "name": "4ft 7in - 139cm" },
    { "name": "4ft 8in - 142cm" },
    { "name": "4ft 9in - 144cm" },
    { "name": "4ft 10in - 147cm" },
    { "name": "4ft 11in - 149cm" },
    { "name": "5ft - 152cm" },
    { "name": "5ft 1in - 154cm" },
    { "name": "5ft 2in - 157cm" },
    { "name": "5ft 3in - 160cm" },
    { "name": "5ft 4in - 162cm" },
    { "name": "5ft 5in - 165cm" },
    { "name": "5ft 6in - 167cm" },
    { "name": "5ft 7in - 170cm" },
    { "name": "5ft 8in - 172cm" },
    { "name": "5ft 9in - 175cm" },
    { "name": "5ft 10in - 177cm" },
    { "name": "5ft 11in - 180cm" },
    { "name": "6ft - 182cm" },
    { "name": "6ft 1in - 185cm" },
    { "name": "6ft 2in - 187cm" },
    { "name": "6ft 3in - 190cm" },
    { "name": "6ft 4in - 193cm" },
    { "name": "6ft 5in - 195cm" },
    { "name": "6ft 6in - 198cm" },
    { "name": "6ft 7in - 200cm" },
    { "name": "6ft 8in - 203cm" },
    { "name": "6ft 9in - 205cm" },
    { "name": "6ft 10in - 208cm" },
    { "name": "6ft 11in - 210cm" },
    { "name": "7ft - 213cm" },
    { "name": "Above 7ft - 213cm" }
  ]

  weightOptions: any = [
    { "name": 40 },
    { "name": 41 },
    { "name": 42 },
    { "name": 43 },
    { "name": 44 },
    { "name": 45 },
    { "name": 46 },
    { "name": 47 },
    { "name": 48 },
    { "name": 49 },
    { "name": 50 },
    { "name": 51 },
    { "name": 52 },
    { "name": 53 },
    { "name": 54 },
    { "name": 55 },
    { "name": 56 },
    { "name": 57 },
    { "name": 58 },
    { "name": 59 },
    { "name": 60 },
    { "name": 61 },
    { "name": 62 },
    { "name": 63 },
    { "name": 64 },
    { "name": 65 },
    { "name": 66 },
    { "name": 67 },
    { "name": 68 },
    { "name": 69 },
    { "name": 70 },
    { "name": 71 },
    { "name": 72 },
    { "name": 73 },
    { "name": 74 },
    { "name": 75 },
    { "name": 76 },
    { "name": 77 },
    { "name": 78 },
    { "name": 79 },
    { "name": 80 },
    { "name": 81 },
    { "name": 82 },
    { "name": 83 },
    { "name": 84 },
    { "name": 85 },
    { "name": 86 },
    { "name": 87 },
    { "name": 88 },
    { "name": 89 },
    { "name": 90 },
    { "name": 91 },
    { "name": 92 },
    { "name": 93 },
    { "name": 94 },
    { "name": 95 },
    { "name": 96 },
    { "name": 97 },
    { "name": 98 },
    { "name": 99 },
    { "name": 100 },
    { "name": 101 },
    { "name": 102 },
    { "name": 103 },
    { "name": 104 },
    { "name": 105 },
    { "name": 106 },
    { "name": 107 },
    { "name": 108 },
    { "name": 109 },
    { "name": 110 },
    { "name": 111 },
    { "name": 112 },
    { "name": 113 },
    { "name": 114 },
    { "name": 115 },
    { "name": 116 },
    { "name": 117 },
    { "name": 118 },
    { "name": 119 },
    { "name": 120 },
    { "name": 121 },
    { "name": 122 },
    { "name": 123 },
    { "name": 124 },
    { "name": 125 },
    { "name": 126 },
    { "name": 127 },
    { "name": 128 },
    { "name": 129 },
    { "name": 130 },
    { "name": 131 },
    { "name": 132 },
    { "name": 133 },
    { "name": 134 },
    { "name": 135 },
    { "name": 136 },
    { "name": 137 },
    { "name": 138 },
    { "name": 139 },
    { "name": 140 },
    { "name": 141 },
    { "name": 142 },
    { "name": 143 },
    { "name": 144 }

  ]

  bodyTpeOptions: any = [
    { "name": "Athletic" },
    { "name": "Slim" },
    { "name": "Muscular" },
    { "name": "Curvy" },
    { "name": "Toned" },
    { "name": "Petite" },
    { "name": "Husky" },
    { "name": "Slim" }
  ]


  ComplextionOptions: any = [
    { "name": "Very Fair" },
    { "name": "Fair" },
    { "name": "Wheatish" },
    { "name": "Wheatish Brown" },
    { "name": "Dark" }
  ]

  physicalStatusOptions: any = [
    { "name": "Normal" },
    { "name": "Physical Chalenges" }
  ]
  likeOption: any = [
    { "name": "Like Tv Serial" },
    { "name": "Like Game" },
    { "name": "Like Book" }
  ]


  profileDetailsForm = new FormGroup({
    profile_id: new FormControl('', [Validators.required]),
    profile_name: new FormControl('', [Validators.required]),
    profile_email: new FormControl('', [Validators.required]),
    profile_phone: new FormControl('', [Validators.required])
  });

  basicDetailsForm = new FormGroup({
    user_fname: new FormControl('', [Validators.required]),
    user_lname: new FormControl('', [Validators.required]),
    user_email: new FormControl(this.appservices.authStatus.profile_email, [Validators.required]),
    user_profileType: new FormControl('', [Validators.required]),
    user_gender: new FormControl('', [Validators.required]),
    user_mother_toungh: new FormControl('', [Validators.required]),
    user_marital_status: new FormControl('', [Validators.required]),
    user_dob: new FormControl('', [Validators.required]),
  });

  user_religionDetailsForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_religion: new FormControl('', [Validators.required]),
    user_caste: new FormControl('', [Validators.required]),
    user_subcaste: new FormControl('', [Validators.required])
  });
  education_occupationDetailsForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_occupation: new FormControl('', [Validators.required]),
    user_employed_In: new FormControl('', [Validators.required]),
    user_anual_income: new FormControl('', [Validators.required]),
    user_additional_education: new FormControl('', [Validators.required]),
    user_highest_education: new FormControl('', [Validators.required]),
    user_occupation_details: new FormControl('', [Validators.required]),
    user_occupation_location: new FormControl('', [Validators.required]),
    completed: new FormControl(1, []),

  });

  userFamilyDetailsForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_family_type: new FormControl('', [Validators.required]),
    user_family_value: new FormControl('', [Validators.required]),
    user_family_status: new FormControl('', [Validators.required]),
    user_father_name: new FormControl('', [Validators.required]),
    user_mother_name: new FormControl('', [Validators.required]),
    user_father_occupation: new FormControl('', [Validators.required]),
    user_mothers_occupation: new FormControl('', [Validators.required]),
    user_no_of_unmarried_brother: new FormControl('', [Validators.required]),
    user_no_of_unmarried_sister: new FormControl('', [Validators.required]),
    user_no_of_married_sister: new FormControl('', [Validators.required]),
    user_no_of_married_brother: new FormControl('', [Validators.required]),
    completed: new FormControl(1, []),
  });

  locationDetailsForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_country: new FormControl('', [Validators.required]),
    user_state: new FormControl('', [Validators.required]),
    user_city: new FormControl('', [Validators.required]),
    user_Address: new FormControl('', [Validators.required]),
    user_Permanent_Address: new FormControl('', [Validators.required]),
    user_current_and_permanent_address_same: new FormControl('No', [Validators.required]),
    user_Permanent_city: new FormControl('', [Validators.required]),
    user_Permanent_state: new FormControl('', [Validators.required]),
    user_Permanent_country: new FormControl('', [Validators.required]),
    completed: new FormControl(1, [])
  });
  userAboutDetailsForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_about: new FormControl('', [Validators.required]),
    completed: new FormControl(1, []),

  });

  habitHobbiesForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_diet: new FormControl('', [Validators.required]),
    user_smoking: new FormControl('', [Validators.required]),
    user_drinking: new FormControl('', [Validators.required]),
    user_like: new FormControl('', [Validators.required]),
    completed: new FormControl(1, []),
  });

  physicalDeatilsForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_height: new FormControl('', [Validators.required]),
    user_weight: new FormControl('', [Validators.required]),
    user_body_type: new FormControl('', [Validators.required]),
    user_complextion: new FormControl('', [Validators.required]),
    user_physical_status: new FormControl('', [Validators.required]),
    completed: new FormControl(1, []),
  });


  horoscopeForm = new FormGroup({
    user_id: new FormControl('', []),
    user_horoscope: new FormControl('Yes', [Validators.required]),
    user_mangalik: new FormControl('Yes', [Validators.required]),
    user_dateoftime: new FormControl('', [Validators.required]),
    user_dateofplace: new FormControl('', [Validators.required]),
    user_gotra: new FormControl('', [Validators.required]),
    user_zodiacs: new FormControl('', [Validators.required]),
    user_nakhyatra: new FormControl('', [Validators.required]),
    completed: new FormControl(1, []),
  })
  nakhyatraOption: any = []
  zodiacsOptions: any = []
  gotraOption: any = []

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];


  uploadURL = 'http://localhost/waywala-admin-api/shop/upload.php'
  uploadedFiles: any = []
  selecteduploadedFiles: any[] = []

  images: any[] = [];
  displayBasic: boolean = false
  profileImage: any

  profile_id: string = '';
  userAllData: any

  actualUploadedFiles: any[] = []
  imageUrl = "this.appservices.getFilePath()}storage/"
  constructor(
    private appservices: AppService,
    private ApiParameterScript: ApiParameterScript,
    private router: Router,
    private _rout: ActivatedRoute,
    private api: ApiService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private AgePipe :AgePipe

  ) { }

  ngOnInit(): void {
    this.imageUrl = this.appservices.getFilePath() + 'storage/';
    this.uploadURL = `${this.appservices.getApipath()}upload?q=${this.profile_id}`
    this.blockUI.start("Loading...")
    this._rout.params.subscribe((res: any) => {
      this.profile_id = res['profile_id']
      this.ApiParameterScript.getprofile({ userid: this.profile_id }).subscribe((res: any) => {

        this.blockUI.stop();
        if (res.success) {

          this.userAllData = res;
          console.log(this.userAllData);
          
          this.profileDetailsForm.patchValue({
            profile_id: res?.user_info?.user_id
            , profile_name: res?.user_info?.user_fname + ' ' + res?.user_info?.user_lname, profile_email: res?.user_info?.user_email, profile_phone: ''
          });
          this.user_religionDetailsForm.patchValue(res['user_religion'])
          this.education_occupationDetailsForm.patchValue(res['user_education_occupations'])
          this.userAboutDetailsForm.patchValue(res['user_about'])
          this.locationDetailsForm.patchValue(res['user_locations'])
          this.horoscopeForm.patchValue(res['user_horoscope_deatils'])
          this.userFamilyDetailsForm.patchValue(res['user_family'])
          this.habitHobbiesForm.patchValue(res['user_diet_hobbies'])
          this.physicalDeatilsForm.patchValue(res['user_physical_details'])
          this.basicDetailsForm.patchValue(res['user_info'])
          this.getSubcaste(this.user_religionDetailsForm.value.user_caste)
          this.getstatefilter(this.locationDetailsForm.value.user_country);
          this.getcityfilter(this.locationDetailsForm.value.user_state);
        }

      })

      var profileApiData = {
        "projection": ['*'],
        "whereConditions": { "user_ID": this.profile_id },
        "orderBy": 'id',
        'orderType': 'desc'

      }
      this.ApiParameterScript.fetchdata('user_profile_images', profileApiData).subscribe((getprofile_res: any) => {
        // console.log("getprofile_res", getprofile_res);

        if (getprofile_res.success && getprofile_res['data'].length > 0) {
          this.showupload = true
          getprofile_res.data.forEach((element: any) => {


            this.actualUploadedFiles.push(
              {
                "previewImageSrc": `${this.appservices.getFilePath()}storage/${element.user_profile_images}`,
                "thumbnailImageSrc": `${this.appservices.getFilePath()}storage/${element.user_profile_images}`,
                "alt": element.user_profile_images,
                "title": element.user_profile_images
              }
            )
            this.selecteduploadedFiles.push(
              {
                "previewImageSrc": `${this.appservices.getFilePath()}storage/${element.user_profile_images}`,
                "thumbnailImageSrc": `${this.appservices.getFilePath()}storage/${element.user_profile_images}`,
                "alt": element.user_profile_images,
                "title": element.user_profile_images
              }
            )



          });

        } else {

        }


      })

    })

    this.ApiParameterScript.fetchdata('annual_income', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {

        this.anualIncomeOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.annualincome };
          } else {
            return null
          }
        });

      }
    })

    this.ApiParameterScript.fetchdata('additional_education', { "projection": ["*"] }).subscribe((res: any) => {


      if (res.success && res['data'].length > 0) {

        this.aducationalOptions2 = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.additional_education_name };
          } else {
            return null
          }
        });





      }

    })

    this.ApiParameterScript.fetchdata('mother_tongue', { "projection": ["*"] }).subscribe((res: any) => {


      if (res.success && res['data'].length > 0) {

        this.motherTounghOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.mother_tongue_name };
          } else {
            return null
          }
        });




      }

    })

    this.ApiParameterScript.fetchdata('highest_education', { "projection": ["*"] }).subscribe((res: any) => {
      // 
      if (res.success && res['data'].length > 0) {

        this.aducationalOptions1 = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.highest_education_name };
          } else {
            return null
          }
        });





      }

    })


    this.ApiParameterScript.fetchdata('employer_in', { "projection": ["*"] }).subscribe((res: any) => {
      // 


      if (res.success && res['data'].length > 0) {

        this.employeeInOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.Employer_in_name };
          } else {
            return null
          }
        });





      }

    })


    this.ApiParameterScript.fetchdata('occupation', { "projection": ["*"] }).subscribe((res: any) => {
      // 
      if (res.success && res['data'].length > 0) {
        this.ocupationOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.occupation_name };
          } else {
            return null
          }
        });

      }






    })


    this.ApiParameterScript.fetchdata('country', { "projection": ["*"] }).subscribe((res: any) => {
      // 
      if (res.success && res['data'].length > 0) {
        this.countryOption = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.name };
          } else {
            return null
          }
        });

      }
    })

    this.ApiParameterScript.fetchdata('religion', { "projection": ["*"] }).subscribe((res: any) => {
      // 
      if (res.success && res['data'].length > 0) {
        this.religionOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.religion_name };
          } else {
            return null
          }
        });

      }






    })

    this.ApiParameterScript.fetchdata('cast_table', { "projection": ["*"] }).subscribe((res: any) => {
      // 
      if (res.success && res['data'].length > 0) {
        this.religionCasteOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.cast_name };
          } else {
            return null
          }
        });

      }
    })

    this.ApiParameterScript.fetchdata('gotra', { "projection": ["*"] }).subscribe((res: any) => {
      // 
      if (res.success && res['data'].length > 0) {
        this.gotraOption = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.name };
          } else {
            return null
          }
        });

      }
    })
    this.ApiParameterScript.fetchdata('nakshatra', { "projection": ["*"] }).subscribe((res: any) => {
      // 
      if (res.success && res['data'].length > 0) {
        this.nakhyatraOption = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.nakshatra_name };
          } else {
            return null
          }
        });

      }
    })

    this.ApiParameterScript.fetchdata('zodiacs', { "projection": ["*"], "whereConditions": { status: 1 } }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.zodiacsOptions = res['data'].map((obj: any) => {

          return { name: obj.name, display: `${obj.name} / ${obj.odia_name}` };

        });


      }
    })


  }

  horoscopeForm_submit() {


    if (this.horoscopeForm.valid) {
      var updateData = {
        "data": this.horoscopeForm.value,
        "whereConditions": { user_id: this.profile_id}
      }

      if (this.horoscopeForm.value.user_id == '') {
        updateData['data']['user_id']=this.profile_id
        this.ApiParameterScript.savedata('user_horoscope', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      } else {
        this.ApiParameterScript.updatedata('user_horoscope', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      }
    } else {

      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning')

    }





  }

  updatebasicDetailsForm() {

    var updateData = {
      "data": {
        user_fname: this.basicDetailsForm.value.user_fname,
        user_lname: this.basicDetailsForm.value.user_lname,
        user_email: this.basicDetailsForm.value.user_email,
        user_profileType: this.basicDetailsForm.value.user_profileType,
        user_gender: this.basicDetailsForm.value.user_gender,
        user_mother_toungh: this.basicDetailsForm.value.user_mother_toungh,
        user_marital_status: this.basicDetailsForm.value.user_marital_status,
        user_dob: moment(this.basicDetailsForm.value.user_dob).format('YYYY-MM-DD').toString(),
        user_has_complete_profile: 1
      },
      "whereConditions": {
        'user_id': this.profile_id
      }
    }
    this.ApiParameterScript.updatedata('user_info', updateData).subscribe((res: any) => {

      if (res.success) {
        Swal.fire('', res.message, 'success').then(() => {
          this.ngOnInit()
        })
      } else {
        Swal.fire('No Data Updated', res.message, 'error')
      }

    })

  }
  religionDetailsForm() {


    if (this.user_religionDetailsForm.valid) {
      var updateData = {
        "data": {
          user_religion: this.user_religionDetailsForm.value.user_religion,
          user_caste: this.user_religionDetailsForm.value.user_caste,
          user_subcaste: this.user_religionDetailsForm.value.user_subcaste,
          user_ID: this.profile_id,
          completed: 1
        },
        "whereConditions": { user_ID: this.profile_id }
      }

      if (this.user_religionDetailsForm.value.user_ID == '') {

        this.ApiParameterScript.savedata('user_religion', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      } else {
        this.ApiParameterScript.updatedata('user_religion', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      }
    } else {

      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning')

    }

  }
  updateEducation_ocupation() {


    if (this.education_occupationDetailsForm.valid) {


      this.education_occupationDetailsForm.value['completed'] = 1


      if (this.education_occupationDetailsForm.value.user_ID == '') {
        this.education_occupationDetailsForm.value['user_ID'] = this.profile_id
        var saveData = {
          "data": this.education_occupationDetailsForm.value
        }

        this.ApiParameterScript.savedata('user_education_occupations', saveData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      } else {
        var updateData = {
          "data": this.education_occupationDetailsForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        this.education_occupationDetailsForm.value['user_ID'] = this.profile_id
        this.ApiParameterScript.updatedata('user_education_occupations', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      }
    } else {

      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning')

    }
  }

  updateLocationForm() {


    if (this.locationDetailsForm.valid) {

      this.locationDetailsForm.value['completed'] = 1



      if (this.locationDetailsForm.value.user_ID == '') {
        this.locationDetailsForm.value['user_ID'] = this.profile_id
        var saveData = {
          "data": this.locationDetailsForm.value
        }
        this.ApiParameterScript.savedata('user_locations', saveData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      } else {
        var updateData = {
          "data": this.locationDetailsForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        this.locationDetailsForm.value['user_ID'] = this.profile_id
        this.ApiParameterScript.updatedata('user_locations', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      }
    } else {

      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning')

    }
  }

  onchangeAddress() {



    if (this.locationDetailsForm.value.user_current_and_permanent_address_same == 'Yes') {
      this.locationDetailsForm.value['user_Permanent_city'] = this.locationDetailsForm.value['user_city']
      this.locationDetailsForm.value['user_Permanent_state'] = this.locationDetailsForm.value['user_state']
      this.locationDetailsForm.value['user_Permanent_country'] = this.locationDetailsForm.value['user_country']
      this.locationDetailsForm.value['user_Permanent_Address'] = this.locationDetailsForm.value['user_Address']
    } else {
      this.locationDetailsForm.value['user_Permanent_city'] = null
      this.locationDetailsForm.value['user_Permanent_state'] = null
      this.locationDetailsForm.value['user_Permanent_country'] = null
      this.locationDetailsForm.value['user_Permanent_Address'] = null
    }


    this.locationDetailsForm.patchValue(this.locationDetailsForm.value)


  }


  updatefamilyDetailsForm() {

    if (this.userFamilyDetailsForm.valid) {
      this.userFamilyDetailsForm.value['completed'] = 1
      if (this.userFamilyDetailsForm.value.user_ID == '') {
        this.userFamilyDetailsForm.value['user_ID'] = this.profile_id
        var updateData = {
          "data": this.userFamilyDetailsForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }

        this.ApiParameterScript.savedata('user_family', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      } else {
        var updateData = {
          "data": this.userFamilyDetailsForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        this.ApiParameterScript.updatedata('user_family', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      }
    } else {

      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning')

    }
  }

  diethobbiesForm() {

    if (this.habitHobbiesForm.valid) {
      this.habitHobbiesForm.value['completed'] = 1
      if (this.habitHobbiesForm.value.user_ID == '') {
        this.habitHobbiesForm.value['user_ID'] = this.profile_id

        var updateData = {
          "data": this.habitHobbiesForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }

        this.ApiParameterScript.savedata('user_diet_hobbies', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      } else {
        var updateData = {
          "data": this.habitHobbiesForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        this.ApiParameterScript.updatedata('user_diet_hobbies', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      }
    } else {

      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning')

    }
  }

  userAboutFormSubmit() {
    if (this.userAboutDetailsForm.valid) {
      this.userAboutDetailsForm.value['completed'] = 1
      var updateData = {
        "data": {
          user_ID: this.profile_id,
          completed: 1,
          user_about: this.userAboutDetailsForm.value.user_about
        },
        "whereConditions": { user_ID: this.profile_id }
      }

      if (this.userAboutDetailsForm.value.user_ID == '') {

        this.ApiParameterScript.savedata('user_about', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      } else {
        this.ApiParameterScript.updatedata('user_about', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      }
    } else {

      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning')

    }
  }

  userPhysicaldetalsForm() {

    if (this.physicalDeatilsForm.valid) {
      this.physicalDeatilsForm.value['completed'] = 1
      if (this.physicalDeatilsForm.value.user_ID == '') {
        this.physicalDeatilsForm.value['user_ID'] = this.profile_id
        var updateData = {
          "data": this.physicalDeatilsForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }

        this.ApiParameterScript.savedata('user_physical_details', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      } else {
        var updateData = {
          "data": this.physicalDeatilsForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        this.ApiParameterScript.updatedata('user_physical_details', updateData).subscribe((res: any) => {

          if (res.success) {
            Swal.fire('', res.message, 'success').then(() => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('No Data Updated', res.message, 'error')
          }

        })

      }
    } else {

      Swal.fire('Warning', 'Please Fill All Input Fields', 'warning')

    }
  }




  onUpload(event: any) {
    var res = event.originalEvent['body'];
    console.log("event", event.files);

    if (res.success) {
      this.selecteduploadedFiles = []
      var getAllFile = res['data'] ? res['data'] : "";
      var uloadedImageFile = getAllFile.split(',');

      this.profileImage = `${this.appservices.getFilePath()}storage/${uloadedImageFile[0]}`
      uloadedImageFile.forEach((img: any) => {
        this.images.push(
          {
            "previewImageSrc": `${this.appservices.getFilePath()}storage/${img}`,
            "thumbnailImageSrc": `${this.appservices.getFilePath()}storage/${img}`,
            "alt": "01673172483.jpg",
            "title": "01673172483.jpg"
          }
        )

      })
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }

      Swal.fire("Success", res.message, 'success')

      // this.messageService.add({ severity: 'success', summary: 'success', detail: res.msg });
    } else {
      Swal.fire(res.message, 'Please Try After Follow Instruction', 'error')
      // this.messageService.add({ severity: 'error', summary: 'error', detail: res.msg });
    }

  }

  previewImage() {
    this.displayBasic = true
  }

  onSelectFile(event: any) {
    event.currentFiles.forEach((element: any) => {

      this.selecteduploadedFiles.push(
        {
          "previewImageSrc": element.objectURL.changingThisBreaksApplicationSecurity,
          "thumbnailImageSrc": element.objectURL.changingThisBreaksApplicationSecurity,
          "alt": "01673172483.jpg",
          "title": "01673172483.jpg"
        }
      )

    });





  }

  onClearSelectedFile() {
    console.log("Calling onClearSelectedFile");
    this.selecteduploadedFiles = this.images
  }

  onRemoveFile(event: any) {
    console.log("Calling onRemoveFile");
    _.remove(this.selecteduploadedFiles, item => item.previewImageSrc === event.file.objectURL.changingThisBreaksApplicationSecurity)

  }
  activeAccount() {
    // if (this.userAllData?.user_profile_status == 'Completed') {
    this.blockUI.start("Please Wait...")
    let param = {
      "id": this.profile_id
    }
    this.api.userActivation(param).subscribe((res: any) => {
      this.blockUI.stop()
      this.ngOnInit()
    })
    // } else {
    //   Swal.fire({
    //     text: 'Please Complete User Profile'
    //   })
    // }
  }

  public viewMemberimages() {


    const modalRef = this.modalService.open(ImageViewOperationComponent, { size: 'xl', scrollable: true });
    modalRef.componentInstance.user_id = this.profile_id



  }

  getSubcaste(caste: any) {
    this.ApiParameterScript.fetchdata('sub_cast', { "projection": ["*"], "whereConditions": { "cast_name": caste } }).subscribe((res: any) => {
      // 
      if (res.success && res['data'].length > 0) {
        this.religionSubcasteOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.sub_cast_name };
          } else {
            return null
          }
        });

      } else {
        this.religionSubcasteOptions = []
      }
    })
  }



  getstatefilter(country_name: any) {
    console.log("getstatefilter", country_name);
    this.ApiParameterScript.fetchdata('state', { "projection": ["*"], "whereConditions": { "country_name": country_name, "status": 1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {

        this.stateOption = res['data'].map((obj: any) => {

          return { name: obj.name };

        });


      } else {
        this.stateOption = []
        this.cityOption = []
      }

    });

  }

  getcityfilter(state_name: any) {
    console.log(state_name);
    this.ApiParameterScript.fetchdata('city', { "projection": ["*"], "whereConditions": { "state_name": state_name } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {

        this.cityOption = res['data'].map((obj: any) => {

          return { name: obj.city_name };

        });

      } else {
        this.cityOption = []
      }

    });

  }

  loadUploadComponent(){
    console.log(this.profile_id);
    
    const modalRef = this.modalService.open(ImageCroperComponent, { size: 'xl', backdrop: false, scrollable: true });
    modalRef.componentInstance.user_id=this.profile_id
 

  }
  public generatePDF() {
    
    this.blockUI.start("Generating PDF...")
    var pdfData =[_.cloneDeep(this.userAllData.user_info)];
    console.log("Click generatePDF", this.userAllData);
 
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4', // or 'letter', 'a3', etc.
    });

    // const pdf = new jsPDF();
    pdf.addImage("https://admin.choicemarriage.com/api/storage/logo_image/6521ccbea425d.png", 'JPEG', 65, 5, 0, 0); // adjust coordinates and dimensions accordingly
    // Sample data with text and image URLs
    _.map(pdfData, (res: any) => res.user_profile_image = "https://admin.choicemarriage.com/api/storage/" + res.user_profile_image)
    console.log("Click generatePDF", pdfData);

    const data = pdfData

    let yPos = 30;
    let currentPage = 1;
    data.forEach((record: any) => {
      console.log(record);
      console.log("pdf", pdf.internal.pageSize.getHeight());

      if (yPos + 60 > pdf.internal.pageSize.getHeight()) {
        pdf.addPage();
        currentPage++;
        yPos = 10; // Reset Y position for the new page
      }
      pdf.addImage(record.user_profile_image, 'JPEG', 10, yPos, 50, 50);
      pdf.text(`Name: ${record.user_fname}` + ' ' + `${record.user_lname}`, 70, yPos + 10);
      pdf.text(`Age: ${this.AgePipe.transform(record.user_dob)}`, 70, yPos + 25);
      // pdf.text(`Gender: ${record.user_gender}`, 70, yPos + 25);s

      pdf.text(`City: ${record.city ? record.city : "NA"}`, 70, yPos + 40);

      // Draw lines to separate records
      pdf.line(0, yPos + 60, 210, yPos + 60);

      // Move the Y position for the next record
      yPos += 70;
    });
   
    const pdfFileName='matching_report_' + `${'5555'}_` + moment().toString() + '.pdf'
    pdf.save(pdfFileName,{returnPromise:true}).then((res:any)=>{
      // console.log(res);
      this.blockUI.stop()
      
    });

  }
}
