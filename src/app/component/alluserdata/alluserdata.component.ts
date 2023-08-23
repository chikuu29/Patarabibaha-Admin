import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alluserdata',
  templateUrl: './alluserdata.component.html',
  styleUrls: ['./alluserdata.component.scss']
})
export class AlluserdataComponent implements OnInit {
  alldata: any;

  constructor(
    private ApiParameter: ApiParameterScript,
    private router:Router
  ) { }

  ngOnInit(): void {
    this. getAllData();
  }

  getAllData() {


    this.ApiParameter.fetchdata('user_info', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.alldata = res['data'];
      }


    })

  }
  deletedata(data:any,deleted:any){
    
    if(deleted == 1){
      let updateData = {
        "data": {
          "deleted": 0,
        },
        "whereConditions": { user_id: data }
      }
      this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
        // console.log(res);
        if (res.success) {
          Swal.fire({
            icon: 'success',
            text: "deleted"
          }).then(() => {
            this.ngOnInit()
          });
        } else {
          Swal.fire({
            icon: 'warning',
            text: res.message
          });
        }
      })

    }else if(deleted == 0){
      let updateData = {
        "data": {
          "deleted": 1,
        },
        "whereConditions": { user_id: data }
      }
      this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
        // console.log(res);
        if (res.success) {
          Swal.fire({
            icon: 'success',
            text: "Recoverad"
          }).then(() => {
            this.ngOnInit()
          });
        } else {
          Swal.fire({
            icon: 'warning',
            text: res.message
          });
        }
      })
    }
  }
  publishuser(data:any){
    let updateData = {
      "data": {
        "status": 1,
      },
      "whereConditions": { user_id: data }
    }
    this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
      // console.log(res);
      if (res.success) {
        Swal.fire({
          icon: 'success',
          text: "Publish"
        }).then(() => {
          this.ngOnInit()
        });
      } else {
        Swal.fire({
          icon: 'warning',
          text: res.message
        });
      }
    })
  }
  unpublishuser(data:any){
    let updateData = {
      "data": {
        "status": 0,
      },
      "whereConditions": { user_id: data }
    }
    this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
      // console.log(res);
      if (res.success) {
        Swal.fire({
          icon: 'success',
          text: "Unpublish"
        }).then(() => {
          this.ngOnInit()
        });
      } else {
        Swal.fire({
          icon: 'warning',
          text: res.message
        });
      }
    })
  }
  userpage(data:any){
      this.router.navigate(['/user',data]);
  }
}
