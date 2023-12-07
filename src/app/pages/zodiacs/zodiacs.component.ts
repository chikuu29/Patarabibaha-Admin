import { Component, OnInit } from '@angular/core';
import { offset } from '@popperjs/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-zodiacs',
  templateUrl: './zodiacs.component.html',
  styleUrls: ['./zodiacs.component.scss']
})
export class ZodiacsComponent implements OnInit {
  zodiacs: any;
  zodiacsalldata: any;
  filterText: any;
  collectionSize: number = 0
  page: number = 1
  totalCount: number = 0
  totalFetchrecord: number = 0
  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getAllZodiacdata();
  }

  getSearchText(event: any) {
    console.log(event);

    this.filterText = event
  }
  onpageChnage() {
    // this.getAllZodiacdata()
  }
  showFilterData() {
    let param = {
      'rasi': this.zodiacs,
      'status': 24
    }
    this.api.zodiacs(param).subscribe((res: any) => {
      // console.log(res);
      if (res.status) {
        this.zodiacsalldata = res.message
      }
    });
  }

  getAllZodiacdata() {
    let param = {
      'status': 23
    }
    // let offset = this.page * 10 - 10
    this.api.zodiacs(param).subscribe((res: any) => {
      // this.totalFetchrecord = offset+res['count']
      // this.totalCount = res['totalCount']
      // this.collectionSize = res['totalCount']
      // console.log(res);
      if (res.status) {
        this.zodiacsalldata = res.message
      }
    });
  }

}
