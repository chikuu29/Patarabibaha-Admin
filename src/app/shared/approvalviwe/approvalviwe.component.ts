import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Table } from 'primeng/table';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approvalviwe',
  templateUrl: './approvalviwe.component.html',
  styleUrls: ['./approvalviwe.component.scss'],
})
export class ApprovalviweComponent implements OnInit {
  id: string;
  userfullname: any;
  imageUrl: any = environment.filePath + 'storage/successstory/';
  successStoryForm = new FormGroup({
    id: new FormControl('', Validators.required),
    login_name: new FormControl('', Validators.required),
    partner_name: new FormControl('', Validators.required),
    ring_exchange_date: new FormControl('', Validators.required),
    marriage_date: new FormControl('', Validators.required),
    life_after_marriage: new FormControl('', Validators.required),
    wedding_photo: new FormControl(''),
  });
  imageSrc: any;
  image: any;
  userfullnamemale: any;
  userfullnamefemale: any;
  searchControl1 = new FormControl('');
  searchControl2 = new FormControl('');
  filteredOptions1: any[];
  filteredOptions2: any[];
  constructor(
    public modal: NgbActiveModal,
    private ApiParameterScript: ApiParameterScript,
    private appservices: AppService,
    private apiservice: ApiService
  ) {
    // Subscribe to changes in each search input value
  }

  ngOnInit(): void {
    
    this.getuserMale();
    this.getuserFemale();
    if (this.id != '') {
      let query = `
    SELECT *
    FROM success_story_by_user
    WHERE id = ${this.id}
    `;

      this.ApiParameterScript.fetchDataFormQuery(query).subscribe(
        (res: any) => {
          
          if (res.success && res['data'].length > 0) {
            //this.alldata = res['data'][0];
            this.successStoryForm.patchValue(res['data'][0]);
            this.image = res['data'][0].wedding_photo;
            
          }
        }
      );
    }
    this.searchControl1.valueChanges.subscribe((value: any) => {
      this.filteredOptions1 = this.filterOptions(value, this.userfullnamemale);
    });

    this.searchControl2.valueChanges.subscribe((value: any) => {
      this.filteredOptions2 = this.filterOptions(value, this.userfullnamefemale);
    });
  }

  // Function to filter options based on the search query
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

  closeModal() {
    this.modal.close();
  }
  getuserMale() {
    let query = `
    SELECT user_full_name,user_phone_no,user_id
    FROM user_info WHERE user_gender = 'Male' AND user_status = 'Approved'
    `;

    this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.filteredOptions1 = res['data'];
        this.userfullnamemale =  res['data'];
      }
    });
  }

  getuserFemale() {
    let query = `
    SELECT user_full_name,user_phone_no,user_id
    FROM user_info WHERE user_gender = 'Female' AND user_status = 'Approved'
    `;

    this.ApiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.filteredOptions2 = res['data'];
        this.userfullnamefemale = res['data'];
      }
    });
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
    this.image = false;
    this.successStoryForm.patchValue({
      wedding_photo: this.imageSrc,
    });
    
  }
  approve() {
    let date1 = moment(this.successStoryForm.value.marriage_date).format(
      'YYYY-MM-DD'
    );
    this.successStoryForm.patchValue({
      marriage_date: date1,
    });
    let date2 = moment(this.successStoryForm.value.ring_exchange_date).format(
      'YYYY-MM-DD'
    );
    this.successStoryForm.patchValue({
      ring_exchange_date: date2,
    });
    this.apiservice
      .successStory(this.successStoryForm.value)
      .subscribe((res: any) => {
        this.modal.close();
      });
  }
}
