import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-partner-preference',
  templateUrl: './partner-preference.component.html',
  styleUrls: ['./partner-preference.component.scss'],
})
export class PartnerPreferenceComponent implements OnInit {
  @Input() showOnlyRegistrationPage: boolean = false;
  @Input() user_id:string
  motherTounghOptions: any[] = [];
  ageerrormsg:any = false;
  highterror:any = false;
  anualincomeerroe =  false;
  countryOption: any = [{ name: 'India' }];
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

  stateOption: any = [
    { name: 'Andhra Pradesh' },
    { name: 'Arunachal Pradesh' },
    { name: 'Assam' },
    { name: 'Bihar' },
    { name: 'Chhattisgarh' },
    { name: 'Goa' },
    { name: 'Gujarat' },
    { name: 'Haryana' },
    { name: 'Himachal Pradesh' },
    { name: 'Jharkhand' },
    { name: 'Karnataka' },
    { name: 'Kerala' },
    { name: 'Madhya Pradesh' },
    { name: 'Maharashtra' },
    { name: 'Manipur' },
    { name: 'Meghalaya' },
    { name: 'Mizoram' },
    { name: 'Nagaland' },
    { name: 'Odisha' },
    { name: 'Punjab' },
    { name: 'Rajasthan' },
    { name: 'Sikkim' },
    { name: 'Tamil Nadu' },
    { name: 'Telangana' },
    { name: 'Tripura' },
    { name: 'Uttar Pradesh' },
    { name: 'Uttarakhand' },
    { name: 'West Bengal' },
  ];
  cityOption: any = [
    { name: 'Puri' },
    { name: 'Khordha' },
    { name: 'Cuttack' },
    { name: 'Bhubaneswar' },
    { name: 'Mumbai' },
    { name: 'Delhi' },
    { name: 'Bangalore' },
    { name: 'Kolkata' },
    { name: 'Chennai' },
    { name: 'Hyderabad' },
    { name: 'Ahmedabad' },
    { name: 'Pune' },
    { name: 'Surat' },
    { name: 'Jaipur' },
    { name: 'Lucknow' },
    { name: 'Kanpur' },
    { name: 'Nagpur' },
    { name: 'Patna' },
    { name: 'Indore' },
    { name: 'Vadodara' },
    { name: 'Bhopal' },
    { name: 'Coimbatore' },
    { name: 'Ludhiana' },
    { name: 'Kochi' },
    { name: 'Visakhapatnam' },
    { name: 'Agra' },
    { name: 'Varanasi' },
    { name: 'Madurai' },
    { name: 'Meerut' },
    { name: 'Nashik' },
    { name: 'Rajkot' },
    { name: 'Amritsar' },
    { name: 'Srinagar' },
    { name: 'Aurangabad' },
  ];

  religionOptions: any = [
    { name: 'Hinduism' },
    { name: 'Islam' },
    { name: 'Christianity' },
    { name: 'Sikhism' },
    { name: 'Buddhism' },
    { name: 'Jainism' },
    { name: 'Zoroastrianism' },
    { name: "Bahá'í Faith" },
    { name: 'Judaism' },
  ];
  religionCasteOptions: any = [
    { name: 'Hinduism' },
    { name: 'Islam' },
    { name: 'Christianity' },
    { name: 'Sikhism' },
    { name: 'Buddhism' },
    { name: 'Jainism' },
    { name: 'Zoroastrianism' },
    { name: "Bahá'í Faith" },
    { name: 'Judaism' },
  ];

  religionSubcasteOptions: any = [
    { name: 'Hinduism' },
    { name: 'Islam' },
    { name: 'Christianity' },
    { name: 'Sikhism' },
    { name: 'Buddhism' },
    { name: 'Jainism' },
    { name: 'Zoroastrianism' },
    { name: "Bahá'í Faith" },
    { name: 'Judaism' },
  ];
  Mangalik: any = [{ name: 'Yes' }, { name: 'No' }];

  maritalOptions: any = [
    { name: 'Single' },
    { name: 'Married' },
    { name: 'Divorced' },
    { name: 'Widowed' },
    { name: 'Separated' },
  ];

