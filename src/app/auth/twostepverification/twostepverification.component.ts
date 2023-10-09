import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-twostepverification',
  templateUrl: './twostepverification.component.html',
  styleUrls: ['./twostepverification.component.scss']
})
export class TwostepverificationComponent implements OnInit {
  user_id: any;
  id: any;
  fname: any;
  lname: any;
  first: boolean;
  second: boolean;
  third: boolean;
  password: any;
  seconddata: any;
  firstdata: any;
  firsterror: string = '';
  seconderror: string = '';
  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private CommonService: CommonService
  ) { }

  ngOnInit(): void {
    this.first = false;
    this.second = true;
    this.third = true;
    this.firstdata='';
    this.seconddata = '';
    this.password = '';
    this.activatedroute.params.subscribe((res: any) => {
      let encryptSecretKey = 'Lipun';
      let bytes = CryptoJS.AES.decrypt(res.id, encryptSecretKey);
      let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      if (data != '') {
        this.user_id = data.split(':');
        this.id = this.user_id[0];
        this.fname = this.user_id[1];
        this.lname = this.user_id[2]
        //console.log(this.user_id);
      }
    });
  }
  firstPass() {
    let data = {
      'first': this.firstdata
    }
    this.CommonService.firstPass(data).subscribe((res: any) => {
      if (res.status) {
        this.first = true;
        this.second = false;
        this.third = true;

      } else {
        this.firsterror = 'Wrong password'
      }
    })
  }
  secondPass() {
    let data = {
      'second': this.seconddata
    }
    this.CommonService.secondPass(data).subscribe((res: any) => {
      if (res.status) {
        this.first = true;
        this.second = true;
        this.third = false;

      } else {
        this.seconderror = 'Wrong password'
      }
    })
  }
  changepass() {
    let data = {
      'user_id': this.id,
      'pass': this.password,
    }
    this.CommonService.passwordresetbyadmin(data).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          icon:'success',
          text:'password chaned'
        }).then(()=>{
          this.ngOnInit();
        });
      }
    })
  }
}
