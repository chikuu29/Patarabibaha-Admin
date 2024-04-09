import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-fillter-modal',
  templateUrl: './fillter-modal.component.html',
  styleUrls: ['./fillter-modal.component.scss'],
})
export class FillterModalComponent implements OnInit {
  motherTounghOptions: any[] = [];
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

  religionOptions: any = [];
  religionCasteOptions: any = [];
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

  maritalOptions: any = [
    { name: 'Single' },
    { name: 'Married' },
    { name: 'Divorced' },
    { name: 'Widowed' },
    { name: 'Separated' },
  ];
  ocupationOptions: any = [];

  employeeInOptions: any = [];

  anualIncomeOptions: any = [];
  zodiacsOptions: any = [];
  nakshatraOptions: any = [];
  gotraOptions: any = [];
  aducationalOptions: any = [];
  ageOptions: any = [
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
  ];
  colour: any = [
    { name: 'Wheatish' },
    { name: 'Very Fair' },
    { name: 'Fair' },
    { name: 'Wheatish Brown' },
    { name: 'Dark' },
  ];
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
  physicalStatusOptions: any = [
    { name: 'Normal' },
    { name: 'Physical Chalenges' },
  ];
  familystatusOptions: any = [
    { name: 'Rich' },
    { name: 'Middle Class' },
    { name: 'Upper Middle Class' },
    { name: 'Upper Class' },
    { name: 'Lower Middle Class' },
    { name: 'Upper-Lower Class' },
    { name: 'Lower Class' },
  ];
  familyvalueOptions: any = [
    { name: 'Traditional' },
    { name: 'Moderate' },
    { name: 'Doesnot Matter' }
  ];
  fillterForm = new FormGroup({
    user_id: new FormControl('', []),
    user_gender: new FormControl([], []),
    user_physical_status: new FormControl([], []),
    user_min_age: new FormControl(18, [Validators.required]),
    user_max_age: new FormControl(50, [Validators.required]),
    user_body_type: new FormControl([], []),
    user_mangalik: new FormControl([], []),
    user_highest_education: new FormControl([], []),
    user_min_height: new FormControl(137, [Validators.required]),
    user_max_height: new FormControl(213, [Validators.required]),
    user_religion: new FormControl([], []),
    user_country: new FormControl([], []),
    user_marital_status: new FormControl([], []),
    user_state: new FormControl([], []),
    user_city: new FormControl([], []),
    user_employed_In: new FormControl([], []),
    user_occupation: new FormControl([], []),
    user_mother_toungh: new FormControl([], []),
    user_min_anual_income: new FormControl(0, [Validators.required]),
    user_max_anual_income: new FormControl(9999999, [Validators.required]),
    user_nakhyatra: new FormControl([], []),
    user_zodiacs: new FormControl([], []),
    user_gotra: new FormControl([], []),
    user_caste: new FormControl([], []),
    user_complextion: new FormControl([], []),
    user_deg: new FormControl([], []),
    user_family_value: new FormControl([], []),
    user_family_status: new FormControl([], []),
  });

