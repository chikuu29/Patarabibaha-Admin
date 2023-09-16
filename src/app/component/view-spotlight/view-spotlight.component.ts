import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-spotlight',
  templateUrl: './view-spotlight.component.html',
  styleUrls: ['./view-spotlight.component.scss']
})
export class ViewSpotlightComponent implements OnInit {
  finaldata: any;
  femaleclass: any;
  maleclass: any;
  name:string = 'FEMALE';
  constructor(
    private router: Router,
    private ApiParameter: ApiParameterScript,
  ) { }

  ngOnInit(): void {
    this.change();
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }
  change(){
    //alert(data);
    if(this.name == 'FEMALE'){
      this.name = 'MALE';
      this.female();
    }else if(this.name == 'MALE'){
      this.name = 'FEMALE'
      this.male();
    }
  }
  male() {
    // this.maleclass = 'btn btn-primary btn-lg btn-block d-none';
    // this.femaleclass = 'btn btn-primary btn-lg btn-block';
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_status: 'Approved', user_gender: 'male' ,spotlight:1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    })
  }
  female() {
    // this.maleclass = 'btn btn-primary btn-lg btn-block';
    // this.femaleclass = 'btn btn-primary btn-lg btn-block d-none';
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_status: 'Approved', user_gender: 'female',spotlight:1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    })
  }
  remove(fname: any, lname: any, id: any) {
    Swal.fire({
      icon: 'question',
      text: 'Do you want to make remove ' + fname + ' ' + lname + ' from spotlight profile'
    }).then((responcer: any) => {
      if (responcer.isConfirmed) {
        let updateData = {
          "data": {
            "spotlight": 0,
          },
          "whereConditions": { user_id: id }
        }
        this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: 'Now ' + fname + ' ' + lname + ' is removed'
            }).then(()=>{
              if(this.name == 'MALE'){
                //this.name = 'MALE';
                this.female();
              }else if(this.name == 'FEMALE'){
                ///this.name = 'FEMALE'
                this.male();
              }
            }); 
          }
        });
      }
    })
  }

}
