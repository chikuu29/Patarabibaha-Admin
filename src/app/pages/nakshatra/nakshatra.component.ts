import { Component, OnInit } from '@angular/core';
import { offset } from '@popperjs/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nakshatra',
  templateUrl: './nakshatra.component.html',
  styleUrls: ['./nakshatra.component.scss']
})
export class NakshatraComponent implements OnInit {
  nakshatra: any;
  nakshatrasearch: any;
  filterText: any;
  collectionSize: number = 0
  page: number = 1
  totalCount: number = 0
  totalFetchrecord: number = 0
  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.nakhetre();
  }

  getSearchText(event: any) {
    console.log(event);

    this.filterText = event
  }
  onpageChnage(){
    // this.nakhetre()
  }
  nakhetre() {
    
    let param = {
      'status': 23,
    }
    this.api.nakshatra(param).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.nakshatra = res.message;
      }


    })
  }

  showFilterData() {
    let param = {
      'nakhetra': this.nakshatrasearch,
      'status': 24
    }

    this.api.nakshatra(param).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.nakshatra = res.message;
      }


    })

  }

}
