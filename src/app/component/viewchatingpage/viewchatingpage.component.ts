import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-viewchatingpage',
  templateUrl: './viewchatingpage.component.html',
  styleUrls: ['./viewchatingpage.component.scss']
})
export class ViewchatingpageComponent implements OnInit {

  constructor(
    private ActivatedRoute :ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((res:any)=>{
      let encryptSecretKey = 'Lipun@123';
      const bytes = CryptoJS.AES.decrypt(res.id, encryptSecretKey);
      let data =  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      

    });
  }

}
