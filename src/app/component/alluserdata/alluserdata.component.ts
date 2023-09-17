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
  finaldata: any = [];
  filterText:string
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }
  date: any;
  ngOnInit(): void {
    this.getAllData();
    this.date = new Date();

  }

  getAllData() {
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
      }
    });
  }
  deletedata(data: any, deleted: any) {

    if (deleted == 1) {

      Swal.fire({
        icon: 'question',
        text: 'Do you want to Delete',
        showCancelButton: true,
      }).then((r: any) => {
        console.log(r);
        if (r.isConfirmed) {
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
        } else {

        }

      })


    } else if (deleted == 0) {

      Swal.fire({
        icon: 'question',
        text: 'Do you want to Recover',
        showCancelButton: true,
      }).then((r: any) => {
        if (r.isConfirmed) {
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
        } else {

        }
      });

    }
  }
  publishuser(data: any) {

    Swal.fire({
      icon: 'question',
      text: 'Do you want to publish',
      showCancelButton: true,
    }).then((r: any) => {
      console.log(r);
      if (r.isConfirmed) {
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
    });

  }
  unpublishuser(data: any) {
    // alert(data);

    Swal.fire({
      icon: 'question',
      text: 'Do you want to publish',
      showCancelButton: true,
    }).then((r: any) => {
      //console.log(r);
      if (r.isConfirmed) {
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
    });
   
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }
  makeonline(data:any){
    Swal.fire({
      icon: 'question',
      text: 'Do you want make this user online',
      showCancelButton: true,
    }).then((r: any) => {
      //console.log(r);
      if (r.isConfirmed) {
        let updateData = {
          "data": {
            "online_status": 1,
          },
          "whereConditions": { user_id: data }
        }
        this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: "Done"
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
    });
  }
  makeoffline(data:any){
    Swal.fire({
      icon: 'question',
      text: 'Do you want make this user offline',
      showCancelButton: true,
    }).then((r: any) => {
      //console.log(r);
      if (r.isConfirmed) {
        let updateData = {
          "data": {
            "online_status": 0,
          },
          "whereConditions": { user_id: data }
        }
        this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: "Done"
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
    });
  }
}
