import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-zodiacs',
  templateUrl: './zodiacs.component.html',
  styleUrls: ['./zodiacs.component.scss']
})
export class ZodiacsComponent implements OnInit {
  zodiacs :any;
  zodiacsalldata:any;
  filterText:any;
  constructor(
    private api:ApiService
  ) { }

  ngOnInit(): void {
    this.getAllZodiacdata();
  }

  showFilterData(){
    let param = {
      'rasi':this.zodiacs,
      'status': 24
    }
    this.api.zodiacs(param).subscribe((res:any)=>{
       // console.log(res);
        if(res.status){
          this.zodiacsalldata = res.message
        }
    });
  }

  getAllZodiacdata(){
    let param = {
      'status': 23
    }
    this.api.zodiacs(param).subscribe((res:any)=>{
       // console.log(res);
        if(res.status){
          this.zodiacsalldata = res.message
        }
    });
  }

}
