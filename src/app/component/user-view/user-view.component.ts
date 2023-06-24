import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
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
  motherTounghOptions: any[] = [
    { "name": "Assamese" },
    { "name": "Bengali" },
    { "name": "Bodo" },
    { "name": "Dogri" },
    { "name": "Gujarati" },
    { "name": "Hindi" },
    { "name": "Kannada" },
    { "name": "Kashmiri" },
    { "name": "Konkani" },
    { "name": "Maithili" },
    { "name": "Malayalam" },
    { "name": "Manipuri" },
    { "name": "Marathi" },
    { "name": "Nepali" },
    { "name": "Odia" },
    { "name": "Punjabi" },
    { "name": "Sanskrit" },
    { "name": "Santali" },
    { "name": "Sindhi" },
    { "name": "Tamil" },
    { "name": "Telugu" },
    { "name": "Urdu" }
  ]
  maritalOptions: any = [
    { "name": "Single" },
    { "name": "Married" },
    { "name": "Divorced" },
    { "name": "Widowed" },
    { "name": "Separated" }
  ]


  religionOptions: any = [
    { "name": "Hinduism" },
    { "name": "Islam" },
    { "name": "Christianity" },
    { "name": "Sikhism" },
    { "name": "Buddhism" },
    { "name": "Jainism" },
    { "name": "Zoroastrianism" },
    { "name": "Bahá'í Faith" },
    { "name": "Judaism" }
  ]
  religionCasteOptions: any = [
    { "name": "Hinduism" },
    { "name": "Islam" },
    { "name": "Christianity" },
    { "name": "Sikhism" },
    { "name": "Buddhism" },
    { "name": "Jainism" },
    { "name": "Zoroastrianism" },
    { "name": "Bahá'í Faith" },
    { "name": "Judaism" }
  ]

  religionSubcasteOptions: any = [
    { "name": "Hinduism" },
    { "name": "Islam" },
    { "name": "Christianity" },
    { "name": "Sikhism" },
    { "name": "Buddhism" },
    { "name": "Jainism" },
    { "name": "Zoroastrianism" },
    { "name": "Bahá'í Faith" },
    { "name": "Judaism" }
  ]


  aducationalOptions: any = [
    { 'name': 'Bachelor of Technology (B.Tech)' },
    { 'name': 'Bachelor of Engineering (B.E)' },
    { 'name': 'Bachelor of Arts (B.A)' },
    { 'name': 'Bachelor of Science (B.Sc)' },
    { 'name': 'Bachelor of Commerce (B.Com)' },
    { 'name': 'Master of Technology (M.Tech)' },
    { 'name': 'Master of Engineering (M.E)' },
    { 'name': 'Master of Arts (M.A)' },
    { 'name': 'Master of Science (M.Sc)' },
    { 'name': 'Master of Commerce (M.Com)' },
    { 'name': 'Doctor of Philosophy (Ph.D)' },
    { 'name': 'Diploma in Engineering' },
    { 'name': 'Diploma in Business Administration (DBA)' },
    { 'name': 'Bachelor of Medicine, Bachelor of Surgery (MBBS)' },
    { 'name': 'Bachelor of Dental Surgery (BDS)' },
    { 'name': 'Bachelor of Pharmacy (B.Pharm)' },
    { 'name': 'Bachelor of Ayurvedic Medicine and Surgery (BAMS)' },
    { 'name': 'Bachelor of Homeopathic Medicine and Surgery (BHMS)' },
    { 'name': 'Bachelor of Veterinary Science (B.V.Sc)' },
    { 'name': 'Chartered Accountancy (CA)' },
    { 'name': 'Company Secretary (CS)' },
    { 'name': 'Cost and Management Accountancy (CMA)' },
    { 'name': 'Bachelor of Education (B.Ed)' },
    { 'name': 'Bachelor of Physical Education (B.P.Ed)' },
    { 'name': 'Bachelor of Fine Arts (BFA)' }
  ]

  ocupationOptions: any = [
    { 'name': 'Software Engineer' },
    { 'name': 'Civil Engineer' },
    { 'name': 'Engineer' },
    { 'name': 'Doctor' },
    { 'name': 'Teacher' },
    { 'name': 'Lawyer' },
    { 'name': 'Artist' },
    { 'name': 'Chef' },
    { 'name': 'Architect' },
    { 'name': 'Writer' },
    { 'name': 'Accountant' },
    { 'name': 'Musician' },
    { 'name': 'Athlete' },
    { 'name': 'Designer' },
    { 'name': 'Scientist' },
    { 'name': 'Entrepreneur' },
    { 'name': 'Police Officer' },
    { 'name': 'Firefighter' },
    { 'name': 'Pilot' },
    { 'name': 'Actor/Actress' },
    { 'name': 'Journalist' },
    { 'name': 'Salesperson' },
    { 'name': 'Nurse' },
    { 'name': 'Electrician' },
    { 'name': 'Mechanic' },
    { 'name': 'Carpenter' },
    { 'name': 'Plumber' }
  ]

  employeeInOptions: any = [
    { 'name': 'Private' },
    { 'name': 'Government' },
    { 'name': 'Self-employed' },
    { 'name': 'Freelancer' },
    { 'name': 'Non-profit organization' },
    { 'name': 'Startup' },
    { 'name': 'Corporate' },
    { 'name': 'Academic/Research' },
    { 'name': 'Healthcare' },
    { 'name': 'Retail' },
    { 'name': 'Hospitality' },
    { 'name': 'IT/Technology' },
    { 'name': 'Finance/Banking' },
    { 'name': 'Media/Entertainment' },
    { 'name': 'Construction' },
    { 'name': 'Transportation/Logistics' },
    { 'name': 'Education' },
    { 'name': 'Manufacturing' },
    { 'name': 'Consulting' },
    { 'name': 'Legal' },
    { 'name': 'Real Estate' },
    { 'name': 'Energy/Utilities' },
    { 'name': 'Agriculture' },
    { 'name': 'Fashion/Beauty' },
    { 'name': 'Telecommunications' },
    { 'name': 'Automotive' }
  ]

  anualIncomeOptions: any = [
    { 'name': 50000 },
    { 'name': 60000 },
    { 'name': 70000 },
    { 'name': 80000 },
    { 'name': 90000 },
    { 'name': 100000 },
    { 'name': 150000 },
    { 'name': 200000 },
    { 'name': 250000 },
    { 'name': 300000 },
    { 'name': 400000 },
    { 'name': 500000 },
    { 'name': 600000 },
    { 'name': 700000 },
    { 'name': 800000 },
    { 'name': 900000 },
    { 'name': 1000000 },
    { 'name': 1500000 },
    { 'name': 2000000 },
    { 'name': 2500000 },
    { 'name': 3000000 },
    { 'name': 4000000 },
    { 'name': 5000000 },
    { 'name': 6000000 },
    { 'name': 7000000 },
    { 'name': 8000000 },
    { 'name': 9000000 },
    { 'name': 10000000 }
  ]


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

  stateOption: any = [
    { 'name': 'Andhra Pradesh' },
    { 'name': 'Arunachal Pradesh' },
    { 'name': 'Assam' },
    { 'name': 'Bihar' },
    { 'name': 'Chhattisgarh' },
    { 'name': 'Goa' },
    { 'name': 'Gujarat' },
    { 'name': 'Haryana' },
    { 'name': 'Himachal Pradesh' },
    { 'name': 'Jharkhand' },
    { 'name': 'Karnataka' },
    { 'name': 'Kerala' },
    { 'name': 'Madhya Pradesh' },
    { 'name': 'Maharashtra' },
    { 'name': 'Manipur' },
    { 'name': 'Meghalaya' },
    { 'name': 'Mizoram' },
    { 'name': 'Nagaland' },
    { 'name': 'Odisha' },
    { 'name': 'Punjab' },
    { 'name': 'Rajasthan' },
    { 'name': 'Sikkim' },
    { 'name': 'Tamil Nadu' },
    { 'name': 'Telangana' },
    { 'name': 'Tripura' },
    { 'name': 'Uttar Pradesh' },
    { 'name': 'Uttarakhand' },
    { 'name': 'West Bengal' }
  ]
  cityOption: any = [
    { 'name': 'Puri' },
    { 'name': 'Khordha' },
    { 'name': 'Cuttack' },
    { 'name': 'Bhubaneswar' },
    { 'name': 'Mumbai' },
    { 'name': 'Delhi' },
    { 'name': 'Bangalore' },
    { 'name': 'Kolkata' },
    { 'name': 'Chennai' },
    { 'name': 'Hyderabad' },
    { 'name': 'Ahmedabad' },
    { 'name': 'Pune' },
    { 'name': 'Surat' },
    { 'name': 'Jaipur' },
    { 'name': 'Lucknow' },
    { 'name': 'Kanpur' },
    { 'name': 'Nagpur' },
    { 'name': 'Patna' },
    { 'name': 'Indore' },
    { 'name': 'Vadodara' },
    { 'name': 'Bhopal' },
    { 'name': 'Coimbatore' },
    { 'name': 'Ludhiana' },
    { 'name': 'Kochi' },
    { 'name': 'Visakhapatnam' },
    { 'name': 'Agra' },
    { 'name': 'Varanasi' },
    { 'name': 'Madurai' },
    { 'name': 'Meerut' },
    { 'name': 'Nashik' },
    { 'name': 'Rajkot' },
    { 'name': 'Amritsar' },
    { 'name': 'Srinagar' },
    { 'name': 'Aurangabad' }
  ]


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


  profileDetailsForm = new FormGroup({
    profile_id: new FormControl('', [Validators.required]),
    profile_name: new FormControl('', [Validators.required]),
    profile_email: new FormControl('', [Validators.required]),
    profile_phone: new FormControl('', [Validators.required])
  });

  basicDetailsForm = new FormGroup({
    user_fname: new FormControl('', [Validators.required]),
    user_lname: new FormControl('', [Validators.required]),
    user_email: new FormControl('', [Validators.required]),
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


  partnerPreferenceForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_height: new FormControl('', [Validators.required]),
    user_religion: new FormControl('', [Validators.required]),
    user_country: new FormControl('', [Validators.required]),
    user_marital_status: new FormControl('', [Validators.required]),
    user_state: new FormControl('', [Validators.required]),
    user_city: new FormControl('', [Validators.required]),
    user_employed_In: new FormControl('', [Validators.required]),
    user_occupation: new FormControl('', [Validators.required]),
    user_mother_toungh: new FormControl('', [Validators.required]),
    user_min_anual_income: new FormControl('', [Validators.required]),
    user_max_anual_income: new FormControl('', [Validators.required]),
  })


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

  profile_id:string='';



  userAllData: any
  constructor(
    private appservices: AppService,
    private ApiParameterScript: ApiParameterScript,
    private router:Router,
    private _rout: ActivatedRoute ,
    private api :ApiService
  ) { }

  ngOnInit(): void {
    this.uploadURL = `${this.appservices.getApipath()}upload?q=${this.profile_id}`
    console.log(this.appservices.authStatus);
    this.profile = this.appservices.authStatus
    // this.profileDetailsForm.patchValue(this.appservices.authStatus)
    this.blockUI.start("Loading...")

    this._rout.params.subscribe((res: any) => {
      this.profile_id=res['profile_id']
      console.log(this.profile_id);
      this.ApiParameterScript.getprofile({ userid: this.profile_id }).subscribe((res: any) => {
        console.log(res);
        this.blockUI.stop();
        if (res.success) {
          this.userAllData = res;

          this.profileDetailsForm.patchValue({profile_id:res?.user_info?.user_id
            ,profile_name:res?.user_info?.user_fname +' '+res?.user_info?.user_lname,profile_email:res?.user_info?.user_email,profile_phone:''});
          this.user_religionDetailsForm.patchValue(res['user_religion'])
          this.education_occupationDetailsForm.patchValue(res['user_education_occupations'])
          this.userAboutDetailsForm.patchValue(res['user_about'])
          this.locationDetailsForm.patchValue(res['user_locations'])
          this.userFamilyDetailsForm.patchValue(res['user_family'])
          this.habitHobbiesForm.patchValue(res['user_diet_hobbies'])
          this.physicalDeatilsForm.patchValue(res['user_physical_details'])
          this.partnerPreferenceForm.patchValue(res['user_partnerpreference'])
          this.basicDetailsForm.patchValue(res['user_info'])
        } else {
  
        }
  
      })
      
    })
   
  }

  updatebasicDetailsForm() {
    console.log(this.basicDetailsForm.value);
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
      console.log(res);
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
    console.log("religionDetailsForm", this.user_religionDetailsForm.value);

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
      console.log(updateData);
      if (this.user_religionDetailsForm.value.user_ID == '') {
        console.log("need to Save");
        this.ApiParameterScript.savedata('user_religion', updateData).subscribe((res: any) => {
          console.log(res);
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
          console.log(res);
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
    console.log("religionDetailsForm", this.education_occupationDetailsForm);

    if (this.education_occupationDetailsForm.valid) {
   

      this.education_occupationDetailsForm.value['completed'] = 1
     

      if (this.education_occupationDetailsForm.value.user_ID == '') {
        this.education_occupationDetailsForm.value['user_ID'] = this.profile_id
        var saveData = {
          "data": this.education_occupationDetailsForm.value
        }
        console.log("need to Save");
        this.ApiParameterScript.savedata('user_education_occupations', saveData).subscribe((res: any) => {
          console.log(res);
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
          console.log(res);
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
    console.log(this.locationDetailsForm);

    if (this.locationDetailsForm.valid) {
      
      this.locationDetailsForm.value['completed'] = 1

     
    
      if (this.locationDetailsForm.value.user_ID == '') {
        this.locationDetailsForm.value['user_ID'] = this.profile_id
        var saveData = {
          "data": this.locationDetailsForm.value
        }
        this.ApiParameterScript.savedata('user_locations', saveData).subscribe((res: any) => {
          console.log(res);
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
          console.log(res);
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

    console.log(this.locationDetailsForm);

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
    console.log(this.userFamilyDetailsForm);
    if (this.userFamilyDetailsForm.valid) {
      this.userFamilyDetailsForm.value['completed'] = 1
      if (this.userFamilyDetailsForm.value.user_ID == '') {
        this.userFamilyDetailsForm.value['user_ID'] = this.profile_id
        var updateData = {
          "data": this.userFamilyDetailsForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        console.log("need to Save");
        this.ApiParameterScript.savedata('user_family', updateData).subscribe((res: any) => {
          console.log(res);
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
          console.log(res);
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
    console.log(this.habitHobbiesForm);
    if (this.habitHobbiesForm.valid) {
      this.habitHobbiesForm.value['completed'] = 1
      if (this.habitHobbiesForm.value.user_ID == '') {
        this.habitHobbiesForm.value['user_ID'] = this.profile_id

        var updateData = {
          "data": this.habitHobbiesForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        console.log("need to Save");
        this.ApiParameterScript.savedata('user_diet_hobbies', updateData).subscribe((res: any) => {
          console.log(res);
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
          console.log(res);
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
      console.log(updateData);
      if (this.userAboutDetailsForm.value.user_ID == '') {
        console.log("need to Save");
        this.ApiParameterScript.savedata('user_about', updateData).subscribe((res: any) => {
          console.log(res);
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
          console.log(res);
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
    console.log(this.physicalDeatilsForm);
    if (this.physicalDeatilsForm.valid) {
      this.physicalDeatilsForm.value['completed'] = 1
      if (this.physicalDeatilsForm.value.user_ID == '') {
        this.physicalDeatilsForm.value['user_ID'] = this.profile_id
        var updateData = {
          "data": this.physicalDeatilsForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        console.log("need to Save");
        this.ApiParameterScript.savedata('user_physical_details', updateData).subscribe((res: any) => {
          console.log(res);
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
          console.log(res);
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


  userupartnerpreferenceForm_submit() {
    console.log(this);
    if (this.partnerPreferenceForm.valid) {
      if (this.partnerPreferenceForm.value.user_ID == '') {
        this.partnerPreferenceForm.value['user_ID'] = this.profile_id
        var updateData = {
          "data": this.partnerPreferenceForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        console.log("need to Save");
        this.ApiParameterScript.savedata('user_partnerpreference', updateData).subscribe((res: any) => {
          console.log(res);
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
          "data": this.partnerPreferenceForm.value,
          "whereConditions": { user_ID: this.profile_id }
        }
        this.ApiParameterScript.updatedata('user_partnerpreference', updateData).subscribe((res: any) => {
          console.log(res);
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




  // imagesUpload


  onUpload(event: any) {
    var res = event.originalEvent['body'];
    console.log("event", event.files);
    console.log(res);
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


    console.log("this", this.selecteduploadedFiles);


  }

  onClearSelectedFile() {
    console.log("Calling onClearSelectedFile");

    this.selecteduploadedFiles = this.images

  }

  onRemoveFile(event: any) {
    console.log("Calling onRemoveFile");
    _.remove(this.selecteduploadedFiles, item => item.previewImageSrc === event.file.objectURL.changingThisBreaksApplicationSecurity)

  }



  activeAccount(data:any) {

    if(data == 1){

      Swal.fire({
        text : 'plx complit'
      })

    }else if(data == 2){
      this.blockUI.start("Please Wait...")
     
      let param = {
        "id" : this.profile_id
      }
      this.api.userActivation(param).subscribe((res:any)=>{
          
      })
  
    }



   

  }


}
