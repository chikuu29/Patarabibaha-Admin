import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginevent',
  templateUrl: './loginevent.component.html',
  styleUrls: ['./loginevent.component.scss']
})
export class LogineventComponent implements OnInit {
  login_page_event_pop_up = new FormGroup({
    content: new FormControl('', [Validators.required]),
    created_At: new FormControl(''),
    id: new FormControl('')
  });
  event: any;
  filterText: any;
  butten: string = 'Submit';
  constructor(
    private apiparameterscript: ApiParameterScript,
  ) { }

  ngOnInit(): void {
    this.login_page_event_pop_up = new FormGroup({
      content: new FormControl(''),
      created_At: new FormControl(''),
      id: new FormControl('')
    });
    this.getEvent();
    this.butten = 'Submit';
  }
  public() {
    if (this.butten == 'Submit') {
      if (this.login_page_event_pop_up.value.content == null || this.login_page_event_pop_up.value.content == '' || this.login_page_event_pop_up.value.content == undefined) {
        Swal.fire({
          icon: 'error',
          text: 'Content Cant be Blank'
        })
      } else {
        let updateData = {
          "data": {
            'content': this.login_page_event_pop_up.value.content,
            'created_At': moment().toISOString(),
          }
        }
        this.apiparameterscript.savedata('login_page_event_pop_up', updateData).subscribe((res: any) => {
          if (res.status) {
            Swal.fire({
              icon: 'success',
              text: "SubAdmin Created"
            }).then(() => {
              this.ngOnInit();
            });
          }
        })
      }
    } else if (this.butten == 'Update') {
      if (this.login_page_event_pop_up.value.content == null || this.login_page_event_pop_up.value.content == '' || this.login_page_event_pop_up.value.content == undefined) {
        Swal.fire({
          icon: 'error',
          text: 'Content Cant be Blank'
        })
      } else {
        let updateData = {
          "data": {
            'content': this.login_page_event_pop_up.value.content,
            'created_At': moment().toISOString(),
          },
          "whereConditions": { id: this.login_page_event_pop_up.value.id }
        }
        this.apiparameterscript.updatedata('login_page_event_pop_up', updateData).subscribe((res: any) => {
          if (res.status) {
            Swal.fire({
              icon: 'success',
              text: "SubAdmin Created"
            }).then(() => {
              this.ngOnInit();
            });
          }
        })
      }
    }


  }

  getEvent() {
    this.apiparameterscript.fetchdata('login_page_event_pop_up', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success) {
        this.event = res['data'];
      }
    })


  }
  edit(id: any) {
    this.apiparameterscript.fetchdata('login_page_event_pop_up', { "projection": ["*"], "whereConditions": { id: id } }).subscribe((res: any) => {
      if (res.success) {
        //this.event = res['data'];
        this.butten = 'Update'
        this.login_page_event_pop_up.patchValue(res['data'][0])
      }
    })
  }
  delete(id: any) {
    this.apiparameterscript.deletedata('login_page_event_pop_up', { "whereConditions": { id: id } }).subscribe((res: any) => {
      if (res.success) {
        Swal.fire('Success', res.message, 'success').then(() => {
          this.ngOnInit()
        });
      }
    })
  }

  publish(id: any, states: any) {
    if (states == 1) {

      Swal.fire({
        icon: 'question',
        text: 'Do You Want Unpublish'
      }).then((respo: any) => {
        if (respo.isConfirmed) {
          let updateData = {
            "data": {
              'states': 0,
            },
            "whereConditions": { id: id }
          }
          this.apiparameterscript.updatedata('login_page_event_pop_up', updateData).subscribe((res: any) => {
            if (res.status) {
              Swal.fire({
                icon: 'success',
                text: "SubAdmin Created"
              }).then(() => {
                this.ngOnInit();
              });
            }
          })
        }
      });


    }
    else if (states == 0) {
      Swal.fire({
        icon: 'question',
        text: 'Do You Want Publish'
      }).then((respo: any) => {
        if(respo.isConfirmed){
          let updateData = {
            "data": {
              'states': 0,
            },
            "whereConditions": { states: 1 }
          }
          this.apiparameterscript.updatedata('login_page_event_pop_up', updateData).subscribe((res: any) => {
            let updateData = {
              "data": {
                'states': 1,
              },
              "whereConditions": { id: id }
            }
            this.apiparameterscript.updatedata('login_page_event_pop_up', updateData).subscribe((res: any) => {
              if (res.status) {
                Swal.fire({
                  icon: 'success',
                  text: "SubAdmin Created"
                }).then(() => {
                  this.ngOnInit();
                });
              }
            })
    
          })
        }
       // console.log(respo);

      });

     
    }
  }

}
