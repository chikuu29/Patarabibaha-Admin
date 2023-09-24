import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  Buttan:any ;
  couponcode = new FormGroup({
    
  });
  constructor() { }

  ngOnInit(): void {
    this.Buttan = 'Submit';
  }

}
