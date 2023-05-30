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
  constructor(
    private api:ApiService,
  ) { }

  ngOnInit(): void {
    this.showCountry();
  }

  addCountry(){
      let param = {
        'country':this.country,
        'status':21,
      }
      this.api.insertCountry(param).subscribe((res:any)=>{
          if(res.status){
            Swal.fire({
              icon:'success',
              text:res.message
            }).then((res:any)=>{
              location.reload();
            })
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