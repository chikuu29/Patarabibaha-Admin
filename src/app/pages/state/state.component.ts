import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  state:any;
  countryalldata: any;
  countryid:any;
  statealldata: any;
  
  constructor(
    private api:ApiService
  ) { }

  ngOnInit(): void {
    this.countryid = 0;
    this.showCountry();
    this.showstate();
  }

  addState(){
    alert(this.countryid)
      let param = {
        'status':21,
        'countryid':this.countryid,
        'state':this.state
      }
      
      this.api.state(param).subscribe((res:any)=>{
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
        this.countryalldata = res.message;
        //console.log(this.countryalldata);
      }
  })
  }
  showstate(){
    let param = {
      'status':211,
    }
    this.api.state(param).subscribe((res:any)=>{
      if(res.status){
        this.statealldata = res.message;
        console.log(this.statealldata);
      }
    })
  }

  checkall(e:any){
    let check = document.querySelectorAll('.checkbox')
  }
  filterstate(){
    let param = {
      'country':this.countryid,
      'status':22,
    }
    this.api.state(param).subscribe((res:any)=>{
      if(res.status){
        this.statealldata = res.message;
        console.log(this.statealldata);
      }
    })
  }
  statefilter(){
    // alert(this.countryid);
    // alert(this.state);
    let param = {
      'country':this.countryid == 0 ?'':this.countryid,
      'state':this.state,
      'status':23,
    }
    this.api.state(param).subscribe((res:any)=>{
      if(res.status){
        this.statealldata = res.message;
        console.log(this.statealldata);
      }
    })
  }

}
