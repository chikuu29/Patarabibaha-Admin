import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
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
      this.blockUI.start('Please Wait..')
      this.api.city(parma).subscribe((res:any)=>{
        this.blockUI.stop()
        if(res.status){
          this.allcitydata = res.message
        }
      })
  }

}