  @Input() selectedFillterValue: any = {};
  degOptions: any;
  constructor(
    private ApiParameterScript: ApiParameterScript,
    private appservices: AppService,
    private commonservice: CommonService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.ApiParameterScript.fetchdata('highest_education', {
      projection: ['*'],
    }).subscribe((res: any) => {
      //
      if (res.success && res['data'].length > 0) {
        this.aducationalOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.highest_education_name };
          } else {
            return null;
          }
        });
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
      }
    });
    this.ApiParameterScript.fetchdata('annual_income', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.anualIncomeOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.annualincome };
          } else {
            return null;
          }
        });
      }
    });

    this.ApiParameterScript.fetchdata('mother_tongue', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.motherTounghOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.mother_tongue_name };
          } else {
            return null;
          }
        });
      }
    });

    this.ApiParameterScript.fetchdata('employer_in', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.employeeInOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.Employer_in_name };
          } else {
            return null;
          }
        });
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
      }
    });
    this.ApiParameterScript.fetchdata('religion', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.religionOptions = res['data'].map((obj: any) => {
          return { name: obj.religion_name };
        });
        console.log(this.religionOptions);
      }
    });

    this.ApiParameterScript.fetchdata('cast_table', {
      projection: ['*'],
      whereConditions: { status: 1 },
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
      }
    });
    this.ApiParameterScript.fetchdata('country', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.countryOption = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.name };
          } else {
            return null;
          }
        });
      }
    });
    this.ApiParameterScript.fetchdata('annual_income', {
      projection: ['*'],
      whereConditions: { status: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.anualIncomeOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.annualincome };
          } else {
            return null;
          }
        });
        console.log(this.anualIncomeOptions);
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
      }
    });
    if (Object.keys(this.selectedFillterValue).length > 0) {
      this.fillterForm.patchValue(this.selectedFillterValue);
    }
  }
  removeBlankProperties(obj: any) {
    const result: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value !== '' && (!Array.isArray(value) || value.length > 0)) {
        result[key] = value;
      }
    }

    return result;
  }
  hasCommonValue(arr1: any, arr2: any) {
    return _.some(arr2, (value) => _.includes(arr1, value));
  }
  getSelection() {
    // { "TABLE NAME": ['field_name'] }
    const tableKeyMapping: any = {
      user_info: ['user_id', 'user_gender', 'user_marital_status'],
      user_religion: ['user_caste', 'user_religion'],
      user_education_occupations: [
        'user_occupation',
        'user_employed_In',
        'user_highest_education',
        'user_deg',
      ],
      user_locations: ['user_country', 'user_state', 'user_city'],
      user_horoscope: [
        'user_gotra',
        'user_nakhyatra',
        'user_zodiacs',
        'user_mangalik',
      ],
      user_physical_details: [
        'user_body_type',
        'user_physical_status',
        'user_complextion',
      ],
      user_family: ['user_family_value', 'user_family_status'],
    };
    const fillterData: any = this.removeBlankProperties(this.fillterForm.value);

    console.log('fillterData', fillterData);

    const filteredtableKeyMappingObject = _.pickBy(
      _.mapValues(tableKeyMapping, (values) =>
        values.filter((value: any) => Object.keys(fillterData).includes(value))
      ),
      (values) => values.length > 0
    );

    console.log(filteredtableKeyMappingObject);

    var query = '';
    Object.keys(filteredtableKeyMappingObject).forEach((table, i) => {
      // console.log("index",index);
      var condition1 =
        Object.keys(filteredtableKeyMappingObject).length - 1 != i
          ? true
          : false;

      filteredtableKeyMappingObject[table].forEach(
        (key: string, index: number) => {
          var condition =
            filteredtableKeyMappingObject[table].length - 1 != index ||
            condition1
              ? ' AND '
              : '';
          // console.log("yydyd", condition);
          var gen = '';
          if (
            fillterData[key] &&
            typeof fillterData[key] === 'string' &&
            fillterData[key] != ''
          ) {
            gen = `${table}.${key}='${fillterData[key]}'`;
            query += gen;
          } else if (fillterData[key] && fillterData[key].length > 0) {
            gen = `${table}.${key} IN (${fillterData[key]
              .map((value: any) => `'${value}'`)
              .join(',')})`;
            query += gen;
          }
          if (
            Object.keys(fillterData).includes(key) &&
            Object.keys(fillterData).length > 1
          ) {
            query += condition;
          }
        }
      );
    });

    console.log('Query', query);

    this.modal.close({
      whereConditions:
        `WHERE  user_info.user_age BETWEEN ${
          this.fillterForm.value.user_min_age
        } AND ${
          this.fillterForm.value.user_max_age
        } AND user_physical_details.user_height BETWEEN ${
          this.fillterForm.value.user_min_height
        } AND ${
          this.fillterForm.value.user_max_height
        } AND user_education_occupations.user_anual_income BETWEEN ${
          this.fillterForm.value.user_min_anual_income
        } AND ${this.fillterForm.value.user_max_anual_income}  ${
          query == '' ? ' ' : 'AND'
        } ` + query,
      isqueryGenerated: true,
      selectedFillterValue: this.fillterForm.value,
    });
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
            this.fillterForm.controls.user_state.reset();
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
          this.fillterForm.controls.user_state.reset();
        }
      });
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
            this.fillterForm.controls.user_city.reset();
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
          this.fillterForm.controls.user_city.reset();
        }
      });
    }
  }
}
