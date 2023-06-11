import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contry',
  templateUrl: './contry.component.html',
  styleUrls: ['./contry.component.scss']
})
export class ContryComponent implements OnInit {
  country:any;
  countryalldata: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];
  constructor(
    private api:ApiService,
  ) { }

  ngOnInit(): void {
    this.showCountry();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1; 
  } 

  showFilterData(){
    // alert(this.country);
      let param = {
        'country':this.country,
        'status':22,
      }
      this.api.insertCountry(param).subscribe((res:any)=>{
          if(res.status){
            this.countryalldata = res.message
          }
      })
  }

  showCountry(){
    let param = {
      'status':211,
    }
    this.api.insertCountry(param).subscribe((res:any)=>{
      if(res.status){
        this.countryalldata = res.message
        console.log(this.countryalldata);
        
      }
  })
  }

}