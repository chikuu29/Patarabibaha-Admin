import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-viweplan',
  templateUrl: './viweplan.component.html',
  styleUrls: ['./viweplan.component.scss']
})
export class ViweplanComponent implements OnInit {
  allplandata :any;
  constructor(
    private api:ApiService
  ) { }

  ngOnInit(): void {
    this.getallplain();
  }

  getallplain(){
    let parma = {
      'id':''
    }
    this.api.getAllData(parma).subscribe((res:any)=>{
      if(res.status){
        this.allplandata = res.message;
        console.log(this.allplandata);
        
      }
    })
  }
  update(data:any){

  }

}
