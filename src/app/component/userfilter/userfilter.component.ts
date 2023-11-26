import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userfilter',
  templateUrl: './userfilter.component.html',
  styleUrls: ['./userfilter.component.scss']
})
export class UserfilterComponent implements OnInit {

  @Input() user_id:string
  motherTounghOptions: any[] = [];
  countryOption: any = [
    { 'name': 'India' }

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

  religionOptions: any = []
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

  maritalOptions: any = [
    { "name": "Single" },
    { "name": "Married" },
    { "name": "Divorced" },
    { "name": "Widowed" },
    { "name": "Separated" }
  ]
  ocupationOptions: any = []

  employeeInOptions: any = [];

  anualIncomeOptions: any = [];
  zodiacsOptions:any=[]
  nakshatraOptions:any=[]
  gotraOptions:any=[]

  partnerPreferenceForm = new FormGroup({
    user_ID: new FormControl('', []),
    user_min_height: new FormControl('', [Validators.required]),
    user_max_height: new FormControl('', [Validators.required]),
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
    user_nakshatra: new FormControl('', [Validators.required]),
    user_zodiacs: new FormControl('', [Validators.required]),
    user_gotra: new FormControl('', [Validators.required]),
  })
  constructor(
    private ApiParameterScript:ApiParameterScript,
    private appservices:AppService
  
  ) { }

  ngOnInit(): void {


    var apiData={
      "projection":['*'],
      "whereConditions":{ user_ID: this.user_id }
    }
    
    
    // this.ApiParameterScript.fetchdata("user_partnerpreference",apiData).subscribe((res:any)=>{
    
      
    //   if (res.success && res['data'].length>0) {
    //     this.partnerPreferenceForm.patchValue(JSON.parse(res['data'][0]['json_data']))
    //     this.getstatefilter(this.partnerPreferenceForm.value.user_country)
    //     this.getcityfilter(this.partnerPreferenceForm.value.user_state)
    //   }
    // })

    this.ApiParameterScript.fetchdata('occupation', { "projection": ["*"] }).subscribe((res: any) => {
      
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

    this.ApiParameterScript.fetchdata('employer_in', { "projection": ["*"] }).subscribe((res: any) => {
      


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
    this.ApiParameterScript.fetchdata('religion', { "projection": ["*"],"whereConditions":{ status: 1 } }).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.religionOptions = res['data'].map((obj: any) => {
            return { name: obj.religion_name };
        });
        console.log(this.religionOptions);

      }






    })
    this.ApiParameterScript.fetchdata('country', { "projection": ["*"] }).subscribe((res: any) => {
      
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
    this.ApiParameterScript.fetchdata('gotra', { "projection": ["*"] ,"whereConditions":{status:1}}).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.gotraOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.name };
          } else {
            return null
          }
        });
      
      }
    })
    this.ApiParameterScript.fetchdata('nakshatra', { "projection": ["*"] ,"whereConditions":{status:1}}).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.nakshatraOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.nakshatra_name};
          } else {
            return null
          }
        });
      
      }
    })
    this.ApiParameterScript.fetchdata('zodiacs', { "projection": ["*"] ,"whereConditions":{status:1}}).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.zodiacsOptions = res['data'].map((obj: any) => {
          if (obj.status == 1) {
            return { name: obj.name ,display:  `${obj.name} / ${obj.odia_name}`};
          } else {
            return null
          }
        });
      
      }
    })
  }

  userupartnerpreferenceForm_submit() {
    
    let updateData = {
      "data": this.partnerPreferenceForm.value,
      "whereConditions": { user_ID: this.user_id},
      "isJsonData": true,
      "jsonDataID": { user_ID: this.user_id }
    }
    this.ApiParameterScript.savedata('user_partnerpreference', updateData).subscribe((res: any) => {
     
      if (res.success) {
        Swal.fire('success', res.message, 'success').then(() => {
          this.ngOnInit()
        })
      } else {
        Swal.fire('No Data Updated', res.message, 'error')
      }

    })
  }

  getstatefilter(country_name: any) {
    
   
    if (_.isArray(country_name)) {
      let query = `SELECT * FROM state WHERE status=1 AND country_name IN (${"'" + country_name.join("', '") + "'"})`;
      this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {

          this.stateOption = res['data'].map((obj: any) => {

            return { name: obj.name };

          });
          

        } else {
          this.stateOption = []
          this.partnerPreferenceForm.controls.user_state.reset()
        }

      })

    } else {
      this.ApiParameterScript.fetchdata('state', { "projection": ["*"], "whereConditions": { "country_name": country_name, "status": 1 } }).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {

          this.stateOption = res['data'].map((obj: any) => {

            return { name: obj.name };

          });
          

        } else {
          this.stateOption = []
          this.partnerPreferenceForm.controls.user_state.reset()
        }

      });
    }

  }

  getcityfilter(state_name: any) {
    
  
    if (_.isArray(state_name)) {
      let query = `SELECT * FROM city WHERE state_name IN (${"'" + state_name.join("', '") + "'"})`;
      
      
      this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {

          this.cityOption = res['data'].map((obj: any) => {

            return { name: obj.city_name };

          });
          

        } else {
          this.cityOption = []
          this.partnerPreferenceForm.controls.user_city.reset()
        }

      })

    } else {
      this.ApiParameterScript.fetchdata('city', { "projection": ["*"], "whereConditions": { "state_name": state_name } }).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {

          this.cityOption = res['data'].map((obj: any) => {

            return { name: obj.city_name };

          });

        } else {
          this.cityOption = []
          this.partnerPreferenceForm.controls.user_city.reset()
        }

      });
    }

  }

}
