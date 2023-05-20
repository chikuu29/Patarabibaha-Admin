import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';  
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI ;
  // **************************
  redirectUrl: any = ''
  // Validators.pattern("^W-([A-Z]{5,5})([@_])([0-9]{3,5})$")
  loginForm = new FormGroup({
    userID: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    checkme: new FormControl('', [Validators.required])
  });
  constructor(
    private activeroute: ActivatedRoute,
    private Title:Title,    
  ) { }

  ngOnInit(): void {
    // this.blockUI.start('Please Wait...')
    this.Title.setTitle('Sign in to : Patarabibaha Admin Panel')
    this.redirectUrl = this.activeroute.snapshot.queryParamMap.get('redirectUrl') || '/'
  }

  login(){

    console.log(this.loginForm.value);
    

  }

}