   ageOptions:any[] = [
    { name: 18 },
    { name: 19 },
    { name: 20 },
    { name: 21 },
    { name: 22 },
    { name: 23 },
    { name: 24 },
    { name: 25 },
    { name: 26 },
    { name: 27 },
    { name: 28 },
    { name: 29 },
    { name: 30 },
    { name: 31 },
    { name: 32 },
    { name: 33 },
    { name: 34 },
    { name: 35 },
    { name: 36 },
    { name: 37 },
    { name: 38 },
    { name: 39 },
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
    // { name: 61 },
    // { name: 62 },
    // { name: 63 },
    // { name: 64 },
    // { name: 65 },
    // { name: 66 },
    // { name: 67 },
    // { name: 68 },
    // { name: 69 },
    // { name: 70 },
    // { name: 71 },
    // { name: 72 },
    // { name: 73 },
    // { name: 74 },
    // { name: 75 },
    // { name: 76 },
    // { name: 77 },
    // { name: 78 },
    // { name: 79 },
    // { name: 80 },
    // { name: 81 },
    // { name: 82 },
    // { name: 83 },
    // { name: 84 },
    // { name: 85 },
    // { name: 86 },
    // { name: 87 },
    // { name: 88 },
    // { name: 89 },
    // { name: 90 },
    // { name: 91 },
    // { name: 92 },
    // { name: 93 },
    // { name: 94 },
    // { name: 95 },
    // { name: 96 },
    // { name: 97 },
    // { name: 98 },
    // { name: 99 },
    // { name: 100 }
];

  Colouroption = [
    { name: 'Wheatish' },
    { name: 'Very Fair' },
    { name: 'Fair' },
    { name: 'Wheatish Brown' },
    { name: 'Dark' },
  ];
  Bodytypeoption = [
    { name: 'Average' },
    { name: 'Heavy' },
    { name: 'Slim' },
    { name: 'Athletic' },
  ];
  FamilyValue: any = [
    { name: 'Traditional' },
    { name: 'Moderate' },
    { name: 'Doesnot Matter' },
  ];
  FamilyStatus: any = [
    { name: 'Rich' },
    { name: 'Middle Class' },
    { name: 'Upper Middle Class' },
    { name: 'Upper Class' },
    { name: 'Lower Middle Class' },
    { name: 'Upper-Lower Class' },
    { name: 'Lower Class' },
  ];
  Designation = [];
  Qulification = [];

  ocupationOptions: any = [];

  employeeInOptions: any = [];

  anualIncomeOptions: any = [];
  zodiacsOptions: any = [];
  nakshatraOptions: any = [];
  gotraOptions: any = [];

  partnerPreferenceForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_min_height: new FormControl('', [Validators.required]),
    user_max_height: new FormControl('', [Validators.required]),
    user_religion: new FormControl('', [Validators.required]),
    user_country: new FormControl(''),
    user_marital_status: new FormControl('', [Validators.required]),
    user_state: new FormControl(''),
    user_city: new FormControl(''),
    user_employed_In: new FormControl(''),
    user_occupation: new FormControl(''),
    user_mother_toungh: new FormControl(''),
    user_min_anual_income: new FormControl(''),
    user_max_anual_income: new FormControl(''),
    user_nakshatra: new FormControl(''),
    user_zodiacs: new FormControl(''),
    user_gotra: new FormControl(''),
    to_user_age: new FormControl('', [Validators.required]),
    from_user_age: new FormControl('', [Validators.required]),
    user_cast: new FormControl('', [Validators.required]),
    user_complextion: new FormControl(''),
    user_body_type: new FormControl(''),
    user_highest_education: new FormControl(''),
    user_deg: new FormControl(''),
    user_family_value: new FormControl(''),
    user_family_status: new FormControl(''),
    user_mangalik: new FormControl(''),
  });
  cast: any = [];
  constructor(
    private ApiParameterScript: ApiParameterScript,
    private appservices: AppService
  ) {}

  ngOnInit(): void {
    var apiData = {
      projection: ['*'],
      whereConditions: { user_ID: this.user_id },
    };
    this.ApiParameterScript.fetchdata(
      'user_partnerpreference',
      apiData
    ).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.partnerPreferenceForm.patchValue(
          JSON.parse(res['data'][0]['json_data'])
        );
        this.getstatefilter(this.partnerPreferenceForm.value.user_country);
        this.getcityfilter(this.partnerPreferenceForm.value.user_state);
      }
    });

    this.ApiParameterScript.fetchdata('occupation', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
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

    this.ApiParameterScript.fetchdata('employer_in', {
      projection: ['*'],
    }).subscribe((res: any) => {
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
    this.ApiParameterScript.fetchdata('religion', {
      projection: ['*'],
    }).subscribe((res: any) => {
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
    this.ApiParameterScript.fetchdata(
      'country',
      { projection: ['*'], whereConditions: { status: 1 } },
      0,
      250
    ).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.countryOption = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.name };
          } else {
            return null;
          }
        });
        this.countryOption.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });
    this.ApiParameterScript.fetchdata('gotra', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.gotraOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.name };
          } else {
            return null;
          }
        });
        this.gotraOptions.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });
    this.ApiParameterScript.fetchdata('cast_table', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.cast = res['data'].map((obj: any) => {
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
    this.ApiParameterScript.fetchdata('nakshatra', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.nakshatraOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.nakshatra_name };
          } else {
            return null;
          }
        });
        this.nakshatraOptions.sort((a: any, b: any) =>
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
          if (obj.status == 1) {
            return {
              name: obj.name,
              display: `${obj.name} / ${obj.odia_name}`,
            };
          } else {
            return null;
          }
        });
        this.zodiacsOptions.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });

    this.ApiParameterScript.fetchdata('designation', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.Designation = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return {
              name: obj.designation,
            };
          } else {
            return null;
          }
        });
        this.Designation.sort((a: any, b: any) => a.name.localeCompare(b.name));
      }
    });
    this.ApiParameterScript.fetchdata('highest_education', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.Qulification = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return {
              name: obj.highest_education_name,
            };
          } else {
            return null;
          }
        });
        this.Qulification.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      }
    });
  }



  userupartnerpreferenceForm_submit() {
    if (this.partnerPreferenceForm.valid) {
      console.log(this.partnerPreferenceForm.value);

      let updateData = {
        data: this.partnerPreferenceForm.value,
        whereConditions: { user_ID: this.user_id },
        isJsonData: true,
        jsonDataID: { user_ID: this.user_id },
      };
      this.ApiParameterScript.savedata(
        'user_partnerpreference',
        updateData
      ).subscribe((res: any) => {
        if (res.success) {
          Swal.fire('success', res.message, 'success').then(() => {
            this.ngOnInit();
          });
        } else {
          Swal.fire('No Data Updated', res.message, 'error');
        }
      });
    }
  }

  getstatefilter(country_name: any) {
    if (_.isArray(country_name)) {
      let query = `SELECT * FROM state WHERE status=1 AND country_name IN (${
        "'" + country_name.join("', '") + "'"
      })`;
      this.ApiParameterScript.fetchDataFormQuery(query).subscribe(
        (res: any) => {
          if (res.success && res['data'].length > 0) {
            this.stateOption = res['data'].map((obj: any) => {
              return { name: obj.name };
            });
          } else {
            this.stateOption = [];
            this.partnerPreferenceForm.controls.user_state.reset();
          }
        }
      );
    } else {
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
          this.partnerPreferenceForm.controls.user_state.reset();
        }
      });
      this.stateOption.sort((a: any, b: any) => a.name.localeCompare(b.name));
    }
  }

  getcityfilter(state_name: any) {
    if (_.isArray(state_name)) {
      let query = `SELECT * FROM city WHERE state_name IN (${
        "'" + state_name.join("', '") + "'"
      })`;
      this.ApiParameterScript.fetchDataFormQuery(query).subscribe(
        (res: any) => {
          if (res.success && res['data'].length > 0) {
            this.cityOption = res['data'].map((obj: any) => {
              return { name: obj.city_name };
            });
          } else {
            this.cityOption = [];
            this.partnerPreferenceForm.controls.user_city.reset();
          }
        }
      );
    } else {
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
          this.partnerPreferenceForm.controls.user_city.reset();
        }
      });
      this.cityOption.sort((a: any, b: any) => a.name.localeCompare(b.name));
    }
  }
  userupartnerpreferenceFormSubmitForReg() {
    if (this.partnerPreferenceForm.valid) {
      let updateData = {
        data: this.partnerPreferenceForm.value,
        whereConditions: { user_ID: this.user_id },
        isJsonData: true,
        jsonDataID: { user_ID: this.user_id },
      };
      this.ApiParameterScript.savedata(
        'user_partnerpreference',
        updateData
      ).subscribe((res: any) => {
        if (res.success) {
          Swal.fire({
            icon: 'success',
            title: res.message,
            text: 'success',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.ApiParameterScript.getprofile({
                userid: this.user_id,
              }).subscribe((res: any) => {
                if (res.success) {
                  if (res?.user_profile_status == 'Completed') {
                    let change = {
                      data: {
                        user_all_table_complited: 1,
                      },
                      whereConditions: {
                        user_id: this.user_id,
                      },
                    };
                    this.ApiParameterScript.updatedata(
                      'user_info',
                      change
                    ).subscribe((res: any) => {
                      console.log(res);

                      if (res.success) {
                        location.reload();
                      } else {
                        location.reload();
                      }
                    });
                  }
                }
              });
            }
          });
        } else {
          Swal.fire('No Data Updated', res.message, 'error');
        }
      });
    } else {
      console.log(this.partnerPreferenceForm.valid);
      console.log(this.highterror);
      console.log(this.ageerrormsg);
      console.log(this.partnerPreferenceForm.valid && this.highterror && this.ageerrormsg);
    }
  }

  onFromAgeChange(event: any) {
    const FromAge: any = this.partnerPreferenceForm.value.from_user_age;
    const ToAge: any = this.partnerPreferenceForm.value.to_user_age;

    if (FromAge < ToAge) {
      this.partnerPreferenceForm.controls['to_user_age'].setErrors(null);
      this.ageerrormsg = false; // Clear validation error
    } else {
      this.ageerrormsg = true;
      this.partnerPreferenceForm.setErrors({ invalidRange: true });
    }
  }

  onToAgeChange(event: any) {
    const FromAge: any = this.partnerPreferenceForm.value.from_user_age;
    const ToAge: any = this.partnerPreferenceForm.value.to_user_age;
    if (ToAge != null || ToAge != '') {
      if (FromAge < ToAge) {
        this.partnerPreferenceForm.controls['from_user_age'].setErrors(null); // Clear validation error
        this.ageerrormsg = false;
      } else {
        this.ageerrormsg = true;
        this.partnerPreferenceForm.setErrors({ invalidRange: true });
      }
    }
  }

  onMinHeightChange(event: any) {
    const minHeight: any = this.partnerPreferenceForm.value.user_min_height;
    const maxHeight: any = this.partnerPreferenceForm.value.user_max_height;

    if (minHeight < maxHeight) {
      this.partnerPreferenceForm.controls['user_max_height'].setErrors(null); // Clear validation error
      this.highterror = false;
    } else {
      this.highterror = true;
      this.partnerPreferenceForm.setErrors({ invalidRange: true });
    }
  }

  onMaxHeightChange(event: any) {
    const minHeight: any = this.partnerPreferenceForm.value.user_min_height;
    const maxHeight: any = this.partnerPreferenceForm.value.user_max_height;

    if (minHeight < maxHeight) {
      this.partnerPreferenceForm.controls['user_min_height'].setErrors(null); // Clear validation error
      this.highterror = false;
    } else {
      this.highterror = true;
      this.partnerPreferenceForm.setErrors({ invalidRange: true });
    }
  }

  onMinIncomeChange(event: any) {
    const minIncome: any =
      this.partnerPreferenceForm.value.user_min_anual_income;
    const maxIncome: any =
      this.partnerPreferenceForm.value.user_max_anual_income;

    if (minIncome < maxIncome) {
      this.partnerPreferenceForm.controls['user_max_anual_income'].setErrors(
        null
      ); // Clear validation error
      this.anualincomeerroe = false;
    } else {
      this.partnerPreferenceForm.controls['user_max_anual_income'].setErrors({
        invalidRange: true,
      }); // Set validation error
      this.anualincomeerroe = true;
    }
  }

  onMaxIncomeChange(event: any) {
    const minIncome: any =
      this.partnerPreferenceForm.value.user_min_anual_income;
    const maxIncome: any =
      this.partnerPreferenceForm.value.user_max_anual_income;

    if (minIncome < maxIncome) {
      this.partnerPreferenceForm.controls['user_min_anual_income'].setErrors(
        null
      ); // Clear validation error
      this.anualincomeerroe = false;
    } else {
      this.partnerPreferenceForm.controls['user_min_anual_income'].setErrors({
        invalidRange: true,
      }); // Set validation error
      this.anualincomeerroe = true;
    }
  }
}
