import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  allcitydata:any;
  constructor(
    private api:ApiService
  ) { }

  ngOnInit(): void {
    this.getcitydata();
  }
  getcitydata(){
      let parma ={
        'status':25
      }
      this.api.city(parma).subscribe((res:any)=>{
        if(res.status){
          this.allcitydata = res.message
        }
      })
  }

}
